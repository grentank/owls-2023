const bcrypt = require('bcrypt');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        { name: 'Alex', email: '1@1', hashpass: bcrypt.hashSync('1', 10) },
        { name: 'Bob', email: '2@2', hashpass: bcrypt.hashSync('2', 10) },
        { name: 'Carl', email: '3@3', hashpass: bcrypt.hashSync('3', 10) },
      ],
      {},
    );
    const posts = await fetch('https://jsonplaceholder.typicode.com/posts').then((res) =>
      res.json(),
    );
    await queryInterface.bulkInsert(
      'Posts',
      posts.map(({ title, body, userId }) => ({ title, body, userId: (userId % 3) + 1 })),
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
