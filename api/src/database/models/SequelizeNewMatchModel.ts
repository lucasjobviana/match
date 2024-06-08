import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from '.';

class SequelizeNewMatchModel extends Model<InferAttributes<SequelizeNewMatchModel>, InferCreationAttributes<SequelizeNewMatchModel>> {
    declare userId: number;
    declare targetId: number;
  }
  
  SequelizeNewMatchModel.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE',
    },
    targetId: {
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
    modelName: 'SequelizeNewMatchModel',
    tableName: 'new_matchs', // especificar o nome da tabela
    timestamps: false,
    underscored: true,
     
  });
    
 
  
  export default SequelizeNewMatchModel;
  