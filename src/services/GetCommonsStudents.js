const { Op } = require("sequelize");
const { Student, Tutor, Sequelize } = require("../models");

class GetCommonsStudents {
    constructor(validatedArgs) {
        this.tutors = validatedArgs;
    }

    async call() {
        const tutors = await Tutor.findAll({
            attributes: ['id'],
            where: {
                email: {
                    [Op.or]: this.tutors
                }
            }
        });

        const commonStudents = await Student.findAll({
            attributes: ['email'],
            group: 'id',
            include: [
                {
                    required: true,
                    attributes: [],
                    model: Tutor,
                    where: {
                        id: {
                            [Op.in]: tutors.map(t => t.id)
                        }
                    }
                }
            ],
            having: Sequelize.literal(`COUNT(*) = ${tutors.length}`)
        });

        const commonStudentEmails = commonStudents.map(cs => cs.email);
        return commonStudentEmails;
    }
}

module.exports = GetCommonsStudents;