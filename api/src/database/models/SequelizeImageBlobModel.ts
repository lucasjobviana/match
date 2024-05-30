import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional
  } from 'sequelize';
  import db from '.'; 
import SequelizeUserModel from './SequelizeUserModel';
 
  class SequelizeImageBlobModel extends Model<InferAttributes<SequelizeImageBlobModel>,
  InferCreationAttributes<SequelizeImageBlobModel>> {
    declare id: CreationOptional<number>;
    declare fileName: string;
    declare fileData: Buffer;
    declare userId: number;
  } 
  
  SequelizeImageBlobModel.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    fileName: { type: DataTypes.STRING, allowNull: false },
    fileData: { type: DataTypes.BLOB, allowNull: false },
    userId: {  // Chave estrangeira
      type: DataTypes.INTEGER,
      references: {
          model: SequelizeUserModel,
          key: 'id',
      },
      allowNull: false,
  },
    // username: { type: DataTypes.STRING, allowNull: false },
    // password: { type: DataTypes.STRING, allowNull: false },
    // image: {type: DataTypes.BLOB, allowNull: true}
  }, {
    sequelize: db,
    modelName: 'SequelizeImageBlobModel',
    tableName: 'images_blob',
    timestamps: false,
    underscored: true,
  });

  export default SequelizeImageBlobModel;