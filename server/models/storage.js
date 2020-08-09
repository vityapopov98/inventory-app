module.exports = function(sequelize, Sequelize){

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
        }
    })
    return Storage;
}
