const { faker } = require('@faker-js/faker/locale/id_ID')

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const allTodolist = []
    for (let i = 0; i < 10; i++) {
      const tdl = {
        nama_tugas: faker.lorem.words({ min: 2, max: 4 }),
        deskripsi: faker.lorem.words({ min: 7, max: 15 }),
        deadline: faker.date.between({ from: new Date('2024-04-19'), to: new Date('2024-05-05') }),
        status: faker.helpers.arrayElement([0, 1]),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      allTodolist.push(tdl)
    }

    await queryInterface.bulkInsert('todolists', allTodolist)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
    */
    await queryInterface.bulkDelete('todolists', null, {});
  }
};
