//search all price events
$(function() {
	
	value()
	addOrders()
	//loadUrl()
	moreAdd()
	click()
})
//click add and reduce
function click() {
	var _i   = 0,
		_len = $('.list li').length;
	for(; _i < _len; _i++) {
		!function(_i) {
			$('.list').eq(_i).on('click','span', function() {
				var className = $(this).attr('class'),
					_value    = $(this).siblings('input').val(),
					_index    = $(this).parents('li').index(),
					_url = window.location.pathname;
				if (_url.substring(1).split('/')[0] == 'goods') {
					if(className == 'reduce') {
						var _finalValue = +(_value) - 1
						if(_value > 1) {
							$(this).siblings('input').val(_finalValue)
							value()
							var one   = $('.one').text(),
									two   = $('.two').text(),
									three = $('.three').text(),
									four  = $('.four').text(),
									fv    = $('.fv').text(),
									sfo   = one.split('-'),
									sft   = two.split('-'),
									sfts  = three.split('-'),
									sftf  = four.split('-'),
									sftv  = fv.split('-'),
									op    = $('.op').text().substring(1),
									tp    = $('.tp').text().substring(1),
									tps   = $('.tps').text().substring(1),
									fp    = $('.fp').text().substring(1),
									fvp   = $('.fvp').text().substring(1),
									fto   = [],
									ftw   = [],
									ftws  = [],
									ftwf  = [],
									ftwv  = []
							ladderPrice(sftv, ftwv, _finalValue, fvp, false)
							ladderPrice(sftf, ftwf, _finalValue, fp, false)
							ladderPrice(sfts, ftws, _finalValue, tps, false)
							ladderPrice(sft, ftw, _finalValue, tp, false)
							ladderPrice(sfo, fto, _finalValue, op, false)
						}
						if(_finalValue > $(this).siblings('input').attr('maxlength')) {
							alert("超出库存总量!")
							$(this).siblings('input').val($(this).siblings('input').attr('maxlength'))
						}
					}
				}
				else {
					if (className == 'reduce') {
						var _finalValue = +(_value) - 1
						if (_value > 0) {
							$(this).siblings('input').val(_finalValue)
							value()
							var one = $('.one').text(),
									two = $('.two').text(),
									three = $('.three').text(),
									four = $('.four').text(),
									fv = $('.fv').text(),
									sfo = one.split('-'),
									sft = two.split('-'),
									sfts = three.split('-'),
									sftf = four.split('-'),
									sftv = fv.split('-'),
									op = $('.op').text().substring(1),
									tp = $('.tp').text().substring(1),
									tps = $('.tps').text().substring(1),
									fp = $('.fp').text().substring(1),
									fvp = $('.fvp').text().substring(1),
									fto = [],
									ftw = [],
									ftws = [],
									ftwf = [],
									ftwv = []
							ladderPrice(sftv, ftwv, _finalValue, fvp, false)
							ladderPrice(sftf, ftwf, _finalValue, fp, false)
							ladderPrice(sfts, ftws, _finalValue, tps, false)
							ladderPrice(sft, ftw, _finalValue, tp, false)
							ladderPrice(sfo, fto, _finalValue, op, false)
						}
						if(_finalValue > $(this).siblings('input').attr('maxlength')) {
							alert("超出库存总量!")
							$(this).siblings('input').val($(this).siblings('input').attr('maxlength'))
						}
					}
				}
				if(className == 'add') {
					var _finalValue = +(_value) + 1
					$(this).siblings('input').val(_finalValue)
					value()
					var one   = $('.one').text(),
						two   = $('.two').text(),
						three = $('.three').text(),
						four  = $('.four').text(),
						fv    = $('.fv').text(),
						sfo   = one.split('-'),
						sft   = two.split('-'),
						sfts  = three.split('-'),
						sftf  = four.split('-'),
						sftv  = fv.split('-'),
						op    = $('.op').text().substring(1),
						tp    = $('.tp').text().substring(1),
						tps   = $('.tps').text().substring(1),
						fp    = $('.fp').text().substring(1),
						fvp   = $('.fvp').text().substring(1),
						fto   = [],
						ftw   = [],
						ftws  = [],
						ftwf  = [],
						ftwv  = []
					ladderPrice(sfo, fto, _finalValue, op, false)
					ladderPrice(sft, ftw, _finalValue, tp, true)
					ladderPrice(sfts, ftws, _finalValue, tps, true)
					ladderPrice(sftf, ftwf, _finalValue, fp, true)
					ladderPrice(sftv, ftwv, _finalValue, fvp, true)
					if(_finalValue > $(this).siblings('input').attr('maxlength')) {
						alert("超出库存总量!")
						$(this).siblings('input').val($(this).siblings('input').attr('maxlength'))
					}
					//if(ftw.length > 0) {
					//	if(ftw[0][0] <= _finalValue && ftw[1][0] > _finalValue) {
					//		$('.prices').text($('.prices').text().substring(0, 1) + tp)
					//	}
					//}
					//if(ftws.length > 0) {
					//	if(ftws[0][0] <= _finalValue && ftws[1][0] > _finalValue) {
					//		$('.prices').text($('.prices').text().substring(0, 1) + tps)
					//	}
					//}
				}
			})	
		}(_i)	
	}
}
//all price footer text
function value() {
	var _len      = $('.click').length,
		_footer   = $('.footer').find('.allprice').find('.last'),
		_i        = 0,
		_findVal  = 0,
		_result   = 0	
	for(; _i < _len; _i++) {
		var _val     = $('.click').eq(_i).find('input').val(),
			_price   = $('.click').eq(_i).siblings('.price').text(),
			_findPri = _price.substring(1)
		_result  += +(_findPri) * +(_val)
		_findVal += +(_val)	
	}
	$('.num').find('i').text(_findVal)
	if(_price) {
		_footer.text(_price.substring(0, 1) + _result.toFixed(2))
	}
}


// add orders events
function addOrders() {
	var _these = '',
		data  = {},
		arry  = []

	$('.addshop').unbind('click').click(function() {
		$('.list').find('li').each(function() {
			_that=$(this).find('input').val();
			if(_that > 0) {
				var href = $(this).find('a').eq(0).attr('href');
				var smid=href.substring(1).split('/')[2] || $('.supplier').data().smid;
				var gid=href.substring(1).split('/')[1];
				data = {
					smid    : smid,
					gid     : gid,
					goodsNum: _that
				}
				arry.push(data)
			}
		})

		$.get('/server/addOrder/' + encodeURIComponent(JSON.stringify(arry)))
		.done(function(data){
			if(data == 1) {
				$('.addshop').find('span').css('display', 'block')
				var index = $('.addshop').find('span').text()
				$('.addshop').text('添加成功');
				$(".addshop").css("background","#000")
				time = setInterval(function() {
					if(index == 0) {
						$('.addshop').text('加入进货单')
						$(".addshop").css("background","red")
						$('.addshop').find('span').css('display', 'none')
						$('.addshop').find('span').text(3)
						clearInterval(time)
					}
					else {
						index--
						$('.shop').find('span').text(index)
					}
				}, 1100)
			} 
		})
	})
}

function removeColl(obj){
	$.ajax({
		type    : 'POST',
		url     : "/server/deleteCollTwo",
		dataType: "json",
		data: {
			faid: function () {
				return $(obj).next('.faid').val()
			},
		},
	})
	$(obj).parent('i').parent('.lese').parent('li').remove()
}


//实现阶梯价格增加和减少的价格判定

function ladderPrice(ele, arr, value, price, mask) {
	for(var i = 0; i < ele.length; i++) {
		arr.push(ele[i].split('件'))
	}
	if(mask) {
		if (arr.length > 0) {
			if (arr[0][0] <= value && arr[arr.length - 1][0] > value) {
				$('.prices').text($('.prices').text().substring(0, 1) + price)
			}
		}
	}
	else {
		if (arr.length > 0) {
			if (arr[0][0] <= value && arr[arr.length - 1][0] >= value) {
				$('.prices').text($('.prices').text().substring(0, 1) + price)
			}
		}
	}
}

//供应商分配url地址

function loadUrl() {
	var href = $('.url').attr('href'),
		name = window.location.href

	for(var i = 0; i < $('.url').length; i++) {
		$('.url').eq(i).attr('href', href + '?url=' + name)
	}
}


//商品详情页面添加到进货单页面

function moreAdd() {
	var _this = '',
			data  = {},
			arry  = []

	$('.moreAddshop').click(function() {
		_this = $(this).siblings('.action').find('input').val()
		if(_this > 0) {
			var href = $(this).siblings('.host').attr('href')
			data = {
				smid    : href.substring(1).split('/')[2] || $('.supplier').data().smid,
				gid     : href.substring(1).split('/')[1],
				goodsNum: _this
			}
			arry.push(data)
		}

		
		$.get('/server/addOrder/' + encodeURIComponent(JSON.stringify(arry)))
				.done(function(data){
					if(data == 1) {
						$('.moreAddshop').find('span').css('display', 'block')
						var index = $('.moreAddshop').find('span').text()
						$('.moreAddshop').text('添加成功')
						time = setInterval(function() {
							if(index == 0) {
								$('.moreAddshop').text('加入进货单')
								$('.moreAddshop').find('span').css('display', 'none')
								$('.moreAddshop').find('span').text(3)
								clearInterval(time)
							}
							else {
								index--
								$('.shop').find('span').text(index)
							}
						}, 1000)
					}
					arry = []
				})
	})
}
