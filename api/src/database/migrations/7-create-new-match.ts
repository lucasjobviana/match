import { Model, DataTypes, QueryInterface } from 'sequelize';

type TAss = {
  userId: number;
  targetId: number;
};

const up = async (queryInterface: QueryInterface) => {
  await queryInterface.createTable<Model<TAss>>('new_matchs', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'user_id',
      references: {
        model: 'users',
        key: 'id',
      },
    },
    targetId: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
      primaryKey: true,
      field: 'target_id',
      references: {
        model: 'users',
        key: 'id',
      }, 
    },
  });
};

const down = async (queryInterface: QueryInterface) => {
  await queryInterface.dropTable('new_matchs');
};

export default {
  up,
  down,
};
