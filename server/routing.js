export default ()=>{

    //___________routes__________
    app.get('/', urlencodedParser, (req, res,)=>{ //выдает страницу в браузер
        res.sendFile(__dirname + '/index.html/')
    })
    
    // __________Items________________
    //________________________________
    
    app.get('/api/get-item-all', urlencodedParser, (req, res,)=>{ //выдает страницу в браузер
        getAllItems();

    })
    // взать вещи с определенного хранилища
    
    
    app.post('/api/get-items-in-storage', urlencodedParser, (req, res,)=>{ //выдает страницу в браузер
        //поменять на /api/get-items-in-storage
        getItemsInStorage();
    })
    app.post('/api/get-items-in-folder', urlencodedParser, (req, res,)=>{ //выдает страницу в браузер
        getItemsInFolder();
    })

    app.get('/api/get-items-in-trash', urlencodedParser, (req, res,)=>{ //выдает страницу в браузер
       getItemsInTrash();
    })
    app.get('/api/get-items-given', urlencodedParser, (req, res,)=>{ //выдает страницу в браузер
       getGivenItems();
    })
    
    //из предыдущего роута сделать поиск по папкам (для кастомных папок) /api/get-items-in-folder
    
    // из роута для всех вещей сделать для Trash и Giving
    // Trash где item.utilizeDate != null /api/get-items-trash
    // Giving где item.givingId != null /api/get-item-given
    
    // _____ Вещи ________
    app.post('/api/create-item', urlencodedParser, (req, res)=>{
        createItem();
    })
    
    app.put('/api/update-item', urlencodedParser, (req, res)=>{
        updateItem();
    })
    
    app.delete('/api/delete-item', urlencodedParser, (req, res)=>{
        deleteItem();
    })
    
    // ____________ Хранилища ___________
    //___________________________________
    app.get('/api/get-storages', urlencodedParser, (req, res)=>{
       getStorages();
    })
    app.post('/api/create-storage', urlencodedParser, (req, res)=>{
        createStorage();
    })
    app.put('/api/update-storage', urlencodedParser, (req, res)=>{
        updateStorage();
    })
    app.delete('/api/delete-storage', urlencodedParser, (req, res)=>{
        deleteStorage();
    })
    
    // _________________Папки____________
    //___________________________________
    app.get('/api/get-folders', urlencodedParser, (req, res)=>{
       getFolders();
    })
    app.post('/api/create-folder', urlencodedParser, (req, res)=>{
        createFolder();
    })
    app.put('/api/update-folder', urlencodedParser, (req, res)=>{
        updateFolder();
    })
    app.delete('/api/delete-folder', urlencodedParser, (req, res)=>{
       deleteFolder();
    })
    
    // ________________Giving____________
    //___________________________________
    app.post('/api/create-giving', urlencodedParser, (req, res)=>{
        createGiving();
    })
    app.delete('/api/delete-giving', urlencodedParser, (req, res)=>{
        deleteGiving();
    })
    
    // _________ Users _________
    //__________________________
    app.get('/api/get-users', urlencodedParser, (req, res,)=>{ //выдает страницу в браузер
        getUsers();
    })
}