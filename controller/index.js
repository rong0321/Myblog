const conn = require('../db/db.js')


module.exports = {
    handleGetIndex(req, res) {
        const pageSize = 3
        const currentPage = parseInt(req.query.page) || 1
 
        const sql = `SELECT a.id,a.title,a.ctime,u.nickname FROM articles as a LEFT JOIN users as u ON a.author_id = u.id ORDER BY a.ctime DESC LIMIT ${(currentPage -1) * pageSize},${pageSize};
        select COUNT(*) as count from articles`

        conn.query(sql, (err, result) => {
            
            if (err || result.length == 0) {
                res.render('./index.ejs', {
                    user: req.session.user,
                    isLogin: req.session.isLogin,
                    articles: [[]]
                })
            }
            console.log(result)
            //render方法必须要先配置模板引擎,此处相对于设置的模板引擎的目录
            const totalPage = Math.ceil(result[1][0].count / pageSize)

            // console.log(totalPage)

            res.render('./index.ejs', {
                user: req.session.user,
                isLogin: req.session.isLogin,
                articles:result[0],
                totalPage:totalPage,
                currentPage:currentPage
            })
        })


    }
}