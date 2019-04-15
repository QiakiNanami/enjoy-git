var fs = require('fs')

var express = require('express')

var bodyParser = require('body-parser')

var router = require('./router')

var app = express()

app.listen(3000, function() {
	console.log('start')
})

// 解析post参数
app.use(bodyParser.urlencoded({
	extended: false
}))

app.use(bodyParser.json())

//设置模板以及页面属性
app.engine('html', require('express-art-template'))

//开放静态文件夹
app.use('/public/', express.static('./public/'))

app.use('/node_modules/', express.static('./node_modules/'))

//启用路由
app.use(router)



