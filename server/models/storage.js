// module.exports = function(sequelize, Sequelize){
    import Sequelize from 'sequelize';
    const sequelize = new Sequelize('heroku_6fa82796f5120b0', 'b73bc9a47e21b1', '11783cae',{
        host: 'us-cdbr-east-02.cleardb.com',
        dialect: 'mysql'
    });

import GroupConstructor from '../models/group.js'
const Group = GroupConstructor(sequelize, Sequelize)

export default (sequelize, Sequelize)=>{

    const Storage = sequelize.define('storage', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        image: {
            type: Sequelize.STRING,
        },
        color: {
            type: Sequelize.STRING,
        },
        groupId: {
            type: Sequelize.INTEGER
        }
    })
    
    Storage.belongsTo(Group);
    return Storage;
}
