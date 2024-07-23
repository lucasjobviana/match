import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional
  } from 'sequelize';
  import db from '.';
 
class SequelizeImageModel extends Model<InferAttributes<SequelizeImageModel>, InferCreationAttributes<SequelizeImageModel>> {
    declare id: CreationOptional<number>;
    declare fileName: string;
    declare path: string;
  } 
  
  SequelizeImageModel.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    fileName: { type: DataTypes.STRING, allowNull: false },
    path: { type: DataTypes.STRING, allowNull: false },
  }, {
    sequelize: db,
    modelName: 'images',
    timestamps: false,
    underscored: true,
  });

  export default SequelizeImageModel;