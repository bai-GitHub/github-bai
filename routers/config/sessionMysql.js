var express    = require('express')
var session    = require('express-session')
var MySQLStore = require('express-mysql-session')(session)
var baseUrl    = require('./url')
var fs         = require('fs')

var dbUri = JSON.parse(fs.readFileSync(__dirname + '/' + 'config.properties'))

// connect - mysql in session for weChat

module.exports = {
	options: {
	    host                   : dbUri.dbUrl,
	    port                   : 3306,
	    user                   : dbUri.dbUsername,
	    password               : dbUri.dbPassword,
	    database               : 'fastEliminate',
	   	checkExpirationInterval: 900000,
	   	useConnectionPooling   : true,
	   	createDatabaseTable    : true,
	    expiration             : 86400000
	}
}