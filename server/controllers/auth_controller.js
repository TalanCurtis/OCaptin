module.exports={
    login:(req, res, next)=>{
        var myResp = 'login'
        req.app.get('db').auth.login_user_check(req.body.username, req.body.password).then(dbRes=>{
            if(dbRes.length!=0){
                res.status(200).send(dbRes)
            }else{
                res.status(401).send('not authorized')
            }
        })
    },
    register:(req, res, next)=>{
        var myResp = 'register'
        res.status(200).send(myResp)
    },
    logout:(req, res, next)=>{
        var myResp = 'logout'
        res.status(200).send(myResp)
    }
    // signout:(req, res, next)=>{
    //     req.session.destroy()
    //     res.status(200).send(req.session)
    // },
}