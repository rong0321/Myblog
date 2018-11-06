const express = require('express')
const app = express()
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
//配置模板引擎
app.set('view engine', 'ejs')
app.set('views', './views')

//引入body-parser

app.use(bodyParser.urlencoded({
    extended: false
}))

//托管node_modules目录
app.use('/node_modules', express.static('./node_modules'))

//注册session中间件
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}))

//注册路由
fs.readdir(path.join(__dirname, './router'), (err, filename) => {
    if (err) return console.log('读取 router 目录的路由失败!')
    filename.forEach(item => {
        const router = require(path.join(__dirname, './router', item))
        app.use(router)
    })
})




//启动服务器
app.listen(80, () => {
    console.log('server running at http://127.0.0.1');
})