const moment = require('moment');
const conn = require('../db/db.js')
const marked = require('marked')


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
            if (err || result.affectedRows != 1) return res.status(500).send({
                status: 500,
                msg: '添加文章失败!请重试'
            })
            // console.log(result)
            res.send({
                status: 200,
                msg: 'ok',
                articleId: result.insertId
            })
        })
    },
    handleGetArticleInfo(req, res) {
        const id = req.params.id
        // console.log(id)
        const querySql = "select * from articles where id = ?"
        conn.query(querySql, id, (err, result) => {
            if (err) return res.status(500).send({
                status: 500,
                msg: '获取文章详情失败',
                data: null
            })
            if (result.length != 1) return res.redirect('/')
            const html = marked(result[0].content)
            // console.log(html)
            result[0].content = html
            res.render('./article/info.ejs', {
                user: req.session.user,
                isLogin: req.session.isLogin,
                article: result[0]
            })
        })

    },
    handleGetArticleEdit(req, res) {
        if (!req.session.isLogin) return res.redirect('/')
        const articleId = req.params.id
        const sql = "select * from articles where id = ?"
        conn.query(sql, articleId, (err, result) => {
            if (err || result.length != 1) return res.redirect('/')
            // console.log(result)
            res.render('./article/edit.ejs', {
                user: req.session.user,
                isLogin: req.session.isLogin,
                article: result[0]
            })
        })


    },
    handlePostArticleEdit(req, res) {
        const body = req.body
        const sql = "update articles set ? where id =?"
        conn.query(sql,[body,body.id],(err,result) => {
            if(err || result.affectedRows != 1) return res.status(500).send({status:500,msg:'编辑文章失败!请重试'})
            res.send({status:200,msg:'ok'})
        })
    }
}