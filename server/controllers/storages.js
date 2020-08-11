const Sequelize = require('sequelize');
const sequelize = new Sequelize('heroku_6fa82796f5120b0', 'b73bc9a47e21b1', '11783cae',{
    host: 'us-cdbr-east-02.cleardb.com',
    dialect: 'mysql'
});

const Storage = require('../models/storage')(sequelize, Sequelize);


module.exports.getStorages = function getStorages(req, res) {
    Storage.findAll().then(storages=>{
        res.json(storages)
    })
}
module.exports.createStorage = function createStorage(req, res) {
    Storage.create({
        name: req.body.name,
        image: req.body.icon,
        color: req.body.color
    }).then(()=>{
        res.redirect('/')
    })
}
module.exports.updateStorage = function updateStorage(req, res) {
    console.log('Hey there =)')
        Storage.update({
            name: req.body.name,
            image: req.body.icon, 
            color: req.body.color
        },{
            where: {
                id: req.body.id
            }
        }).then(()=>{
        })
        res.json({status: 'ok'})
}
module.exports.deleteStorage = function deleteStorage(req, res) {
    Storage.destroy({
        where: {
            id: req.body.folder
        }
    }).then(result=>{
        res.json(result)
    })
}

// export {
//     getStorages,
//     createStorage,
//     updateStorage,
//     deleteStorage
// }