export default ()=>{

    //___________routes__________
    app.get('/', urlencodedParser, (req, res,)=>{ //выдает страницу в браузер
        res.sendFile(__dirname + '/index.html/')
    })
    
    // __________Items________________
    //________________________________
    
    app.get('/api/get-item-all', urlencodedParser, (req, res,)=>{ //выдает страницу в браузер
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
    
    })
    // взать вещи с определенного хранилища
    
    
    app.post('/api/get-items-in-storage', urlencodedParser, (req, res,)=>{ //выдает страницу в браузер
        //поменять на /api/get-items-in-storage
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
    })
    app.post('/api/get-items-in-folder', urlencodedParser, (req, res,)=>{ //выдает страницу в браузер
        console.log('😂😘😕🙂🙃🤠')
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
    })
    app.get('/api/get-items-in-trash', urlencodedParser, (req, res,)=>{ //выдает страницу в браузер
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
    })
    app.get('/api/get-items-given', urlencodedParser, (req, res,)=>{ //выдает страницу в браузер
        console.log('😂😘😕🙂🙃🤠')
        const Op = Sequelize.Op;
        Item.findAll({include: [Storage, Folder, Giving], where:{
            givingId: {
                [Op.ne]: null
            }
        }}).then(table=>{
            res.json(table)
        })
    })
    
    //из предыдущего роута сделать поиск по папкам (для кастомных папок) /api/get-items-in-folder
    
    // из роута для всех вещей сделать для Trash и Giving
    // Trash где item.utilizeDate != null /api/get-items-trash
    // Giving где item.givingId != null /api/get-item-given
    
    // _____ Вещи ________
    app.post('/api/create-item', urlencodedParser, (req, res)=>{
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
    })
    
    app.put('/api/update-item', urlencodedParser, (req, res)=>{
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
    
    })
    
    app.delete('/api/delete-item', urlencodedParser, (req, res)=>{
        Item.destroy({
            where: {
                id: req.body.id
            }
        }).then(()=>{
            // res.json({status: 'ok'})
            console.log('redirecting', `/#/items/${req.body.from}`)
            res.redirect(`/#/items/${req.body.redirectTo}`) //кажется это песполезно
        })
    })
    
    // ____________ Хранилища ___________
    //___________________________________
    app.get('/api/get-storages', urlencodedParser, (req, res)=>{
        Storage.findAll().then(storages=>{
            res.json(storages)
        })
    })
    app.post('/api/create-storage', urlencodedParser, (req, res)=>{
        Storage.create({
            name: req.body.name,
            image: req.body.icon,
            color: req.body.color
        }).then(()=>{
            res.redirect('/')
        })
    })
    app.put('/api/update-storage', urlencodedParser, (req, res)=>{
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
    })
    app.delete('/api/delete-storage', urlencodedParser, (req, res)=>{
        Storage.destroy({
            where: {
                id: req.body.folder
            }
        }).then(result=>{
            res.json(result)
        })
    })
    
    // _________________Папки____________
    //___________________________________
    app.get('/api/get-folders', urlencodedParser, (req, res)=>{
        Folder.findAll().then(folders=>{
            res.json(folders)
        })
    })
    app.post('/api/create-folder', urlencodedParser, (req, res)=>{
        Folder.create({
            name: req.body.name,
            image: req.body.icon,
            color: req.body.color
        }).then(()=>{
            res.redirect('/')
        })
    })
    app.put('/api/update-folder', urlencodedParser, (req, res)=>{
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
    })
    app.delete('/api/delete-folder', urlencodedParser, (req, res)=>{
        Folder.destroy({
            where: {
                id: req.body.folder
            }
        }).then(result=>{
            res.json(result)
        })
    })
    
    // ________________Giving____________
    //___________________________________
    app.post('/api/create-giving', urlencodedParser, (req, res)=>{
        //записать в таблицу Giving
        // полученный айди добавить к вещи
        console.log('Creating givinf: ', req.body)
        Giving.create({
            date: req.body.givingDate,
            returnDate: req.body.returnDate,
            userId: req.body.whoGave,
            whoTakeName: req.body.whoTake,
            whoTakePhone: req.body.whoTakePhone,
            pledge: req.body.pledge
        }).then(giving=>{
            console.log('😂', giving.id)
            res.json({givingCreatedId: giving.id})
        })
    })
    app.delete('/api/delete-giving', urlencodedParser, (req, res)=>{
        //когда нажимаем на кнопку "вернуть"
    console.log('DELETING GIVING', req.body)
        //находим вещь с giving айди
        Item.findAll({
            where:{
                givingId: req.body.givingId
            }
        }).then(items=>{
            console.log('found item', items)
            //ставим в это поле в вещи null
            Item.update({
                givingId: null
            },{
                where: {
                    id: items[0].id
                }
            }).then(()=>{
                //потом удаляем сам giving
                Giving.destroy({where:{
                    id: req.body.givingId
                }}).then(()=>{
                    console.log('Destroyed 🤯💥')
                    res.json({status: 'ok'})
                })
            })
        })    
    })
    
    // _________ Users _________
    //__________________________
    app.get('/api/get-users', urlencodedParser, (req, res,)=>{ //выдает страницу в браузер
        //поменять на /api/get-items-all
        console.log('😂😘😕🙂🙃🤠')
    
        //выводит все записи с вещами
        User.findAll().then(table=>{
            res.json(table)
        })
        // res.sendFile(__dirname + '/index.html/')
    
    })
}