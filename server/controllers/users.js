const Sequelize = require('sequelize');
const sequelize = new Sequelize('heroku_6fa82796f5120b0', 'b73bc9a47e21b1', '11783cae',{
    host: 'us-cdbr-east-02.cleardb.com',
    dialect: 'mysql'
});

const User = require('../models/user')(sequelize, Sequelize);

module.exports.getUsers = function getUsers(req, res) {
    //поменять на /api/get-items-all
    console.log('😂😘😕🙂🙃🤠')
    
    //выводит все записи с вещами
    User.findAll().then(table=>{
        res.json(table)
    })
    // res.sendFile(__dirname + '/index.html/')

}
// export {
//     getUsers
// }