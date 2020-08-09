function createGiving(req, res) {
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
}

function deleteGiving(req, res) {
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
}