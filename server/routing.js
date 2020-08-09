export default ()=>{

    //___________routes__________
    app.get('/', urlencodedParser, (req, res,)=>{ //выдает страницу в браузер
        res.sendFile(__dirname + '/index.html/')
    })
    
    // __________Items________________
    //________________________________
    
    app.get('/api/get-item-all', urlencodedParser, getAllItems)
    // взать вещи с определенного хранилища
    
    
    app.post('/api/get-items-in-storage', urlencodedParser, getItemsInStorage)

    app.post('/api/get-items-in-folder', urlencodedParser, getItemsInFolder)

    app.get('/api/get-items-in-trash', urlencodedParser, getItemsInTrash)

    app.get('/api/get-items-given', urlencodedParser, getGivenItems)
    
    // _____ Вещи ________
    app.post('/api/create-item', urlencodedParser, createItem)
    
    app.put('/api/update-item', urlencodedParser, updateItem)
    
    app.delete('/api/delete-item', urlencodedParser, deleteItem)
    
    // ____________ Хранилища ___________
    //___________________________________
    app.get('/api/get-storages', urlencodedParser, getStorages)

    app.post('/api/create-storage', urlencodedParser, createStorage)

    app.put('/api/update-storage', urlencodedParser, updateStorage)

    app.delete('/api/delete-storage', urlencodedParser, deleteStorage)
    
    // _________________Папки____________
    //___________________________________
    app.get('/api/get-folders', urlencodedParser, getFolders)

    app.post('/api/create-folder', urlencodedParser, createFolder)

    app.put('/api/update-folder', urlencodedParser, updateFolder)

    app.delete('/api/delete-folder', urlencodedParser, deleteFolder)
    
    // ________________Giving____________
    //___________________________________
    app.post('/api/create-giving', urlencodedParser, createGiving)

    app.delete('/api/delete-giving', urlencodedParser, deleteGiving)
    
    // _________ Users _________
    //__________________________
    app.get('/api/get-users', urlencodedParser, getUsers)
}