const express = require('express')
const router = express.Router()

const ctrl = require('../controller/user.js')

router.get('/register',ctrl.handleGetRegister)

router.get('/login',ctrl.handleGetLogin)

//注册功能
router.post('/register',ctrl.handlePostRegister)

//登录功能
router.post('/login',ctrl.handlePostLogin)


module.exports = router