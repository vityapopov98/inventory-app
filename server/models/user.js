// module.exports = function(sequelize, Sequelize){
export default (sequelize, Sequelize)=>{
    const User = sequelize.define('user', {
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
        }
    })
    return User;
}
