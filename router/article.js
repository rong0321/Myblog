const express = require('express')
const router = express.Router()
const ctrl = require('../controller/article.js')

router.get('/article/add',ctrl.handleGetArticleAdd)

router.post('/article/add',ctrl.handlePostArticleAdd)

router.get('/article/info/:id',ctrl.handleGetArticleInfo)

router.get('/article/edit/:id',ctrl.handleGetArticleEdit)

router.post('/article/edit',ctrl.handlePostArticleEdit)
module.exports = router