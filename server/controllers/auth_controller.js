module.exports={
    login:(req, res, next)=>{
        var myResp = 'login'
        console.log('this is req.body: ',req.body)
        req.app.get('db').auth.login_user_check(req.body.username, req.body.password).then(dbRes=>{
            if(dbRes.length!=0){
                res.status(200).send(dbRes)
            }else{
                res.status(401).send('not authorized')
            }
        })
        //res.status(200).send(myResp)
    },
    register:(req, res, next)=>{
        var myResp = 'register'
        res.status(200).send(myResp)
    },
    logout:(req, res, next)=>{
        var myResp = 'logout'
        res.status(200).send(myResp)
    }
}