//引入mysql
const mysql = require('mysql')
const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'time_blog',
    multipleStatements:true
})

module.exports = conn