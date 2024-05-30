import { Model, DataTypes, QueryInterface,  } from 'sequelize';

type TAss = {
  userLoggedId: number;
  userTargedId: number;
}

const up = (queryInterface: QueryInterface) => {
  return queryInterface.createTable<Model<TAss>>('user_dislike_to', {
    userLoggedId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field: 'user_logged_id',
      references: {
        model: 'users',
        key: 'id',
      },
    },
    userTargedId: { 
      type: DataTypes.INTEGER, 
      allowNull: false, 
      primaryKey:true ,
      field: 'user_target_id',
      references: {
        model: 'users',
        key: 'id',
      }, 
    }, 
  });
};

const down = (queryInterface: QueryInterface) => {
  return queryInterface.dropTable('user_dislike_to');
};

export default {
  up,
  down,
};