const conn = require('../db/db.js')
//引入moment
const moment = require('moment')
//引入bcrypt对密码进行加密
const bcrypt = require('bcrypt')
//定义幂次
const saltRounds = 10 // 2^10

module.exports = {
    handleGetRegister(req, res) {
        res.render('./user/register.ejs', {})
    },
    handleGetLogin(req, res) {
        res.render('./user/login.ejs', {})
    },
    handlePostRegister(req, res) {
        // console.log('123')
        // console.log(req.body);
        const user = req.body
        if (user.username.trim().length == 0 ||
            user.password.trim().length == 0 ||
            user.nickname.trim().length == 0
        ) return res.status(400).send({
            status: 400,
            msg: '请填写完整的表单信息'
        })
        const sql1 = "select * from users where  username = ?"
        conn.query(sql1, user.username, (err, result) => {
            if (err) return res.status(401).send({
                status: 401,
                msg: '用户名查重失败'
            })
            // console.log(result);
            if (result.length != 0) return res.status(402).send({
                status: 402,
                msg: '用户名重复'
            })
            //在执行插入语句之前,对密码进行加密
            //加密算法
            bcrypt.hash(user.password, saltRounds, (err, pwdCryped) => {
                if (err) return res.status(502).send({
                    status: 501,
                    msg: '注册失败,请重试!'
                })
                user.password = pwdCryped
                const sql2 = "insert into users set ?"
                user.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
                conn.query(sql2, user, (err, result) => {
                    if (err || result.affectedRows != 1) return res.status(500).send({
                        status: 500,
                        msg: '添加用户失败'
                    })
                    res.send({
                        status: 200,
                        msg: '注册用户成功'
                    })
                })
            })
        })

        // res.send({status:200,msg:'注册用户成功! '})
    },
    handlePostLogin(req, res) {
        /* const user = req.body
        const sql = "select * from users where username = ? and password = ?"
        conn.query(sql, [user.username, user.password], (err, result) => {
            if (err) return res.status(500).send({
                status: 500,
                msg: '服务器响应失败'
            })
            if (result.length != 1) return res.status(501).send({
                status: 501,
                msg: '用户名或密码错误!'
            })
            req.session.user = result[0]
            req.session.isLogin = true
            req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000
            res.send({
                status: 200,
                msg: '登陆成功'
            })
        }) */


        //进行加密验证
        const user = req.body
        const sql = "select * from users where username = ?"
        conn.query(sql, user.username, (err, result) => {
            if (err) return res.status(500).send({
                status: 500,
                msg: '服务器响应失败'
            })
            if (result.length != 1) return res.status(501).send({
                status: 501,
                msg: '用户名或密码错误!'
            })
            //挂载之前验证密码
            bcrypt.compare(user.password, result[0].password, (err, flag) => {
                if (err) return res.status(502).send({
                    status: 502,
                    msg: '用户名或密码错误!'
                })
                if (!flag) return res.status(503).send({
                    status: 503,
                    msg: '用户名或密码错误!'
                })
                req.session.user = result[0]
                req.session.isLogin = true
                req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000
                res.send({
                    status: 200,
                    msg: '登陆成功'
                })
            })

        })
    },
    handleGetLogout(req, res) {
        req.session.destroy(err => {
            // console.log(err);
            res.redirect('/')
        })
    }

}