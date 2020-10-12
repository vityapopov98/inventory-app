import bodyParser from 'body-parser';
// const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false}) //включение парсера
import {getAllItems, getItemsInStorage, getItemsInFolder, getItemsInTrash, getGivenItems, createItem, updateItem, deleteItem} from './controllers/items.js';
import {getStorages, createStorage, updateStorage, deleteStorage} from './controllers/storages.js';
import {getFolders, createFolder, updateFolder, deleteFolder} from './controllers/folders.js';
import {createGiving, deleteGiving} from './controllers/givings.js';
import {getUsers} from './controllers/users.js';
import {verifyAccessToken} from './services/jwt_helper.js'

// const itemsControl = require('./controllers/items')
// const folderControl = require('./controllers/folders')
// const storageControl = require('./controllers/storages')
// const givingControl = require('./controllers/givings')
// const userControl = require('./controllers/users')

// для ES6 export default (app)
// module.exports = (app)=>{
export default  (app)=>{
    app.use(verifyAccessToken)
    //___________routes__________
    app.get('/', urlencodedParser, (req, res,)=>{ //выдает страницу в браузер
        res.sendFile(__dirname + '/index.html/')
    })
    
    // __________Items________________
    //________________________________
    
    // app.get('/api/get-item-all', urlencodedParser, itemsControl.getAllItems)
    app.get('/api/get-item-all', urlencodedParser, getAllItems)
    // взать вещи с определенного хранилища
    
    
    // app.post('/api/get-items-in-storage', urlencodedParser, itemsControl.getItemsInStorage)
    app.post('/api/get-items-in-storage', urlencodedParser, getItemsInStorage)

    // app.post('/api/get-items-in-folder', urlencodedParser, (req, res)=>{
    //     console.log('route req', req.body )
    //     itemsControl.getItemsInFolder(req, res);
    // })
    app.post('/api/get-items-in-folder', urlencodedParser, (req, res)=>{
        console.log('route req', req.body )
        getItemsInFolder(req, res);
    })

    // app.get('/api/get-items-in-trash', urlencodedParser, itemsControl.getItemsInTrash)
    app.get('/api/get-items-in-trash', urlencodedParser, getItemsInTrash)

    // app.get('/api/get-items-given', urlencodedParser, itemsControl.getGivenItems)
    app.get('/api/get-items-given', urlencodedParser, getGivenItems)
    
    // _____ Вещи ________
    // app.post('/api/create-item', urlencodedParser, itemsControl.createItem)
    app.post('/api/create-item', urlencodedParser, createItem)
    
    // app.put('/api/update-item', urlencodedParser, itemsControl.updateItem)
    app.put('/api/update-item', urlencodedParser, updateItem)
    
    // app.delete('/api/delete-item', urlencodedParser, itemsControl.deleteItem)
    app.delete('/api/delete-item', urlencodedParser, deleteItem)
    
    // ____________ Хранилища ___________
    //___________________________________
    // app.get('/api/get-storages', urlencodedParser, storageControl.getStorages)
    app.get('/api/get-storages', urlencodedParser, getStorages)

    // app.post('/api/create-storage', urlencodedParser, storageControl.createStorage)
    app.post('/api/create-storage', urlencodedParser, createStorage)

    // app.put('/api/update-storage', urlencodedParser, storageControl.updateStorage)
    app.put('/api/update-storage', urlencodedParser, updateStorage)

    // app.delete('/api/delete-storage', urlencodedParser, storageControl.deleteStorage)
    app.delete('/api/delete-storage', urlencodedParser, deleteStorage)
    
    // _________________Папки____________
    //___________________________________
    // app.get('/api/get-folders', urlencodedParser, folderControl.getFolders)

    //Для отображения и поиска папок нужно: проверить токены, узнать группу юзера 
    app.get('/api/get-folders', urlencodedParser, getFolders)

    // app.post('/api/create-folder', urlencodedParser, folderControl.createFolder)
    app.post('/api/create-folder', urlencodedParser, createFolder)

    // app.put('/api/update-folder', urlencodedParser, folderControl.updateFolder)
    app.put('/api/update-folder', urlencodedParser, updateFolder)

    // app.delete('/api/delete-folder', urlencodedParser, folderControl.deleteFolder)
    app.delete('/api/delete-folder', urlencodedParser, deleteFolder)

    
    // ________________Giving____________
    //___________________________________
    // app.post('/api/create-giving', urlencodedParser, givingControl.createGiving)
    app.post('/api/create-giving', urlencodedParser, createGiving)

    // app.delete('/api/delete-giving', urlencodedParser, givingControl.deleteGiving)
    app.delete('/api/delete-giving', urlencodedParser, deleteGiving)

    
    // _________ Users _________
    //__________________________
    // app.get('/api/get-users', urlencodedParser, userControl.getUsers)
    app.get('/api/get-users', urlencodedParser, getUsers)

}