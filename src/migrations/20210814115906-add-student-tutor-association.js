'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Tutors_Students', {
      createdAt : {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      studentId: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      tutorId: {
        type: Sequelize.INTEGER,
        primaryKey: true
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Tutors_Students');
  }
};
