$(function() {
	$.ajaxPrefilter(function(options) {
		options.async = true
	})
	var _url = window.location.pathname;

	//index ajax start 
	if(_url == '/') {
		$.get('/server/indexClouse')
		.then(function(data) {
			var _poa = $('.poster').find('a')
			var _pos = $('.poster').find('img'),
				_i   = 0

				try {
					for(; _i < data.form.length; _i++) {
						if(!data.form[_i].gid){
							_poa.eq(_i).attr('href','/supplierlist/' + data.form[_i].suid + '/?url=' + window.location.href)
						}else{
							_poa.eq(_i).attr('href','/goods/' + data.form[_i].gid + '/' + data.smid + '/' + data.form[_i].suid + '/?url=' + window.location.href)
						}
						_pos.eq(_i).attr('src', data.form[_i].picUrl)
					}
				}catch(e) {
					
				}
			return $.ajax({
				type : 'GET',
				url  : '/server/indexSupplier',
				data : {
					num: $('.supplier').find('li').length 
				}
			})
		})
		.then(function(data) {
			var _h5   = $('.supplier').find('li').find('h5'),
				_span = $('.supplier').find('li').find('span'),
				_href = $('.splist').attr('href')
				_i    = 0
			if(data.length == 0) {
				$('.supplier').find('li').eq(_i).find('.splist').attr('href', 'javascript:viod(0);')
			}
			else {
				for(; _i < data.length; _i++) {
					_h5.eq(_i).text(data[_i].supplierName)
					_span.eq(_i).text(data[_i].businessScope)
					$('.supplier').find('li').eq(_i).find('.splist').attr('href', _href + data[_i].suid + '/?url=' + window.location.href)
				}
			}
			return $.ajax({
				type : 'GET',
				url  : '/server/indexBrand',
				data : {
					num: $('.brand').find('li').length 
				}
			})
		})
		.then(function(data) {
			var _brand  = $('.brand').find('ul').find('img'),
				_href   = $('.brand').find('a').attr('href'),
				_win    = window.location.pathname,
				_ot     = $('.ot'),
				_i      = 0
			if(data.length == 0) {
				$('.brand').find('ul').css('display', 'none')
			}
			else {
				outerloop:
					for(; _i < $('.brand').find('a').length; _i++) {
						try {
							_brand.eq(_i).attr('src', data[_i].logo)
							_ot.eq(_i).text(data[_i].brand_name)
							$('.brand').find('a').eq(_i).attr('href', _href + '/?bid=' + data[_i].bid + '&url=' + _win)
						}catch(e) {
							break outerloop
						}
					}
			}
			return $.ajax({
				type : 'GET',
				url  : '/server/indexGoods',
				data : {
					num: $('.histry').find('li').length 
				}
			})
		})
		.then(function(data) {

			var _histry  = $('.histry').find('.aul').find('img'),
				_ha      = _histry.parent('a'),
				_name    = $('.histry').find('.ht'),
				_na      = _name.parent('a'),
				_price   = $('.histry').find('i'),
				_win     = window.location.pathname,
				_i       = 0
			if(data.json.length == 0) {
				$('.histry').find('ul').css('display', 'none')
			}
			else {
				for(; _i < data.json.length; _i++) {
					_histry.eq(_i).attr('src',data.json[_i].detailed_description)
					_name.eq(_i).text(data.json[_i].name_commodity)
					_price.eq(_i).text(_price.eq(_i).text().substring(0, 1) + data.json[_i].goodsSellPrice)
					_ha.eq(_i).attr('href','/goods/' + data.json[_i].gid + '/' + data.smid + '/' + data.json[_i].suid + '/?url=' + _win)
					_na.eq(_i).attr('href','/goods/' + data.json[_i].gid + '/' + data.smid + '/' + data.json[_i].suid + '/?url=' + _win)
				}
			}
		})
	}
	//index ajax end

	//list search start
	if(_url == '/list/') {
		var val = null 
		$('.in').on('click', function() {
			if($(this).siblings('#search').val() == val || $(this).siblings('#search').val() == '' || $(this).siblings('#search').val() == 'undefined') {
				return
			}else if($('#one').text() == '商品'){
				$('.list ul').html('')
				val = $('#search').val()
				$.ajax({
					type : 'GET',
					url  : '/list?name_commodity=' + val
				})
					.then(function(data) {
						$('.allSupplier').find('ul').html(''),
						$('.bar').show(),
						//$('.list').html(data),
						$('.keyword').hide()
					})
			}else if($('#one').text() == '供应商'){
				var href = window.location.pathname
				$('.list ul').html('')
				val = $('#search').val()
				$.ajax({
					type : 'GET',
					url  : '/list?searchSupplier=' + val + '&url=' + href
				})
					.then(function(data) {
						$('.list').html(''),
						$('.allSupplier').find('ul').html(data),
						$('.keyword').hide(),
						$('.bar').hide()
					})
			}
		})
	}
	//list search end

	//moreSup start
	if(_url.substring(1).split('/')[0] == 'supplierlist') {
		$.ajax({
			type : 'GET',
			url  : '/server/moreSupplier/' + _url.substring(1).split('/')[1]
		})
		.done(function(data) {
	
			$('.supplier').find('.suname').text(data.supplierName)
			$('.supplier').find('.agentBrand').find('span').text(data.agentBrand)
			$('.supplier').find('.ps').find('span').text(data.provincePs + data.cityPs + data.countyPs)
		})
	}
	//moreSup end


	//user confirm start 
	if(_url.substring(1).split('/')[1] == 'confirm') {
		$.ajax({
			type : 'GET',
			url  : '/server/marketInfo'
		})
		.done(function(data) {
			var consignee = data.consignee,
				address   = data.province + ' ' +  data.county + ' ' + data.shippingAddress + ' ' + data.marketAreaTwo,
				phone     = data.phone
			$('.consignee').text(consignee)
			$('.address').text(address)
			$('.phone').text(phone)
		})
	}
	//user confirm end



	//user goods start
	
	
	
	//user goods end
	
})
// request indexSupplier data

//热门搜索
function keySearch(obj){
	$('.list ul').html('')
	val = $(obj).text()
	$.ajax({
		type : 'GET',
		url  : '/list?name_commodity=' + val
	})
	.then(function(data) {
		$('.list').html(data)
		$('.bar').css({'display': 'block', 'marginTop':0})
	})
}