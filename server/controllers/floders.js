function getFolders() {
    Folder.findAll().then(folders=>{
        res.json(folders)
    })
}
function createFolder(req, res) {
    Folder.create({
        name: req.body.name,
        image: req.body.icon,
        color: req.body.color
    }).then(()=>{
        res.redirect('/')
    })
}
function updateFolder(req, res) {
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
}
function deleteFolder(req, res) {
    Folder.destroy({
        where: {
            id: req.body.folder
        }
    }).then(result=>{
        res.json(result)
    })
}