module.exports = {
    handleGetArticleAdd(req, res) {
        // if(!req.session.isLogin) return res.status(400).send({status:400,msg:'请保存文章后重新登录'})
        if(!req.session.isLogin) return res.redirect('/')
        res.render('./article/add.ejs', {
            user: req.session.user,
            isLogin: req.session.isLogin
        })
    }
}