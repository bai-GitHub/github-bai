var request  = require('request')
var showData = require('./console')
//server ref request 
module.exports = {
	post: function(data, url, cb) {
		var data = JSON.stringify(data)
		showData.log('data success =>' + data)
		request.post({url: url, form:{data: data}}, function(err, res, body) {
			if(!err && res.statusCode == 200) {
				showData.log('data success =>' + body)
				cb(body)
			}
			else {
				cb(err)
				showData.log('data error =>' + res.statusCode + err)
			}
		})
	}
}