const Sequelize = require('sequelize');
const sequelize = new Sequelize('heroku_6fa82796f5120b0', 'b73bc9a47e21b1', '11783cae',{
    host: 'us-cdbr-east-02.cleardb.com',
    dialect: 'mysql'
});

const Storage = require('../models/storage')(sequelize, Sequelize);
const Item = require('../models/item')(sequelize, Sequelize);


module.exports.getStorages = function getStorages(req, res) {

    Storage.findAll({raw: true}).then(storages=>{
        console.log(storages)//список объектов хранилищ

        itemsCounterStorage(storages).then(respondData=>{ //вызываю функци, которая должна считать 
            console.log(respondData)
            res.json(respondData)//отправляю данные на фронтенд
        }).catch(error=>{
            console.log('EROORRRRR')
        })
    })
}

function itemsCounterStorage(storageArray){
    console.log('store array',storageArray)

    return new Promise((resolve)=>{
        //Вешаем на кажый обработанный элемент промис
        //с помощью Promise.all создаем массив промисов, в которых хранилища с количесвтом вещей
        //и всю эту констврукцию помещаем в промис, так как мы получили ассинхронный map()
        Promise.all(storageArray.map(element => {
        console.log('element:', element)

            return new Promise(resolve=>{
            var newElem = {}
                Item.count({
                    where: {storageId: element.id},
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