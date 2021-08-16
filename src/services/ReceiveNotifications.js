const _ = require("lodash");

class ReceiveNotifications {
  constructor(validatedArgs) {
    this.tutor = validatedArgs.existingTutor;
    this.notification = validatedArgs.notification;
  }

  async call() {
    const tutorStudentEmails = (
      await this.tutor.getStudents({ where: { isSuspended: false } })
    ).map((s) => s.email);
    const mentionedStudentEmails = this.notification
      .split(" ")
      .filter((word) => word[0] === "@")
      .map((email) => email.substring(1));

    // merge and get unique
    return _.uniq(_.concat(tutorStudentEmails, mentionedStudentEmails));
  }
}

module.exports = ReceiveNotifications;
