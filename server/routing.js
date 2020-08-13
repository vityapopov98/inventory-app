// import bodyParser from 'body-parser';
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({extended: false}) //включение парсера
// import {getAllItems, getItemsInStorage, getItemsInFolder, getItemsInTrash, getGivenItems, createItem, updateItem, deleteItem} from './controllers/items';
// import {getStorages, createStorage, updateStorage, deleteStorage} from './controllers/storages';
// import {getFolders, createFolder, updateFolder, deleteFolder} from './controllers/floders';
// import {createGiving, deleteGiving} from './controllers/givings';
// import {getUsers} from './controllers/users';

const itemsControl = require('./controllers/items')
const folderControl = require('./controllers/folders')
const storageControl = require('./controllers/storages')
const givingControl = require('./controllers/givings')
const userControl = require('./controllers/users')

// для ES6 export default (app)
module.exports = (app)=>{

    //___________routes__________
    app.get('/', urlencodedParser, (req, res,)=>{ //выдает страницу в браузер
        res.sendFile(__dirname + '/index.html/')
    })
    
    // __________Items________________
    //________________________________
    
    app.get('/api/get-item-all', urlencodedParser, itemsControl.getAllItems)
    // взать вещи с определенного хранилища
    
    
    app.post('/api/get-items-in-storage', urlencodedParser, itemsControl.getItemsInStorage)

    app.post('/api/get-items-in-folder', urlencodedParser, (req, res)=>{
        console.log('route req', req.body )
        itemsControl.getItemsInFolder(req, res);
    })

    app.get('/api/get-items-in-trash', urlencodedParser, itemsControl.getItemsInTrash)

    app.get('/api/get-items-given', urlencodedParser, itemsControl.getGivenItems)
    
    // _____ Вещи ________
    app.post('/api/create-item', urlencodedParser, itemsControl.createItem)
    
    app.put('/api/update-item', urlencodedParser, itemsControl.updateItem)
    
    app.delete('/api/delete-item', urlencodedParser, itemsControl.deleteItem)
    
    // ____________ Хранилища ___________
    //___________________________________
    app.get('/api/get-storages', urlencodedParser, storageControl.getStorages)

    app.post('/api/create-storage', urlencodedParser, storageControl.createStorage)

    app.put('/api/update-storage', urlencodedParser, storageControl.updateStorage)

    app.delete('/api/delete-storage', urlencodedParser, storageControl.deleteStorage)
    
    // _________________Папки____________
    //___________________________________
    app.get('/api/get-folders', urlencodedParser, folderControl.getFolders)

    app.post('/api/create-folder', urlencodedParser, folderControl.createFolder)

    app.put('/api/update-folder', urlencodedParser, folderControl.updateFolder)

    app.delete('/api/delete-folder', urlencodedParser, folderControl.deleteFolder)
    
    // ________________Giving____________
    //___________________________________
    app.post('/api/create-giving', urlencodedParser, givingControl.createGiving)

    app.delete('/api/delete-giving', urlencodedParser, givingControl.deleteGiving)
    
    // _________ Users _________
    //__________________________
    app.get('/api/get-users', urlencodedParser, userControl.getUsers)
}