import {
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional
  } from 'sequelize';
  import db from '.';
import UserLikeToUser from './UserLikeToUser';
import UserDislikeToUser from './UserDislikeToUser';
import SequelizeImageBlobModel from './SequelizeImageBlobModel';
import SequelizeMatchModel from './SequelizeMatchModel';
import SequelizeNewMatchModel from './SequelizeNewMatchModel';
  
class SequelizeUserModel extends Model<InferAttributes<SequelizeUserModel>,
  InferCreationAttributes<SequelizeUserModel>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare phone: string;
    declare username: string;
    declare password: string;
    declare resume: string;
  }
  
  SequelizeUserModel.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    resume: { type: DataTypes.STRING, allowNull:true}
  }, {
    sequelize: db,
    modelName: 'users',
    timestamps: false,
    underscored: true,
  });

  SequelizeUserModel.belongsToMany(SequelizeUserModel, {
    through:{ model: SequelizeNewMatchModel}, 
    as: 'newMatchUsers',
    foreignKey: 'user_id',
    otherKey: 'target_id',
  });
  
  SequelizeUserModel.belongsToMany(SequelizeUserModel, {
    through:{ model: UserLikeToUser}, 
    as: 'relatedUsers',
    foreignKey: 'user_logged_id',
    otherKey: 'user_target_id',
  });
  
  SequelizeUserModel.belongsToMany(SequelizeUserModel, {
    through:{ model: UserDislikeToUser},
    as: 'dislikeUsers',
    foreignKey: 'user_logged_id',
    otherKey: 'user_target_id',
  });

  SequelizeUserModel.belongsToMany(SequelizeUserModel, {
    through: { model: SequelizeMatchModel }, 
    as: 'matchedUsersAsFirstUser',
    foreignKey: 'first_user_id',
    otherKey: 'last_user_id',
  });
  
  SequelizeUserModel.belongsToMany(SequelizeUserModel, {
    through: { model: SequelizeMatchModel }, 
    as: 'matchedUsersAsLastUser',
    foreignKey: 'last_user_id',
    otherKey: 'first_user_id',
  });

  SequelizeMatchModel.belongsTo(SequelizeUserModel,{
    as:'FirstUser', foreignKey:'firstUserId'
  })

  SequelizeMatchModel.belongsTo(SequelizeUserModel,{
    as:'LastUser', foreignKey:'lastUserId'
  })

  SequelizeUserModel.hasMany(SequelizeImageBlobModel, {
    foreignKey: 'userId',
    as: 'images',
  });

  SequelizeImageBlobModel.belongsTo(SequelizeUserModel, {
      foreignKey: 'userId',
      as: 'user',
  });

export default SequelizeUserModel;