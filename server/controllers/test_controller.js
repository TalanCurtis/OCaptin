module.exports = {
    testGet:(req, res, next)=>{
        var myResp = 'this is a response'
        console.log(myResp);
        res.status(200).send(myResp);
    }
}