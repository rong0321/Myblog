const express = require('express')
const router = express.Router()
const ctrl = require('../controller/article.js')

router.get('/article/add',ctrl.handleGetArticleAdd)

router.post('/article/add',ctrl.handlePostArticleAdd)

router.get('/article/info/:id',ctrl.handleGetArticleInfo)


module.exports = router