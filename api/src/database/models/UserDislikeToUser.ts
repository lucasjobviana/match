import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from '.';

class UserDislikeToUser extends Model<InferAttributes<UserDislikeToUser>, InferCreationAttributes<UserDislikeToUser>> {
    declare userLoggedId: number;
    declare userTargetId: number;
  }
   
  UserDislikeToUser.init({
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
    modelName: 'UserDislikeToUser',
    tableName: 'user_dislike_to',  
    timestamps: false,
    underscored: true,
  });
  
export default UserDislikeToUser;
