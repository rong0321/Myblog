module.exports = {
    handleGetIndex(req,res) {
        //render方法必须要先配置模板引擎,此处相对于设置的模板引擎的目录
        res.render('./index.ejs',{
            user : req.session.user,
            isLogin: req.session.isLogin
         })
    }
}