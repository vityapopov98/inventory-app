function getUsers() {
    //поменять на /api/get-items-all
    console.log('😂😘😕🙂🙃🤠')
    
    //выводит все записи с вещами
    User.findAll().then(table=>{
        res.json(table)
    })
    // res.sendFile(__dirname + '/index.html/')

}