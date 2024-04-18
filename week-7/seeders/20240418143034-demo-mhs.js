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

    const allMhs = []
    for (let i = 0; i < 20; i++) {
      const mhs = {
        nim: faker.number.int({ min: 12210001, max: 12211000 }),
        nama: faker.person.fullName(),
        email: faker.internet.email({ provider: 'gmail.com', allowSpecialCharacters: false }).toLowerCase(),
        alamat: faker.location.city(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
      allMhs.push(mhs)
    }

    await queryInterface.bulkInsert('mahasiswas', allMhs)
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('mahasiswas', null, {})
  }
};
