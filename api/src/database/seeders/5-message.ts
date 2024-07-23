import { QueryInterface } from 'sequelize';

export default { 
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('messages', [
      {
        content: 'hello world axl',
        sender: 1,
        match: 1,
      },
      {
        content: 'hello world alexi',
        sender: 2,
        match: 1,
      },
      {
        content: 'how are you tonight?',
        sender: 2,
        match: 1,
      },
      {
        content: 'Now is 3:00 P.M you junkie, are you crazy?',
        sender: 1,
        match: 1,
      },
      {
        content: 'Stop drink everytime my little smurf',
        sender: 1,
        match: 1,
      },
      {
        content: 'Suck my dick',
        sender: 2,
        match: 1,
      },
    ], {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('messages', {});
  },
};
