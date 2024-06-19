import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from '.';
import SequelizeUserModel from "./SequelizeUserModel";
import SequelizeMatchModel from "./SequelizeMatchModel";

class SequelizeMessageModel extends Model<InferAttributes<SequelizeMessageModel>, InferCreationAttributes<SequelizeMessageModel>> {
  declare id: CreationOptional<number>;
  declare content: string;
  declare sender: number;
  declare match: number;
}
  
  SequelizeMessageModel.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      onDelete: 'CASCADE',
    },
    sender: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE',
    },
    match: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      field:'match',
      onDelete: 'CASCADE',
      references: {
        model: 'matchs',
        key: 'id'
      },
      
    }
  }, {
    sequelize: db,
    modelName: 'SequelizeMessageModel',
    tableName: 'messages', 
    timestamps: false,
    underscored: true,
     
  }); 
 

  // SequelizeMessageModel.hasOne(SequelizeUserModel, {
  //   foreignKey: 'id',
  //   sourceKey:'sender',
  //   as:'user'
  // });

  // SequelizeUserModel.belongsTo(SequelizeMessageModel,{
  //   foreignKey: 'id',
  //   targetKey:'sender',
  //   as:'user'
  // })

  // SequelizeMessageModel.hasOne(SequelizeMatchModel, {
  //   foreignKey: 'id',
  //   sourceKey: 'match',
  //   as: 'match_'
  // });

  // SequelizeMatchModel.belongsTo(SequelizeMessageModel,{
  //   foreignKey: 'id',
  //   targetKey: 'match',
  //   as: 'messages'
  // })
  SequelizeMessageModel.belongsTo(SequelizeUserModel, {
    foreignKey: 'sender',
    as: 'user'
  });
  
  SequelizeMessageModel.belongsTo(SequelizeMatchModel, {
    foreignKey: 'match',
    as: 'match_'
  });
//////
  SequelizeUserModel.hasMany(SequelizeMessageModel, {
    foreignKey: 'sender',
    as: 'messages'
  });

  SequelizeMatchModel.hasMany(SequelizeMessageModel, {
    foreignKey: 'match',
    as: 'messages'
  });
export default SequelizeMessageModel;