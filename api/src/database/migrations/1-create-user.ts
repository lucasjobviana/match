import { Model, DataTypes, QueryInterface,  } from 'sequelize';

import { TUser } from '../../interface/type/TUser';

const up = (queryInterface: QueryInterface) => {
  return queryInterface.createTable<Model<TUser>>('users',{
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING, allowNull: false, field: 'name' },
    phone: { type: DataTypes.STRING, allowNull: false, field: 'phone' },
    username: { type: DataTypes.STRING, allowNull: false, field: 'username' },
    password: { type: DataTypes.STRING, allowNull: false, field: 'password' },
    resume: {type: DataTypes.STRING, allowNull:true, field: 'resume'}
    // images: {type: DataTypes.BLOB, allowNull: true, field: 'image'}
  });

};

const down = (queryInterface: QueryInterface) => {
  return queryInterface.dropTable('users');
};

export default {
  up,
  down,
};