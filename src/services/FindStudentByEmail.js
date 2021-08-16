const { Student } = require("../models");

class FindStudentByEmail {
  constructor(studentEmail) {
    this.studentEmail = studentEmail;
  }

  async call() {
    return await Student.findOne({ where: { email: this.studentEmail } });
  }
}

module.exports = FindStudentByEmail;