import { Model, DataTypes, QueryInterface,  } from 'sequelize';

import { TImage } from '../../interface';

const up = (queryInterface: QueryInterface) => {
  return queryInterface.createTable<Model<TImage>>('images',{
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    fileName: { type: DataTypes.STRING, allowNull: false, field: 'file_name' },
    path: { type: DataTypes.STRING, allowNull: false, field: 'path' }
    });

};

const down = (queryInterface: QueryInterface) => {
  return queryInterface.dropTable('images');
};

export default {
  up,
  down,
};