const moment = require('moment');
const conn = require('../db/db.js')



module.exports = {
    handleGetArticleAdd(req, res) {
        // if(!req.session.isLogin) return res.status(400).send({status:400,msg:'请保存文章后重新登录'})
        if (!req.session.isLogin) return res.redirect('/')
        res.render('./article/add.ejs', {
            user: req.session.user,
            isLogin: req.session.isLogin
        })
    },
    handlePostArticleAdd(req, res) {
        if (!req.session.isLogin) return res.status(400).send({
            status: 400,
            msg: '您的登录信息失效,请保存文章后重新登录'
        })
        const body = req.body
        body.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
        // console.log(body)
        const insertSql = 'insert into articles set ?'
        conn.query(insertSql, body, (err, result) => {
            if (err) return res.status(500).send({
                status: 500,
                msg: '添加文章失败!请重试'
            })
            // console.log(result)
            if (result.affectedRows != 1) return res.status(500).send({
                status: 500,
                msg: '添加文章失败!请重试'
            })
            res.send({
                status: 200,
                msg: 'ok',
                articleId: result.insertId
            })
        })
    },
    handleGetArticleInfo(req, res) {
        res.render('./article/info.ejs', {
            user: req.session.user,
            isLogin: req.session.isLogin
        })
    }
}