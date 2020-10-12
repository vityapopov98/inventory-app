//Походу это не используется

const Sequelize = require('sequelize');
const sequelize = new Sequelize('heroku_6fa82796f5120b0', 'b73bc9a47e21b1', '11783cae',{
    host: 'us-cdbr-east-02.cleardb.com',
    dialect: 'mysql'
});

const Storage = require('../models/storage')(sequelize, Sequelize)
const Folder = require('../models/folder')(sequelize, Sequelize)
const Item = require('../models/item')(sequelize, Sequelize)
const Giving = require('../models/giving')(sequelize, Sequelize)

// Item.belongsTo(Storage);
// Item.belongsTo(Folder);
// Item.belongsTo(Giving);
// Giving.belongsTo(User); 

function getAllItems(){
    return Item.findAll({include: [Storage, Folder, Giving],
        where:{
            utilizeDate: null
        }})
}

module.exports = getAllItems()