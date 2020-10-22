import Sequelize from 'sequelize';
const sequelize = new Sequelize('heroku_6fa82796f5120b0', 'b73bc9a47e21b1', '11783cae',{
    host: 'us-cdbr-east-02.cleardb.com',
    dialect: 'mysql'
});
import {generateAccessToken, verifyAccessToken, generateRefreshToken, verifyRefreshToken} from '../services/jwt_helper.js'
import UserConstructor from '../models/user.js'

const User = UserConstructor(sequelize, Sequelize)
import bcrypt from 'bcrypt'

//register
function register(req, res) {
    //Проверить, нет ли такого пользователя
    console.log('Hi, from register route', req.body)
    User.findOne({
        where: {login: req.body.email}
    }).then(userFound=>{
        if (userFound) {
            //Такой пользователь есть. Вернуть ошибку
            console.log('userfound: ', userFound)
            res.send('Already exist')
        }
        else{
            //Такого пользователя нет. Создаем

            //Ну либо тут, либо сделать другое.. Хэшируем пароль
            bcrypt.genSalt().then(salt=>{
                bcrypt.hash(req.body.password, salt).then(hashedPassword=>{

                    User.create({
                        name: req.body.name,
                        responsability: req.body.responsability,
                        login: req.body.email,
                        password: hashedPassword,
    
                    }).then(savedUser=>{
                        console.log('user saved')
                        //Ну создали. Теперь выдаем токены
                        var accessToken;
                        var refreshToken;
                        generateAccessToken(savedUser).then(acc=>{
                            accessToken = acc;
                            generateRefreshToken(savedUser).then(ref=>{
                                refreshToken = ref;
                                res.json({accessToken: accessToken, refreshToken: refreshToken})
                            })
                        }).catch(err=>{
                            console.log('cannot generate token ', err)
                        })
                        
                    })
                })
            })


        }
    })
}

//login
function login(req, res) {
    console.log('login route', req)
    //Ищем юзера
    User.findOne({
        where:{login: req.body.email},
        raw:true
    }).then(user=>{
        //сравниваем пароли
        bcrypt.compare(req.body.password, user.password).then(checked=>{
            if (checked) {
                
                //если норм, то выдаем токены
                var accessToken;
                var refreshToken;
                generateAccessToken(user).then(acc=>{
                    accessToken = acc;
                    generateRefreshToken(user).then(ref=>{
                        refreshToken = ref;
                        res.json({accessToken: accessToken, refreshToken: refreshToken})
                    })
                }).catch(err=>{
                    console.log('cannot generate token ', err)
                })
            }
            else{
                console.log('wrong password')
                res.json({accessToken: '', refreshToken: ''})
                res.json({status: 'Wrong password'})
            }
        })
    })
}

//refresh token
function refreshToken(req, res) {
    //получаем рефреш токен
    console.log('this is body : ', req.body.refreshToken)
    const refreshToken = req.body.refreshToken
    if (!refreshToken) {
        console.log('Error No token')
    }
    //проверяем его 
    verifyRefreshToken(refreshToken).then(user=>{
        console.log(user)
        const payload = {
            id: user.id,
            name: user.name,
            login: user.login
        };
        var accessToken;
        var refreshToken;
        generateAccessToken(payload).then(acc=>{
            accessToken = acc;
            generateRefreshToken(payload).then(ref=>{
                refreshToken = ref;
                res.json({accessToken: accessToken, refreshToken: refreshToken})
            })
        }).catch(err=>{
            console.log('cannot generate token ', err)
        })
    })

    //выдаем новые токены
}

//logout
function logout(req, res) {
    //получаем рефреш токен
    //проверяем рефреш токен 

    //Заносим в черный список
}

export{
    register,
    login, 
    refreshToken,
    logout
}