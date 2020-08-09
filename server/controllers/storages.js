function getStorages(req, res) {
    Storage.findAll().then(storages=>{
        res.json(storages)
    })
}
function createStorage(req, res) {
    Storage.create({
        name: req.body.name,
        image: req.body.icon,
        color: req.body.color
    }).then(()=>{
        res.redirect('/')
    })
}
function updateStorage(req, res) {
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
}
function deleteStorage(req, res) {
    Storage.destroy({
        where: {
            id: req.body.folder
        }
    }).then(result=>{
        res.json(result)
    })
}