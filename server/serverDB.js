const Sequelize = require('sequelize');
const { text } = require('body-parser');
const { where } = require('sequelize');

const sequelize = new Sequelize('heroku_6fa82796f5120b0', 'b73bc9a47e21b1', '11783cae',{
    host: 'us-cdbr-east-02.cleardb.com',
    dialect: 'mysql'
});




// Database
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

//в Item добавится автоматически поле для отланной вещи 
// givingId
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
const Giving = sequelize.define('giving',{
    date:{
        type: Sequelize.DATE
    },
    returnDate:{
        type: Sequelize.DATE
    },
    userId:{
        type: Sequelize.INTEGER
    },
    whoTakeName:{
        type: Sequelize.STRING
    },
    whoTakePhone:{
        type: Sequelize.STRING
    },
    pledge:{
        type: Sequelize.INTEGER
    }
});
Item.belongsTo(Storage);
Item.belongsTo(Folder);
Item.belongsTo(Giving);
Giving.belongsTo(User); //userId - кто дал вещь


// ______
// Folder.destroy({where:{}})
// Item.destroy({where:{}, truncate: true}).then(()=>{

//     Storage.destroy({where:{}})
// })
//_____



// User.sync({force: true}).then(()=>{
//     return User.create({
//         name: 'admin',
//         login: 'admin',
//         responsability: 1,
//         password: 'admin123'
//     })
// }).then(()=>{
//     Giving.sync({force: true})
// })
// Storage.sync({force: true}).then(()=>{
//     return Storage.create({
//         name: 'гараж', 
//         image: 'icon-all.png', 
//         color: 'yellow'
//     })
// }).then(()=>{
//     Folder.sync({force: true}).then(()=>{
//         return Folder.create({
//             name: 'Медиа',
//             image: 'icon-box.png', 
//             color: 'yellow'
//         })
//     }).then(()=>{
//         Item.sync({force: true}).then(()=>{
//             Item.create({
//                 name: 'стол',
//                 storageId: 1,
//                 folderId: 1,
//                 description: 'очень хороший стол'
//             })
//         })
//     })
   
// })
module.exports =  { sequelize, Folder, Storage, Giving, User, Item}