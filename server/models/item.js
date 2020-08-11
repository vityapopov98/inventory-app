const Sequelize = require('sequelize');
const sequelize = new Sequelize('heroku_6fa82796f5120b0', 'b73bc9a47e21b1', '11783cae',{
    host: 'us-cdbr-east-02.cleardb.com',
    dialect: 'mysql'
});

const Storage = require('../models/storage')(sequelize, Sequelize);
const Folder = require('../models/folder')(sequelize, Sequelize);
const Giving = require('../models/giving')(sequelize, Sequelize);

module.exports = function(sequelize, Sequelize){

    const Item = sequelize.define('item', {
        name:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING
        },
        image:{
            type: Sequelize.STRING
        },
        purchaseDate:{
            type: Sequelize.DATE
        },
        guarantee:{
            type: Sequelize.STRING
        },
        cost: {
            type: Sequelize.INTEGER
        },
        count: {
            type: Sequelize.INTEGER
        },
        utilizeDate:{
            type: Sequelize.STRING
        },
        utilizeReason:{
            type: Sequelize.STRING
        }
    })

    Item.belongsTo(Storage);
    Item.belongsTo(Folder);
    Item.belongsTo(Giving);

    return Item;
}
