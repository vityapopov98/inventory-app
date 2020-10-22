// module.exports = function(sequelize, Sequelize){
import Sequelize from 'sequelize';
const sequelize = new Sequelize('heroku_6fa82796f5120b0', 'b73bc9a47e21b1', '11783cae',{
    host: 'us-cdbr-east-02.cleardb.com',
    dialect: 'mysql'
});

// import GroupConstructor from '../models/group.js'

// const Group = GroupConstructor(sequelize, Sequelize)

export default (sequelize, Sequelize)=>{
    const User = sequelize.define('user', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        responsability: {
            type: Sequelize.INTEGER
        },
        login: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        },
        selectedGruop: {
            type: Sequelize.INTEGER
        }
    })

    // User.belongsToMany(Group, {through: 'userGroup'})

    return User;
}
