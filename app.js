const express = require('express')
const app = express()
//配置模板引擎
app.set('view engine', 'ejs')
app.set('views','./views')

//引入body-parser
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))

//引入mysql
const mysql = require('mysql')
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'time_blog'
})

//引入moment
const moment = require('moment')


//托管node_modules目录
app.use('/node_modules',express.static('./node_modules'))



app.get('/',(req,res) => {
    //render方法必须要先配置模板引擎,此处相对于设置的模板引擎的目录
    res.render('./index.ejs',{ })
})

app.get('/register',(req,res) => {
    res.render('./user/register.ejs',{})
})
app.get('/login',(req,res) => {
    res.render('./user/login.ejs',{})
})

//注册功能
app.post('/register',(req,res) => {
    // console.log('123')
    // console.log(req.body);
    const user = req.body
    if(user.username.trim().length == 0 
    || user.password.trim().length == 0 
    || user.nickname.trim().length == 0
    ) return res.status(400).send({status:400,msg:'请填写完整的表单信息'})
    const sql1 = "select * from users where  username = ?"
    conn.query(sql1,user.username,(err,result) => {
        if(err) return res.status(401).send({status:401,msg:'用户名查重失败'})
        // console.log(result);
        if(result.length != 0) return res.status(402).send({status:402,msg:'用户名重复'})
        const sql2 = "insert into users set ?"
        user.ctime = moment().format('YYYY-MM-DD HH:mm:ss')
        conn.query(sql2,user,(err,result) => {
            if(err || result.affectedRows != 1) return res.status(500).send({status:500,msg:'添加用户失败'})
            res.send({status:200,msg:'注册用户成功'})
        })
    })

    // res.send({status:200,msg:'注册用户成功! '})
})

//登录功能
app.post('/login',(req,res) => {
    const user = req.body
    const sql = "select * from users where username = ? and password = ?"
    conn.query(sql,[user.username,user.password],(err,result) => {
        if(err) return res.status(500).send({status:500,msg:'服务器响应失败'})
        if(result.length != 1) return res.status(501).send({status:501,msg:'用户名或密码错误!'})
        res.send({status:200,msg:'登陆成功'})
    })
})


//启动服务器
app.listen(80,() => {
    console.log('server running at http://127.0.0.1');
})