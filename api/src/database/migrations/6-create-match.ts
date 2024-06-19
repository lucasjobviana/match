import { Model, DataTypes, QueryInterface } from 'sequelize';

type TAss = {
  id: number;
  firstUserId: number;
  lastUserId: number;
};

const up = async (queryInterface: QueryInterface) => {
  await queryInterface.createTable<Model<TAss>>('matchs', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    firstUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'first_user_id',
      references: {
        model: 'users',
        key: 'id',
      },
    },
    lastUserId: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
      primaryKey: true,
      field: 'last_user_id',
      references: {
        model: 'users',
        key: 'id',
      }, 
    },
  });
};

const down = async (queryInterface: QueryInterface) => {
  await queryInterface.dropTable('matchs');
};

export default {
  up,
  down,
};
