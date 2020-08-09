module.exports = function(sequelize, Sequelize){

    const Folder = sequelize.define('folder', {
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
    return Folder;
}
