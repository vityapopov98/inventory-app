const express = require('express');//для роутинга
const app = express();
const bodyParser = require('body-parser');//для парсинга в роутинге
const Sequelize = require('sequelize');
const { text } = require('body-parser');

app.use(bodyParser.json());
const urlencodedParser = bodyParser.urlencoded({extended: false}) //включение парсера
console.log("hello!!!!! how are you ?))))")

app.use(express.static('public'));

const sequelize = new Sequelize('heroku_6fa82796f5120b0', 'b73bc9a47e21b1', '11783cae',{
    host: 'us-cdbr-east-02.cleardb.com',
    dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Database
const User = sequelize.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    responsability: {
        type: Sequelize.INTEGER
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING
    }
})

const Storage = sequelize.define('storage', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})
const Folder = sequelize.define('folder', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

const Item = sequelize.define('item', {
    name:{
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING
    },
    image:{
        type: Sequelize.STRING
    },
    purchaseDate:{
        type: Sequelize.DATE
    },
    guarantee:{
        type: Sequelize.STRING
    },
    cost: {
        type: Sequelize.INTEGER
    },
    count: {
        type: Sequelize.INTEGER
    },
    utilizeDate:{
        type: Sequelize.STRING
    },
    utilizeReason:{
        type: Sequelize.STRING
    }
})
Item.belongsTo(Storage);
Item.belongsTo(Folder);

const Giving = sequelize.define('giving',{
    date:{
        type: Sequelize.DATE
    },
    returnDate:{
        type: Sequelize.DATE
    },
    whoTakeName:{
        type: Sequelize.STRING
    },
    whoTakePhone:{
        type: Sequelize.STRING
    },
    pledge:{
        type: Sequelize.INTEGER
    }
});


Giving.belongsTo(User);

User.sync({force: true}).then(()=>{
    return User.create({
        name: 'admin',
        login: 'admin',
        responsability: 1,
        password: 'admin123'
    })
}).then(()=>{
    Giving.sync({force: true})
})
Storage.sync({force: true}).then(()=>{
    return Storage.create({
        name: 'гараж'
    })
}).then(()=>{
    Folder.sync({force: true}).then(()=>{
        return Folder.create({
            name: 'All items'
        })
    }).then(()=>{
        Item.sync({force: true}).then(()=>{
            Item.create({
                name: 'стол',
                storageId: 1,
                folderId: 1,
                description: 'очень хороший стол'
            })
        })
    })
   
})


app.listen(3000, err => {
    if (!err) console.log('Server started on 3000 port');
    else console.error('Server not started');
})

//___________routes__________
app.get('/', urlencodedParser, (req, res,)=>{ //выдает страницу в браузер
    
    // res.json({resp: 'ok'})
    res.sendFile(__dirname + '/index.html/')

})

// __________Items________________
//________________________________

app.get('/api/get-item-all', urlencodedParser, (req, res,)=>{ //выдает страницу в браузер
    console.log('😂😘😕🙂🙃🤠')

    //выводит все записи с вещами
    Item.findAll({include: [Storage, Folder]}).then(table=>{
        res.json(table)
    })
    // res.sendFile(__dirname + '/index.html/')

})
app.post('/api/get-item', urlencodedParser, (req, res,)=>{ //выдает страницу в браузер
    console.log('😂😘😕🙂🙃🤠')
    console.log('this is storage name: ', req.body.name)

    Storage.findAll({where:{
        name: req.body.name
    }}).then(storage=>{
        console.log(storage[0].id)
        //выводит все записи с вещами
        Item.findAll({
            include: [Storage, Folder],
            where: {
                storageId: storage[0].id
            }
        }).then(table=>{
            res.json(table)
        })
    })

    
    // res.sendFile(__dirname + '/index.html/')

})

app.post('/api/create-item', urlencodedParser, (req, res)=>{
    console.log('I WILL ')
    var itemData = {
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        purchaseDate: req.body.description,
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
            Storage.findOrCreate({where: {name: storageData.name}}).spread(function(storage, created){
                console.log(storage.get({plain: true}))
                console.log('this is ID: ',storage.get({plain: true}).id)
                console.log(created)
                itemData.storageId = storage.get({plain: true}).id
            }).then(()=>{
                Item.create({
                    name: itemData.name,
                    description: itemData.description,
                    image: itemData.image,
                    purchaseDate: new Date(),
                    guarantee: itemData.guarantee,
                    cost: itemData.cost,
                    count: itemData.count,
                    untilizeDate: '', 
                    utilizeReason: '',
                    storageId: itemData.storageId,
                    folderId: 1
                })
            })
    res.redirect(`/#/items/${storageData.name}`)
})


app.put('/api/update-item', urlencodedParser, (req, res)=>{
    console.log('WILL UPDATE item row!!!')
    console.log('incoming data: ', req.body)
    var storageId = Number
    //searching storage id by its name
    Storage.findOrCreate({where: {name: req.body.storage}}).spread(function(storage, created){
        console.log(storage.get({plain: true}))
        console.log('this is ID: ',storage.get({plain: true}).id)
        console.log(created)
        storageId = storage.get({plain: true}).id
    }).then(()=>{
        Item.update({
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            purchaseDate: req.body.purchaseDate,
            guarantee: req.body.guarantee,
            cost: req.body.cost,
            count: req.body.count,
            untilizeDate: '', 
            utilizeReason: '',
            storageId: storageId,
            folderId: 1
        }, {
            where: {id: req.body.id}
        }).then(()=>{
            res.json({status: 'ok'});
        })
    })

})

app.delete('/api/delete-item', urlencodedParser, (req, res)=>{
    Item.destroy({
        where: {
            id: req.body.id
        }
    }).then(()=>{
        res.json({status: 'ok'})
    })
})

app.get('/api/get-storages', urlencodedParser, (req, res)=>{
    Storage.findAll().then(storages=>{
        res.json(storages)
    })
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