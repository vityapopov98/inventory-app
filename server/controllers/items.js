const Sequelize = require('sequelize');
const sequelize = new Sequelize('heroku_6fa82796f5120b0', 'b73bc9a47e21b1', '11783cae',{
    host: 'us-cdbr-east-02.cleardb.com',
    dialect: 'mysql'
});


const Item = require('../models/item')(sequelize, Sequelize);

const Folder = require('../models/folder')(sequelize, Sequelize);

const Storage = require('../models/storage')(sequelize, Sequelize);

const Giving = require('../models/giving')(sequelize, Sequelize);

module.exports.getAllItems = function getAllItems(req, res) {
        //поменять на /api/get-items-all
        console.log('😂😘😕🙂🙃🤠')
        
        //выводит все записи с вещами
        Item.findAll({include: [Storage, Folder, Giving],
        where:{
            utilizeDate: null
        }}).then(table=>{
            res.json(table)
        })
        // res.sendFile(__dirname + '/index.html/')
        // getAllItems()
    }
    
module.exports.getItemsInStorage =  function getItemsInStorage(req, res) {
        console.log('😂😘😕🙂🙃🤠')
            console.log('this is storage name: ', req.body.name)
        
            Storage.findAll({where:{ 
                name: req.body.name
            }}).then(storage=>{
                console.log(storage[0].id)
                //выводит все записи с вещами
                Item.findAll({
                    include: [Storage, Folder, Giving],
                    where: {
                        storageId: storage[0].id
                    }
                }).then(table=>{
                    res.json(table)
                })
            })
    }
    
module.exports.getItemsInFolder = function getItemsInFolder(req, res) {
        console.log('😂😘😕🙂🙃🤠')
        console.log(req.body)
            console.log('this is folder name: ', req.body.name)
        
            Folder.findAll({where:{ 
                name: req.body.name
            }}).then(folder=>{
                console.log(folder[0].id)
                //выводит все записи с вещами
                Item.findAll({
                    include: [Storage, Folder, Giving],
                    where: {
                        folderId: folder[0].id
                    }
                }).then(table=>{
                    res.json(table)
                })
            })
    }
    
module.exports.getItemsInTrash = function getItemsInTrash(req, res) {
        console.log('😂😘😕🙂🙃🤠')
        console.log('this is folder name: ', req.body.name)
        const Op = Sequelize.Op;
        Item.findAll({include: [Storage, Folder, Giving], where:{
            utilizeDate: {
                [Op.ne]: null
            }, 
            folderId: null
        }}).then(table=>{
            res.json(table)
        })
    }
    
module.exports.getGivenItems = function getGivenItems(req, res) {
        console.log('😂😘😕🙂🙃🤠')
        const Op = Sequelize.Op;
        Item.findAll({include: [Storage, Folder, Giving], where:{
            givingId: {
                [Op.ne]: null
            }
        }}).then(table=>{
            res.json(table)
        })
    }
    
module.exports.createItem = function createItem(req, res) {
        console.log('I WILL ')
        console.log(req.body.from)
        var itemData = {
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            purchaseDate: req.body.purchaseDate,
            guarantee: req.body.guarantee,
            cost: req.body.cost,
            count: req.body.count,
            untilizeDate: '', 
            utilizeReason: '',
            storageId: Number,
            folderId: Number
        }
        var storageData = {
            name: req.body.storage
        }
        console.log('this is incoming datA', itemData)
        // найти запись в Storege, если ее нет, то создать 
                Storage.findOrCreate({where: {name: storageData.name.trim()}}).spread(function(storage, created){
                    console.log(storage.get({plain: true}))
                    console.log('this is ID: ',storage.get({plain: true}).id)
                    console.log(created)
                    itemData.storageId = storage.get({plain: true}).id
                }).then(()=>{
                    // найти запись в Folder, если ее нет, то создать
                    Folder.findOrCreate({where: {name: req.body.folder.trim()}}).spread(function(folder, created){
                        console.log(folder.get({plain: true}))
                        console.log('this is ID: ', folder.get({plain: true}).id)
                        console.log(created)
                        itemData.folderId = folder.get({plain: true}).id
                    }).then(()=>{
                        console.log(itemData.purchaseDate)
                        var dateComponents = itemData.purchaseDate.split('-')
                        console.log('date components: ', dateComponents)
                        var date = new Date(parseInt(dateComponents[0]), parseInt(dateComponents[1]), parseInt(dateComponents[2]), 0, 0, 0, 0)
                        console.log(date)
                        
                        Item.create({
                            name: itemData.name,
                            description: itemData.description,
                            image: itemData.image,
                            purchaseDate: itemData.purchaseDate,
                            guarantee: itemData.guarantee,
                            cost: itemData.cost,
                            count: itemData.count,
                            untilizeDate: '', 
                            utilizeReason: '',
                            storageId: itemData.storageId,
                            folderId: itemData.folderId
                        }).then(item=>{
                            console.log(item)
                            console.log(`/#/items/${req.body.from}`)
                            res.redirect(`/#/items/${req.body.from}`)
                        })
                    })
                    
                })
    }
    
module.exports.updateItem = function updateItem(req, res) {
        //данные приходят из requrst.js
        console.log('WILL UPDATE item row!!!')
        console.log('incoming data: ', req.body)
        var storageId = Number
        var folderId = Number
    //searching storage id by its name
    var storageName = req.body.item.storage.name
    console.log(storageName)
       Storage.findOrCreate({where: {name: storageName.trim()}}).spread(function(storage, created){
            console.log(storage.get({plain: true}))
            console.log('this is ID: ',storage.get({plain: true}).id)
            console.log(created)
            storageId = storage.get({plain: true}).id
        }).then(()=>{
            //Ищем папку по имени
            var folderName = req.body.item.folder.name;
            //Я что-то забыл. но походу этот иф нужен для того, когда название папка пустое(то есть вещь в корзине), можно было бы редак
            if(folderName == null || folderName.trim() == ''){
                Item.update({
                    id: req.body.item.id,
                    name: req.body.item.name,
                    description: req.body.item.description,
                    image: req.body.item.image,
                    purchaseDate: req.body.item.purchaseDate,
                    guarantee: req.body.item.guarantee,
                    cost: req.body.item.cost,
                    count: req.body.item.count,
                    utilizeDate: req.body.item.utilizeDate, 
                    utilizeReason: req.body.item.utilizeReason,
                    storageId: storageId,
                    folderId: null
                }, {
                    where: {id: req.body.id}
                }).then(()=>{ 
                    // res.redirect(`/#/items/${req.body.from}`)
                    res.json({status: 'ok'})
                })
            }
            else{
                console.log('Not in trash')
                Folder.findOrCreate({where: {name: folderName.trim()}}).spread(function(folder, created){
                    console.log(folder.get({plain: true}))
                    console.log('this is ID: ', folder.get({plain: true}).id)
                    console.log(created)
                    folderId = folder.get({plain: true}).id
                }).then(()=>{
                    //если есть инфа о giving, добавляем ее
                    if(req.body.givingId != null){
                        console.log('Thers is some data for giving')
                        Item.update({
                            id: req.body.item.id,
                            name: req.body.item.name,
                            description: req.body.item.description,
                            image: req.body.item.image,
                            purchaseDate: req.body.item.purchaseDate,
                            guarantee: req.body.item.guarantee,
                            cost: req.body.item.cost,
                            count: req.body.item.count,
                            utilizeDate: req.body.item.utilizeDate, 
                            utilizeReason: req.body.item.utilizeReason,
                            storageId: storageId,
                            folderId: folderId,
                            givingId: req.body.givingId
                        }, {
                            where: {id: req.body.item.id}
                        }).then(()=>{
                            // console.log('redirecting', `/#/items/${req.body.from}`)
                            // res.redirect(`/#/items/${req.body.from}`) //в консоль ругается на пут метод. но с перегрузкой страницы работает.
                            res.json({status: 'ok'})
                        })
                    }
                    else{
                        console.log('Thers is some data for giving')
                        Item.update({
                            id: req.body.item.id,
                            name: req.body.item.name,
                            description: req.body.item.description,
                            image: req.body.item.image,
                            purchaseDate: req.body.item.purchaseDate,
                            guarantee: req.body.item.guarantee,
                            cost: req.body.item.cost,
                            count: req.body.item.count,
                            utilizeDate: req.body.item.utilizeDate, 
                            utilizeReason: req.body.item.utilizeReason,
                            storageId: storageId,
                            folderId: folderId,
                        }, {
                            where: {id: req.body.item.id}
                        }).then(()=>{
                            res.json({status: 'ok'});
                            // console.log('redirecting', `/#/items/${req.body.from}`)
                            // res.redirect(`/#/items/${req.body.from}`) //кажется это бесполезно
                        })
                    }
                    
                })
            }
        })
    
    }
    
module.exports.deleteItem = function deleteItem(req, res) {
        Item.destroy({
            where: {
                id: req.body.id
            }
        }).then(()=>{
            // res.json({status: 'ok'})
            console.log('redirecting', `/#/items/${req.body.from}`)
            res.redirect(`/#/items/${req.body.redirectTo}`) //кажется это песполезно
        })
    }

// export {
//     getAllItems,
//     getItemsInStorage,
//     getItemsInFolder,
//     getItemsInTrash,
//     getGivenItems,
//     createItem,
//     updateItem,
//     deleteItem
// }