import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from '.';

class SequelizeMatchModel extends Model<InferAttributes<SequelizeMatchModel>, InferCreationAttributes<SequelizeMatchModel>> {
    declare firstUserId: number;
    declare lastUserId: number;
    declare id: CreationOptional<number>;
  }
  
  SequelizeMatchModel.init({
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
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE',
    },
    lastUserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE',
    }
  }, {
    sequelize: db,
    modelName: 'SequelizeMatchModel',
    tableName: 'matchs', 
    timestamps: false,
    underscored: true,
     
  });
    
export default SequelizeMatchModel;