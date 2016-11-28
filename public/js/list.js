//list listen events
$(function() {

	var form = {},
		bid  = '',
		pric = '',
		name = '',
		cout = $('#search,.wors').next().data().county,
		page = '0',
		host = window.location.pathname,
		leve = ''
	$('.shuai').on('click', function() {
		$('.cont').find('.pa').find('.om').find('p').remove()
		var words = $('#search').val(),
			count = $('.in').data().county,
			dataP  = {
				name_commodity: words,
				county        : count
			},
			dataT = {
				currentPage   : '1'
			},
			dataS = {
				suid: host.substring(1).split('/')[1]
			},
			dataB = {
				county         : count,
				name_commodity : $('.search').val()
			}
		$('.warpRight').css('display', 'block')
		if($('.cont').find('li').length == 3) {
			$.get('/server/findSecondClass/?data=' + encodeURIComponent(JSON.stringify(dataS)))
			.then(function(data) {
				for(var i = 0; i < data.length; i++) {
					var str = $('<p>')
					str.text(data[i].levelName2)
					$('.cont').find('.pn').find('.om').append(str)
				}
				$('.pn').find('p').on('click', function() {
					$(this).addClass('ation').siblings().removeClass('ation')
					leve = $(this).text()
				})

				return $.get('/server/supplierAllBrandQuery/?data=' + encodeURIComponent(JSON.stringify(dataB)))
			})
			.then(function(data) {
				for(var i = 0; i < data.length; i++) {
					var str = $('<p>')
					str.text(data[i].brand_name)
					str.attr('bid', data[i].bid)
					$('.cont').find('.pl').find('.om').append(str)
				}
				$('.pl').find('p').on('click', function() {
					$(this).addClass('ation').siblings().removeClass('ation')
					bid = $(this).attr('bid')
				})

				return $.get('/server/price/?data=' + encodeURIComponent(JSON.stringify(dataP)))
			})
			.then(function(data) {
				for(var i = 0; i < data.length; i++) {
					$('.cont').find('li:last').find('p').eq(i).text(data[i])
				}
				$('.om:last').find('p').on('click', function() {
					$(this).addClass('ation').siblings().removeClass('ation')	
					pric = $(this).text()
				})
			})
		}
		else {
			$.get('/server/price/?data=' + encodeURIComponent(JSON.stringify(dataP)))
			
			.then(function(data) {
				for(var i = 0; i < data.length; i++) {
					$('.cont').find('li:last').find('p').eq(i).text(data[i])
				}
				$('.om:last').find('p').on('click', function() {
					$(this).addClass('ation').siblings().removeClass('ation')	
					pric = $(this).text()
				})
				return $.get('/server/brandQueryArray/?data=' + encodeURIComponent(JSON.stringify(dataT)))
			})

			.then(function(data) {
				for(var i = 0; i < data.length; i++) {
					var str = $('<p>')
					str.text(data[i].brand_name)
					str.attr('bid', data[i].bid)
					$('.cont').find('.pa').find('.om').append(str)
				}
				$('.pa').find('p').on('click', function() {
					$(this).addClass('ation').siblings().removeClass('ation')
					bid = $(this).attr('bid')
				})
			})
		}

		//submit result
		$('.sub').on('click', function() {
			if(bid == '') {
				form = {
					levelName2    : leve,
					name_commodity: $('.wors').val(),
					county        : cout,
					currentPage   : page,
					price         : pric
				}
				if(pric == '') {
					form = {
						levelName2    : leve,
						name_commodity: $('.wors').val(),
						county        : cout,
						currentPage   : page
					}
					if(leve == '') {
						form = {
							name_commodity: $('.wors').val(),
							county        : cout,
							currentPage   : page
						}
					}

				}
			}
			else if(pric == ''){
				form = {
					levelName2    : leve,
					bid           : bid,
					name_commodity: $('.wors').val(),
					county        : cout,
					currentPage   : page
				}
				if(bid == '') {
					form = {
						levelName2    : leve,
						name_commodity: $('.wors').val(),
						county        : cout,
						currentPage   : page
					}
					if(leve == '') {
						form = {
							name_commodity: $('.wors').val(),
							county        : cout,
							currentPage   : page
						}
					}
				}
			}else if(leve == '') {
				form = {
					price         : pric,
					bid           : bid,
					name_commodity: $('.wors').val(),
					county        : cout,
					currentPage   : page
				}
				if(bid == '') {
					form = {
						price         : pric,
						name_commodity: $('.wors').val(),
						county        : cout,
						currentPage   : page
					}
					if(price == '') {
						form = {
							name_commodity: $('.wors').val(),
							county        : cout,
							currentPage   : page
						}
					}
				}
			}
			else {
				form = {
					levelName2    : leve,
					bid           : bid,
					name_commodity: $('.wors').val(),
					county        : cout,
					currentPage   : page,
					price         : pric
				}
			}
			console.log(form)
			$.get('/server/sift/?data=' + encodeURIComponent(JSON.stringify(form)))
			.done(function(data) {
					$('.list').html(data)
					$('.warpRight').hide()
			})
		})

		//submit clear class
		$('.clear').on('click', function() {
			$('.om').find('p').removeClass('ation')
		})

	})

	$('.wr span,.wl').on('click', function() {
		$('.warpRight').css('display', 'none')
	})
	// 价格排序
	$('.prc').click(function(){
		var inputval=$('.wors').val();

		if($("#jiage").val() == 2){
			var val = $('.bar a').attr('data');
			
			$('.list').html('')
			$.ajax({
				type : 'POST',
				url  : '/list?jiaGeZ=' + val ,
				data :{
					searchName : inputval,
					suid:       val

				}
			})
				.then(function(data) {
					$('#jiage').siblings('img').attr('src', '/img/orders/xia_1.png')
					$("#jiage").val(1)
					$('.bar').show()
					$('.list').html(data)
				})
		}else if($("#jiage").val() == 1){
			var val = $('.bar a').attr('data');
			$('.list').html('')
			$.ajax({
				type : 'POST',
				url  : '/list?jiaGeD=' + val ,
				data :{
					searchName : inputval,
					suid:       val
				}
			})
				.then(function(data) {
					$('#jiage').siblings('img').attr('src', '/img/orders/xia_0.png')
					$("#jiage").val(2)
					$('.bar').show()
					$('.list').html(data)
				})
		}

	})
	
	//销量排序
	$('.salesVolume').click(function(){
		var inputval=$('.wors').val();
		if($("#xiaoliang").val() == 2){
			var val = $('.bar a').attr('data');
			$('.list').html('')
			$.ajax({
				type : 'POST',
				url  : '/list?salesVolumeZ=' +val  ,
				data :{
					searchName : inputval,
					suid:       val
				}
			})
				.then(function(data) {
					$("#xiaoliang").val(1)
					$('.bar').show()
					$('.list').html(data)
				})
		}else if($("#xiaoliang").val() == 1){
			var val = $('.bar a').attr('data');
			$('.list').html('')
			$.ajax({
				type : 'POST',
				url  : '/list?salesVolumeD=' + val ,
				data :{
					searchName : inputval,
					suid:       val
				}
			})
				.then(function(data) {
					$("#xiaoliang").val(2)
					$('.bar').show()
					$('.list').html(data)
				})
		}

	})
	//默认排序
	$('.fult').click(function(){
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



