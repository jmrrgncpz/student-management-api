const { Tutor } = require("../models");

class FindTutorByEmail {
  constructor(tutorEmail) {
    this.tutorEmail = tutorEmail;
  }

  async call() {
    return await Tutor.findOne({ where: { email: this.tutorEmail } });
  }
}

module.exports = FindTutorByEmail;