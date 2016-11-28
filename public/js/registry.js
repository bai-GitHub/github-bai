$(function() {
	$.ajax({
		type: 'GET',
		data: {
			"username": "1234456"
		},
		url: "/registry",
		success: function(data) {
			console.log(data)
		}
	})
})