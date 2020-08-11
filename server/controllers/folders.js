const Sequelize = require('sequelize');
const sequelize = new Sequelize('heroku_6fa82796f5120b0', 'b73bc9a47e21b1', '11783cae',{
    host: 'us-cdbr-east-02.cleardb.com',
    dialect: 'mysql'
});

const Folder = require('../models/folder')(sequelize, Sequelize);


module.exports.getFolders = function getFolders(req, res) {
    Folder.findAll().then(folders=>{
        res.json(folders)
    })
}
module.exports.createFolder = function createFolder(req, res) {
    Folder.create({
        name: req.body.name,
        image: req.body.icon,
        color: req.body.color
    }).then(()=>{
        res.redirect('/')
    })
}
module.exports.updateFolder = function updateFolder(req, res) {
    console.log('Hey there =)')
        Folder.update({
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
module.exports.deleteFolder = function deleteFolder(req, res) {
    Folder.destroy({
        where: {
            id: req.body.folder
        }
    }).then(result=>{
        res.json(result)
    })
}

// export {
//     getFolders,
//     createFolder,
//     updateFolder,
//     deleteFolder
// }