import {DataTypes} from 'sequelize';
import {sequelize} from '../database/database.js';
import {Status} from '../constants/constants.js';
import {Task} from './task.js';
import {encritpar} from '../common/bycrypt.js'

export const User = sequelize.define('users', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Ingrese username',
      },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Ingrese contraseña',
      },
    },
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: Status.ACTIVE,
    validate: {
      isIn: {
        args: [[Status.ACTIVE, Status.INACTIVE]],
        msg: 'Ingrese status ',
      }
    },
  },
});
User.hasMany(Task);
Task.belongsTo(User);
User.beforeCreate(async (user) => {
  user.password = await encritpar(user.password);
});
User.beforeUpdate(async (user) => {
  user.password = await encritpar(user.password);
});