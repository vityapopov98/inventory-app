import bodyParser from 'body-parser';
const urlencodedParser = bodyParser.urlencoded({extended: false}); //включение парсера

import {register, login, refreshToken, logout} from './controllers/auth_controller.js'

export default (app)=>{
    
    app.post('/register', urlencodedParser, register);

    app.post('/login', urlencodedParser, login);

    app.post('/refreshToken', urlencodedParser, refreshToken);
}