import { QueryInterface } from 'sequelize';

export default { 
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkInsert('user_like_to', [
      {
        user_logged_id: 1,
        user_target_id: 2,
      },
      {
        user_logged_id: 2,
        user_target_id: 1,
      },
      {
        user_logged_id: 1,
        user_target_id: 3,

      },
      {
        user_logged_id: 1,
        user_target_id: 4,
      },
      {
        user_logged_id: 1,
        user_target_id: 5,
      },
      {
        user_logged_id: 1,
        user_target_id: 6,
      }
    ], {});
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.bulkDelete('user_like_to', {});
  },
};
