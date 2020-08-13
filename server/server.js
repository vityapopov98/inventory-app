
// import express from 'express';
// const app = express();
// import bodyParser from 'body-parser';//для парсинга в роутинге
// import Sequelize from 'sequelize';
// import dotenv from 'dotenv';

const express = require('express') ;
const app = express();
const bodyParser = require('body-parser');//для парсинга в роутинге
const Sequelize = require ('sequelize');
const dotenv = require('dotenv');




// const production= process.env.NODE_ENV === "production";
// if (!production) {
//     dotenv.load()
// }

// const sequelize = new Sequelize(process.env.DATABASE, process.env.LOGIN, process.env.PASSWORD, {
//     host: process.env.HOST,
//     dialect: 'mysql'
// });
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

// const Storage = require('./models/storage')(sequelize, Sequelize)
// const Folder = require('./models/folder')(sequelize, Sequelize)
// const User = require('./models/user')(sequelize, Sequelize)
// const Item = require('./models/item')(sequelize, Sequelize)
// const Giving = require('./models/giving')(sequelize, Sequelize)
// Item.belongsTo(Storage);
// Item.belongsTo(Folder);
// Item.belongsTo(Giving);
// Giving.belongsTo(User); 



app.use(bodyParser.json());
const urlencodedParser = bodyParser.urlencoded({extended: false}) //включение парсера
console.log("hello!!!!! how are you ?))))")

app.use(express.static('dist'));

const routes = require ('./routing');
// import routes from './routing';
const ApiRouter = routes(app);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

