//index listen events
$(function() {
	$(window).scroll(function() {
		if($(window).scrollTop() > $('.poster').height()) {
			$('.ccback').css('background','#FFA200')
		}
		else {
			$('.ccback').css('background','url(/img/hea.png) center center')
		}
	})
	poster()
	cation()
	// addBtn()
	backbtn()

})

//poster events
function poster() {
	var _pw = $('.poster').width(),
		_ph = $('.poster').height(),
		_a  = $('.poster').find('ul').find('a'),
		_lw = $('.poster').find('li').width(_pw),
		_ul = $('.poster').find('ul')

		 _ti = setInterval(animation, 2000)
	//animation in poster
	function animation() {
		$('.poster').find('li:first').clone().appendTo(_ul)
		$('.poster').find('li:first').remove()
		_ul.css('left', -_pw + 'px')
		_ul.animate({left: 0}, 500)
	}
}

//cation li width = height
function cation() {
	var _width  = $('.cation').find('li').width(),
		_i      = 0,
		_len    = $('.cation').find('li').length
	$('.cation').find('li').height(_width)
	$('.cation').find('li').css('line-height', _width + 'px')
	for(; _i < _len; _i++) {
		$('.cation').find('li').eq(_i).css({'background': 'url(/img/index/'+(_i + 1)+'.png) center center', 'backgroundSize': 'cover'})
	}
}

//查询分类
function levelSearch (obj){
	var val = $(obj).parent('li').attr('data')
	var href = window.location.pathname
	var urll = $(obj).attr('href')
	$(obj).attr('href', urll+'/?levelName1=' + val + '&url=' + href)
}


//backbtn a href
function backbtn() {
	var _href = $('.search').attr('href'),
		_win  = window.location.pathname
	$('.search').attr('href', _href + '/?url=' + _win)
}