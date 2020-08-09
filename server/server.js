
const express = require('express');//для роутинга
const app = express();
const bodyParser = require('body-parser');//для парсинга в роутинге
const Sequelize = require('sequelize');
const { text } = require('body-parser');
const { where } = require('sequelize');

import routes from './routing';

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

const Storage = require('./models/storage')(sequelize, Sequelize)
const Folder = require('./models/folder')(sequelize, Sequelize)
const User = require('./models/user')(sequelize, Sequelize)
const Item = require('./models/item')(sequelize, Sequelize)
const Giving = require('./models/giving')(sequelize, Sequelize)
Item.belongsTo(Storage);
Item.belongsTo(Folder);
Item.belongsTo(Giving);
Giving.belongsTo(User); 
// const { getAllItems } = require('./services/items');



app.use(bodyParser.json());
const urlencodedParser = bodyParser.urlencoded({extended: false}) //включение парсера
console.log("hello!!!!! how are you ?))))")

app.use(express.static('dist'));

// Database: heroku_6fa82796f5120b0
//User name: b73bc9a47e21b1
//Passsword: 11783cae


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

