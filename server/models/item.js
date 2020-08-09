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
    return Item;
}
