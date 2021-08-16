const { sequelize, Student, Tutor } = require("../models");

class Suspend {
  constructor(studentId) {
    this.studentId = studentId;
  }

  async call() {
      await Student.update({ isSuspended: true }, {
          where: {
              id: this.studentId
          }
      })
  }
}

module.exports = Suspend;
