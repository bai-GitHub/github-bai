$(function() {
	$('.out').on('click', function() {
		var val   = $('.search').find('input').val(),
			suid  = $('.supplier').data().suid,
			data  = {
				name_commodity: val,
				suid          : suid,
				currentPage   : '0'
			}
		$.get('/server/supplierSearch/?data=' + encodeURIComponent(JSON.stringify(data)))
		.done(function(data) {
			$('.list').html(data);
			var href = $('.list').find('a').attr('href');
			$('.list').find('a').attr('href', href);
			var inputval=$('.wors').val();
			var val = $('.bar a').attr('data');
			$('.list').html('')
			$.ajax({
				type : 'POST',
				url  : '/list?fult=' + val ,
				data :{
					searchName : inputval,
					suid:       val
				}
			})
			.then(function(data) {
				$('.bar').show()
				$('.list').html(data)
			})
		})
	})
})