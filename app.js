const express = require('express')
const app = express()
//配置模板引擎
app.set('view engine', 'ejs')
app.set('views','./views')

//托管node_modules目录
app.use('/node_modules',express.static('./node_modules'))



app.get('/',(req,res) => {
    //render方法必须要先配置模板引擎,此处相对于设置的模板引擎的目录
    res.render('./index.ejs',{
        name:'zs',
        age:18
    })
})


//启动服务器
app.listen(80,() => {
    console.log('server running at http://127.0.0.1');
})