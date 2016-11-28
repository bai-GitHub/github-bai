//show data upload form
var mask = true

exports.log = function(data) {
	if(mask) {
		console.log(data)
	}
}