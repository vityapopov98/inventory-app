// module.exports = function(sequelize, Sequelize){
import Sequelize from 'sequelize';
const sequelize = new Sequelize('heroku_6fa82796f5120b0', 'b73bc9a47e21b1', '11783cae',{
    host: 'us-cdbr-east-02.cleardb.com',
    dialect: 'mysql'
});

// import UserConstructor from '../models/user.js'

// const User = UserConstructor(sequelize, Sequelize)

export default (sequelize, Sequelize)=>{
    const Group = sequelize.define('group', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });

    // Group.belongsToMany(User, {through: 'userGroup'});
    return Group;
}