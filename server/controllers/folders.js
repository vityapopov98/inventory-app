// const Sequelize = require('sequelize');
import Sequelize from 'sequelize';
const sequelize = new Sequelize('heroku_6fa82796f5120b0', 'b73bc9a47e21b1', '11783cae',{
    host: 'us-cdbr-east-02.cleardb.com',
    dialect: 'mysql'
});

// const Folder = require('../models/folder')(sequelize, Sequelize);
// const Item = require('../models/item')(sequelize, Sequelize);

import ItemConstructor from '../models/item.js'
import FolderConstructor from '../models/folder.js'

const Item = ItemConstructor(sequelize, Sequelize)
const Folder = FolderConstructor(sequelize, Sequelize)

// module.exports.getFolders = function getFolders(req, res) {
function getFolders(req, res) {
    //Нужно что бы искалось по группе юзера
    Folder.findAll({raw: true}).then(folders=>{
        itemsCounterFolder(folders).then(respondData=>{

            res.json(respondData)
        })
    })
}
function itemsCounterFolder(folderArray){
    console.log('store array', folderArray)

    return new Promise((resolve)=>{
        //Вешаем на кажый обработанный элемент промис
        //с помощью Promise.all создаем массив промисов, в которых хранилища с количесвтом вещей
        //и всю эту констврукцию помещаем в промис, так как мы получили ассинхронный map()
        Promise.all(folderArray.map(element => {
        console.log('element:', element)

            return new Promise(resolve=>{
            var newElem = {}
                Item.count({
                    where: {folderId: element.id},
                    distinct: true
                }).then(count=>{
                    
                    newElem = element
                    newElem.count = count // добавляем к свойствам хранилища свойство count
                    resolve(newElem)
                })
            })
        })).then(values=>{
            console.log('Hope 🙏🏻', values)
            resolve(values)
        })
    }) 
}

// module.exports.createFolder = function createFolder(req, res) {
function createFolder(req, res) {
    Folder.create({
        name: req.body.name,
        image: req.body.icon,
        color: req.body.color
    }).then(()=>{
        res.redirect('/')
    })
}
// module.exports.updateFolder = function updateFolder(req, res) {
function updateFolder(req, res) {
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
// module.exports.deleteFolder = function deleteFolder(req, res) {
function deleteFolder(req, res) {
    Folder.destroy({
        where: {
            id: req.body.folder
        }
    }).then(result=>{
        res.json(result)
    })
}

export {
    getFolders,
    createFolder,
    updateFolder,
    deleteFolder
}