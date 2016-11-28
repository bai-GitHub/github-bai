//goods details in events
$(function() {
	poster()
	insertColl()
	suphome()
	maskOrders()
})
//poster events
function poster() {
	var _pw   = $('.poster').width(),
		_lw   = $('.poster').find('li').width(_pw),
		_ul   = $('.poster').find('ul'),
		_p    = $('.poster').find('p').width(),
		_i    = 0,
		_len  = $('.poster').find('li').length,
		index = 0,
		domI  = ''


		if($('.poster').find('li').length == 0) {
			$('.poster').find('ul').append($('<li>'))
			$('.poster').find('li').css({'width': $('body').width()})
			$('.poster').find('li').append($('<a>'))
			$('.poster').find('li').find('a').append($('<img src="/img/orders/moren.png" width= '+$('body').width()+' height='+$('.poster').find('li').height()+'>'))
			$('.poster').find('img').css({'max-width': '100%','max-height': '100%'})
		}
		if($('.poster').find('li').length == 1) {
			return
		}
		else {
			for(; _i < $('.poster').find('li').length; _i++) {
				$('.poster').find('p').append($('<i>'))
			}
			$('.poster').find('p').find('i:first').addClass('action')
			_ti = setInterval(animation,3000)
		}
		$('.poster').find('p').css('margin-left', -(_p/2) + 'px')
	//animation in poster
	function animation() {
		$('.poster').find('li:first').clone().appendTo(_ul)
		$('.poster').find('li:first').remove()
		$('.poster').find('ul').css('left',-_pw)
		$('.poster').find('ul').animate({left: 0}, 300)
		//poster find i class action
		if(index < $('.poster').find('li').length) {
			index++
			$('.poster').find('i').eq(index).addClass('action').siblings().removeClass('action')
		}
		else {
			index = 0
			$('.poster').find('i').eq(0).addClass('action').siblings().removeClass('action')
		}
	}
	//遍历图片
}
//insertColl events
function insertColl() {
	$('.coll').on('click', function() {
		if($(this).find('p').find('span').text() == '取消收藏') {
			var id = $(this).find('p').data().faid
			
			$.get('/server/deleteColl/' + id)
			.done(function(data) {
				$('.coll').find('p').find('img').attr('src', '/img/orders/coll.png')
				$('.coll').find('p').find('span').text('收藏')
			})
			
		}
		else {
			var name = window.location.pathname,
				arry = [],
				data = {
					gid : name.substring(1).split('/')[1],
					smid: $('.rtitle').find('h1').data().smid
				}
			arry.push(data)
			$.get('/server/insertColl/' + encodeURIComponent(JSON.stringify(arry)))
			.done(function(){
				$('.coll').find('p').find('img').attr('src', '/img/orders/addsucc.png')
				$('.coll').find('p').find('span').text('取消收藏')
			})	

		}
	})
}


//click my suplier home
function suphome() {
	$('.home').on('click', function() {
		var href = $(this).attr('href'),
			name = window.location.href
		$(this).attr('href', href + '/?url=' + name)
	})
}


//mask dialog add orders
function maskOrders() {
	var name = window.location.pathname
	$('.host').attr('href', name)
	$('.order').on('click', function() {
		$('.mask').css('display', 'block')
	})
	$('.fail,.mt').on('click', function() {
		$('.mask').css('display', 'none')
	})
}
