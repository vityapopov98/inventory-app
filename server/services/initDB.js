import Sequelize from 'sequelize';
const sequelize = new Sequelize('heroku_6fa82796f5120b0', 'b73bc9a47e21b1', '11783cae',{
    host: 'us-cdbr-east-02.cleardb.com',
    dialect: 'mysql'
});
import FolderConstructor from '../models/folder.js'
import StorageConstructor from '../models/storage.js'
import GivingConstructor from '../models/giving.js'

import GroupConstructor from '../models/group.js'
import UserConstructor from '../models/user.js'
import UserGroupConstructor from '../models/userGroup.js'
import ItemConstructor from '../models/item.js'
import index from '../models/index.js'
import userGroup from '../models/userGroup.js';


const Folder = FolderConstructor(sequelize, Sequelize)
const Storage = StorageConstructor(sequelize, Sequelize)
const Giving = GivingConstructor(sequelize, Sequelize)
//Добавить Usergrouplist


const Group = GroupConstructor(sequelize, Sequelize)
const User = UserConstructor(sequelize, Sequelize)
const UserGroup = UserGroupConstructor(sequelize, Sequelize)
const Item = ItemConstructor(sequelize, Sequelize)
index()

export default ()=>{
    Group.sync({force: true}).then(()=>{
        return Group.create({
            name: 'Admin group'
        }).then((group)=>{
            console.log(group.get()) //Создали группу
            User.sync({force: true}).then(()=>{
                return User.create({
                    name: 'admin',
                    login: 'admin@adin',
                    role: 0,
                    password: '12345',
                    selectedGroup: 1
                }).then(user=>{
                    console.log(user.get()); //создали пользователя
                    return UserGroup.sync({force: true}).then(()=>{
                        UserGroup.create({
                            userId: 1,
                            groupId: 1
                        }).then(userGroup=>{
                            console.log(userGroup.get())
                            Giving.sync()
                            
                            Storage.sync({force: true}).then(()=>{
                                return Storage.create({
                                    name: 'Гараж', 
                                    image: 'icon-all.png', 
                                    color: 'yellow',
                                    groupId: 1
                                })
                            }).then(()=>{
                                Folder.sync({force: true}).then(()=>{
                                    return Folder.create({
                                        name: 'Медиа',
                                        image: 'icon-box.png', 
                                        color: 'yellow',
                                        groupId: 1
                                    })
                                }).then(()=>{
                                    Item.sync({force: true}).then(()=>{
                                        return Item.create({
                                            name: 'стол',
                                            storageId: 1,
                                            folderId: 1,
                                            groupId: 1,
                                            description: 'очень хороший стол'
                                        })
                                    })
                                })
                            })

                        }).catch(er=>{console.log('ErrOr while creating: ', er)})
                    }).catch(er=>{
                        console.log('ErrOr: ', er)
                    })

                })

            })

            
        })
    })
    
    
}