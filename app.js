var express       = require('express')
var path          = require('path')
var logger        = require('morgan')
var mysql         = require('mysql')
var moment        = require('moment')
var bodyParser    = require('body-parser')
var cookieParser  = require('cookie-parser')
var session       = require('express-session')
var MySQLStore    = require('express-mysql-session')(session)
var Port          = process.env.PORT || 4000
var app           = express()
var storeMysql    = require('./routers/config/sessionMysql')
var connection    = mysql.createConnection(storeMysql.options)
var sessionStore  = new MySQLStore(storeMysql.options, connection)

//listen express port
app.listen(Port)

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.locals.pretty = true
//connect - mysql data forever in session
app.use(session(
	{
	    key   : 'weChat',
	    secret: 'kuaixiao',
	    store : sessionStore,
	    resave: true,
	    saveUninitialized: true
	}
))
app.use(function(req, res, next) {
	var _user       = req.session.user
	if(_user) {
		app.locals.user = _user
	}
	return next()
})

console.log('webapp application run as port 4000')
//退出登录


//加载client主要路由
var client     = require('./routers/client/clientMain')
app.use('/', client)

//加载server主要路由
var server     = require('./routers/server/serverMain')
app.use('/server', server)



//我在此加了注释

//我又加了注释