import { Model, DataTypes, QueryInterface,  } from 'sequelize';

import { TImageBlob } from '../../interface';

const up = (queryInterface: QueryInterface) => {
  return queryInterface.createTable<Model<TImageBlob>>('images_blob',{
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    fileName: { type: DataTypes.STRING, allowNull: false, field: 'file_name' },
    fileData: { type: DataTypes.BLOB, allowNull: false, field: 'file_data' },
    userId: {type: DataTypes.INTEGER, allowNull: false, field:'user_id',
      references: {
        model: 'users',
        key: 'id',
      }, 
    }
  });
};

const down = (queryInterface: QueryInterface) => {
  return queryInterface.dropTable('images_blob');
};

export default {
  up,
  down,
};