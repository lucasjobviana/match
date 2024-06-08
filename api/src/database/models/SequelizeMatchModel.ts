import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from '.';

class SequelizeMatchModel extends Model<InferAttributes<SequelizeMatchModel>, InferCreationAttributes<SequelizeMatchModel>> {
    declare firstUserId: number;
    declare lastUserId: number;
  }
  
  SequelizeMatchModel.init({
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
    tableName: 'matchs', // especificar o nome da tabela
    timestamps: false,
    underscored: true,
     
  });
    
 
  
  export default SequelizeMatchModel;
  