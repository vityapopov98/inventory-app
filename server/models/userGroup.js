import Sequelize from 'sequelize';
const sequelize = new Sequelize('heroku_6fa82796f5120b0', 'b73bc9a47e21b1', '11783cae',{
    host: 'us-cdbr-east-02.cleardb.com',
    dialect: 'mysql'
});

import GroupConstructor from '../models/group.js'
import UserConstructor from '../models/user.js'

const Group = GroupConstructor(sequelize, Sequelize)
const User = UserConstructor(sequelize, Sequelize)

export default (sequelize, Sequelize)=>{
    const UserGroup = sequelize.define('userGroup', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
        userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {         // User hasMany WorkingDays n:n
              model: 'users',
              key: 'id'
            }
        },
        groupId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {         // WorkingDays hasMany Users n:n
              model: 'groups',
              key: 'id'
            }
        }
    })

    UserGroup.belongsTo(Group, {foreignKey: 'groupId'});
    UserGroup.belongsTo(User, {foreignKey: 'userId'});

    return UserGroup;
}