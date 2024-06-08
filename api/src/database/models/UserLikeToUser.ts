import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import SequelizeUserModel from "./SequelizeUserModel";
import db from '.';

class UserLikeToUser extends Model<InferAttributes<UserLikeToUser>, InferCreationAttributes<UserLikeToUser>> {
    declare userLoggedId: number;
    declare userTargetId: number;
  }
  
  UserLikeToUser.init({
    userLoggedId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE',
    },
    userTargetId: {
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
    modelName: 'UserLikeToUser',
    tableName: 'user_like_to', // especificar o nome da tabela
    timestamps: false,
    underscored: true,
  });
  
  export default UserLikeToUser;
  