const { sequelize, Student, Tutor } = require("../models");

class RegisterStudents {
  constructor(validatedArgs) {
    this.tutor = validatedArgs.tutor;
    this.students = validatedArgs.students;    
  }

  async call() {
    const t = await sequelize.transaction();

    try {
      // find or create the tutor
      const [tutor] = await Tutor.findOrCreate({
        transaction: t,
        where: { email: this.tutor }
      });
      
      // find or create students
      const studentsCreateResult = await Promise.all(this.students.map(studentEmail => {
        return Student.findOrCreate({
          transaction: t,
          where: { email: studentEmail }
        })
      }))

      // get the student ids
      const studentIds = studentsCreateResult.map(studentResult => studentResult[0].id);
      
      // insert association entries to tutor_student through table
      const targetTutor = await Tutor.findByPk(tutor.id, { transaction: t});
      await targetTutor.addStudents(studentIds);

      await t.commit();
    } catch(err) {
      await t.rollback();
      throw `Failed to register students. Details: ${err}`;
    }
  }
}

module.exports = RegisterStudents;
