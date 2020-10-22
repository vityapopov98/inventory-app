import Sequelize from 'sequelize';
const sequelize = new Sequelize('heroku_6fa82796f5120b0', 'b73bc9a47e21b1', '11783cae',{
    host: 'us-cdbr-east-02.cleardb.com',
    dialect: 'mysql'
});
import FolderConstructor from '../models/folder.js'
import StorageConstructor from '../models/storage.js'
import GivingConstructor from '../models/giving.js'
import UserConstructor from '../models/user.js'
import GroupConstructor from '../models/group.js'
import UserGroupConstructor from '../models/userGroup.js'

const Folder = FolderConstructor(sequelize, Sequelize)
const Storage = StorageConstructor(sequelize, Sequelize)
const Giving = GivingConstructor(sequelize, Sequelize)
const Group = GroupConstructor(sequelize, Sequelize)
const User = UserConstructor(sequelize, Sequelize)
const UserGroup = UserGroupConstructor(sequelize, Sequelize)



export default ()=>{
    User.belongsToMany(Group, {through: 'userGroup', foreignKey: 'userId'});
    Group.belongsToMany(User, {through: 'userGroup', foreignKey: 'groupId'});
    UserGroup.belongsTo(Group);
    UserGroup.belongsTo(User);
}