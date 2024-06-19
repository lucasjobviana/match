import { Model, DataTypes, QueryInterface,  } from 'sequelize';
import { TMessage } from '../../type';

const up = (queryInterface: QueryInterface) => {
  return queryInterface.createTable<Model<TMessage>>('messages',{
    id: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      primaryKey: true,
      autoIncrement: true,
    },
    content: { type: DataTypes.STRING, allowNull: false, field: 'content' },
    sender: { type: DataTypes.INTEGER, allowNull: false, field: 'sender', references: {
      model:'users', key:'id'
    },onDelete: 'CASCADE' },
    match: { type: DataTypes.INTEGER, allowNull: false, field:'match', references: {
      model:'matchs', key:'id'
    },onDelete: 'CASCADE', }
  });
};

const down = (queryInterface: QueryInterface) => {
  return queryInterface.dropTable('messages');
};

export default {
  up,
  down,
};