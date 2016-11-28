
//purchase events
$(function() {
	_allLen = 0
	allCheck()
	click()
	resultPrice()
	clickResult()
	uploadData()
	edit()
	backbtn()
	mark = false
	allFlag = false;
	// labelOk()
	if($('.list').find('li').length == 0) {
		$('.result').css('display', 'none')
		$('.edit').css('display', 'none')
	}
	else {
		$('.result').css('display', 'block')
		$('.edit').css('display', 'block')
	}
	$('.succ').css('background', '#ff0000')
	$('.check').css({'top':$('.shop').height()/2 - $('.check').height()/2})
})
//suplier all checked

function allCheck() {
	var _input = $('.list').find('input'),
		_sname = $('.ssname').find('input'),
		_all   = $('.allcheck').find('input'),
		_box   = $('.shop').find('[type=checkbox]'),
		_ssname   = $('.ssname').find('[type=checkbox]')
	_sname.on('click', function() {
		$(this).parent().toggleClass('ok')
		var supplierFlag = $(this).parent().attr("class") == 'ok' ? true : false;

		$(this).parents('.ssname').siblings('.shop').each(function(){
			if(supplierFlag)
			{
				if($(this).find("label").attr("class") != 'ok')
				{

					$(this).find("[type=checkbox]").click();
				}
			}
			else
			{
				if($(this).find("label").attr("class") == 'ok')
				{

					$(this).find("[type=checkbox]").click();
				}
			}

		});
		allPrice()
	})
	//so all check and all shop
	_all.on('click', function() {
		$(this).parent().toggleClass('ok')
		//$('.ssname').find('label').toggleClass('ok')

		mark = !mark
		allFlag = true;

		$('.ssname').find('label').each(function(){
			if(mark)
			{
				if($(this).attr("class") != 'ok')
				{
					$(this).toggleClass('ok');
				}
			}
			else
			{
				if($(this).attr("class") != '')
				{
					$(this).toggleClass('ok');
				}
			}


		});


		_ssname.each(function(){
			if(mark)
			{
				if($(this).parent('label').attr('class') !== 'ok'){
					//$(this).click();
				}
			}
			else
			{
				if($(this).parent('label').attr('class') !== ''){
					//$(this).click();
					$(this).parent('label').removeClass("ok");

				}
			}
		});


		_box.each(function(){
			if(mark)
			{
				if($(this).parent('label').attr('class') !== 'ok'){
					$(this).click();
				}

				$(this).parent('label').addClass("ok");

			}
			else{
				if($(this).parent('label').attr('class') !== ''){
					$(this).click();
					$(this).parent('label').removeClass("ok");

				}


			}
		})
		allPrice()

		allFlag = false;
	})
}
//click add and reduce
function click() {
	var _i   = 0,
		_len = $('.click').length
	for(; _i < _len; _i++) {
		!function(_i) {
			$('.click').eq(_i).find('span').on('click', function() {
				var className = $(this).attr('class'),
					_value    = $(this).siblings('input').val(),
					_index    = $(this).parents('li').index()
				if(className == 'reduce') {
					var _finalValue =+(_value) - 1,
						one         = $(this).parents('.click').siblings('.one').text(),
						two         = $(this).parents('.click').siblings('.two').text(),
						three       = $(this).parents('.click').siblings('.three').text(),
						four        = $(this).parents('.click').siblings('.four').text(),
						fv          = $(this).parents('.click').siblings('.fv').text(),
						sfo         = one.split('-'),
						sft         = two.split('-'),
						sfts        = three.split('-'),
						sftf        = four.split('-'),
						sftv        = fv.split('-'),
						op          = $(this).parents('.click').siblings('.op').text().substring(1),
						tp          = $(this).parents('.click').siblings('.tp').text().substring(1),
						tps         = $(this).parents('.click').siblings('.tps').text().substring(1),
						fp          = $(this).parents('.click').siblings('.fp').text().substring(1),
						fvp         = $(this).parents('.click').siblings('.fvp').text().substring(1),
						fto         = [],
						ftw         = [],
						ftws        = [],
						ftwf        = [],
						ftwv        = []
					ladderPrice(sftv, ftwv, _finalValue, fvp, false, $(this))
					ladderPrice(sftf, ftwf, _finalValue, fp, false, $(this))
					ladderPrice(sfts, ftws, _finalValue, tps, false, $(this))
					ladderPrice(sft, ftw, _finalValue, tp, false, $(this))
					ladderPrice(sfo, fto, _finalValue, op, false, $(this))

					if(_value > 1) {
						$(this).siblings('input').val(_finalValue)

						value(_index)
					}
					if(_finalValue > $(this).siblings('input').attr('maxlength')) {
						alert("超出库存总量!")
					}

					resultNum()

					var em1 = $(this).parents('.click').siblings('em:first').text(),
							ems = em1.split('-'),
							arr = []
					for(var k = 0; k < ems.length; k++) {
						arr.push(ems[k].split('件'))
					}
					if(_finalValue < arr[arr.length - 1][0]) {
						var pric = $(this).parents('.click').siblings('i:first').text().substring(1),
								stu  = $(this).parents('.click').siblings('.prices').text().substring(0, 1)
						$(this).parents('.click').siblings('.prices').text(stu + pric)
					}

				}
				if(className == 'add') {
					var _finalValue = +(_value) + 1
					$(this).siblings('input').val(_finalValue)

					var one   = $(this).parents('.click').siblings('.one').text(),
						two   = $(this).parents('.click').siblings('.two').text(),
						three = $(this).parents('.click').siblings('.three').text(),
						four  = $(this).parents('.click').siblings('.four').text(),
						fv    = $(this).parents('.click').siblings('.fv').text(),
						sfo   = one.split('-'),
						sft   = two.split('-'),
						sfts  = three.split('-'),
						sftf  = four.split('-'),
						sftv  = fv.split('-'),
						op    = $(this).parents('.click').siblings('.op').text().substring(1),
						tp    = $(this).parents('.click').siblings('.tp').text().substring(1),
						tps   = $(this).parents('.click').siblings('.tps').text().substring(1),
						fp    = $(this).parents('.click').siblings('.fp').text().substring(1),
						fvp   = $(this).parents('.click').siblings('.fvp').text().substring(1),
						fto   = [],
						ftw   = [],
						ftws  = [],
						ftwf  = [],
						ftwv  = []
					ladderPrice(sfo, fto, _finalValue, op, true, $(this))
					ladderPrice(sft, ftw, _finalValue, tp, true, $(this))
					ladderPrice(sfts, ftws, _finalValue, tps, true, $(this))
					ladderPrice(sftf, ftwf, _finalValue, fp, true, $(this))
					ladderPrice(sftv, ftwv, _finalValue, fvp, true, $(this))

					value(_index)

					resultNum()
					var em1 = $(this).parents('.click').siblings('em:last').text(),
						ems = em1.split('-'),
						arr = []
					for(var k = 0; k < ems.length; k++) {
						arr.push(ems[k].split('件'))
					}
					if(_finalValue > arr[arr.length - 1][0]) {
						var pric = $(this).parents('.click').siblings('i:last').text().substring(1),
							stu  = $(this).parents('.click').siblings('.prices').text().substring(0, 1)
						$(this).parents('.click').siblings('.prices').text(stu + pric)
					}
					if(_finalValue > $(this).siblings('input').attr('maxlength')) {
						alert("超出库存总量!")
						$(this).siblings('input').val($(this).siblings('input').attr('maxlength'))
					}
				}
			})	
		}(_i)	
	}
}
//suplier one price and all price 
function resultPrice() {
	var _box    = $('.shop').find('[type=checkbox]'),
		_result = 0,
		_nIndex = 0
	_box.on('click', function() {
		var _index  = $(this).parents('li').index(),
			_prop   = $(this).parents('li').eq(_index).find('[type=checkbox]').prop('checked'),
			_val    = $(this).parents('li').eq(_index).find('.cc').find('.price').text(),
			_sum    = $(this).parents('li').eq(_index).find('.lownum').find('.last'),
			_price  = _sum.text(),
			_final  = $(this).parents('li').eq(_index).find('.cc').find('input').val(),
			_num    = +(parseFloat(_val.substring(1))) * _final	
		if(_prop) {
			_result += _num

			value(_index)
			resultNum()
		}
		else {
			_result -= _num
			value(_index)

			resultNum()
		}
		$(this).parent('label').toggleClass('ok');

		if(!allFlag)
		{
			//计算单个供应商下选中的商品数量
			var singleSupplierSCheckedProductNum = 0;
			$(this).parents("li").find(".shop").each(function(){
				if($(this).find("label").attr("class") == 'ok')
				{
					singleSupplierSCheckedProductNum++;
				}
			});

			if(singleSupplierSCheckedProductNum == $(this).parents("li").find(".shop").length)
			{
				if($(this).parents(".shop").siblings(".ssname").find("label").attr("class") !== 'ok')
				{
					$(this).parents(".shop").siblings(".ssname").find("label").addClass("ok");
				}
			}
			else
			{
				if($(this).parents(".shop").siblings(".ssname").find("label").attr("class") !== '')
				{
					$(this).parents(".shop").siblings(".ssname").find("label").removeClass("ok");
				}
			}

			//计算所有供应商下选中的商品数量
			var multiSupplierSCheckedProductNum = 0;
			$(this).parents("ul").find("li").each(function(){
				if($(this).find(".ssname").find("label").attr("class") == 'ok')
				{
					multiSupplierSCheckedProductNum++;
				}
			});

			if(multiSupplierSCheckedProductNum == $(this).parents("ul").find("li").length)
			{
				if($(this).parents(".content").siblings(".result").find("label").attr("class") !== 'ok')
				{
					$(this).parents(".content").siblings(".result").find("label").addClass("ok");
					mark = true;
				}
			}
			else
			{
				if($(this).parents(".content").siblings(".result").find("label").attr("class") !== '')
				{
					$(this).parents(".content").siblings(".result").find("label").removeClass("ok");
					mark = false;
				}
			}
		}



	})
}
//value * price 
function value(_index) {
	var _box      = $('.list').find('li').find('.shop').find('[type=checkbox]').length,
		_allSum   = $('.list').find('li').eq(_index).find('.last'),
		_i        = 0,
		_len      = 0,
		_result   = 0
	for(; _i < _box; _i++) {
		var _prop     = $('.list').find('li').eq(_index).find('.shop').eq(_i).find('[type=checkbox]').prop('checked'),
			_price    = $('.list').find('li').eq(_index).find('.shop').eq(_i).find('.price').text(),
			_inputVal = $('.list').find('li').eq(_index).find('.shop').eq(_i).find('.click').find('input').val(),
			_allprice = _allSum.text().substring(1),
			_onePrice = +(_price.substring(1)),
			_peice    = $('.list').find('li').eq(_index).find('.lownum').find('.piece').find('i'),
			_finPrice = +(_onePrice) * _inputVal

		if(_prop) {
			_len     += +(_inputVal)
			_result  += _finPrice
		}

	}
	//console.log(_result)
	_peice.text(_len)
	_allSum.text(_allSum.text().substring(0, 1) + _result.toFixed(2))

	allPrice()
}
//all prcie from footer
function allPrice() {
	var _len    = $('.list').find('li').length,
		_fot    = $('.allreprice').find('.last'),
		_fp     = _fot.text(),
		_i      = 0,
		_result = 0;
	for(; _i < _len; _i++) {
		var _txt = $('.list').find('li').eq(_i).find('.last').text(),
			_ft  = _txt.substring(1);
		_result += +(_ft)
	}
	_fot.text(_fp.substring(0, 1) + _result.toFixed(2))

}
//all footer result piece num
function resultNum() {
	var _len        = $('.list').find('.piece').find('i').length,
		_footNum    = $('.result').find('.piece').find('i'),
		_i          = 0,
		_resultNum  = 0
	for(; _i < _len; _i++) {
		var _txt = $('.list').find('.piece').eq(_i).find('i').text()	
		_resultNum += +(_txt)	
	}
	_footNum.text(_resultNum)
}
//result ajax formdata gid
function clickResult() {
	$('.succ').on('click', function() {
		if ($('[type=checkbox]:checked').length == 0) {
			alert('请选择商品！')
			return false
		}
		var _i     = 0,
			_data  = '',
			_ldata = '',
			_array = [],
			_finar = [],
			_fdata = {},
			_form  = {},
			_href  = $(this).find('a').attr('href')
		$('[type=checkbox]:checked').parents('li').each(function() {
			_finar = []
			_ldata = $(this).data()
			$(this).find('.shop').find('[type=checkbox]:checked').each(function() {

				_data  = $(this).data()
				_fdata = {
					gid  : _data.more.gid,
					name : _data.more.name,
					pack : _data.more.pack,
					price: $(this).parents('.shop').find('.price').text().substring(1),
					img  : _data.more.img,
					num  : $(this).parents('.check').siblings('.cc').find('.click').find('[type=text]').val(),
					stid : $(this).siblings('[type=hidden]').val()
				}
				_finar.push(_fdata)
			})
			_form  = {}
			_form  = {
				suid: _ldata.suid.suid,
				name: _data.more.supname,
				more: _finar
			}
			_array.push(_form)
		})
		var flag = true,
			_nme = "";

		$('.list').find('li').each(function() {
				var _txt = +($(this).find('.lowprice').find('span:last').text().substring(1)),
					_prc = +($(this).find('.lownum').find('.last').text().substring(1))
				if($(this).find('[type=checkbox]:checked').length > 0) {
					if(_prc < _txt) {
						flag = false;
						_nme += $(this).find('.ssname').find('span').text()
					}
				}
		})
		var flagNum = true,
			_nmeNum = "";
		$('.list').find('li').each(function() {
			var _txtNum = +($(this).find('.minNum').val()),
					_prcNum = +($(this).find('.num').val())
			if($(this).find('[type=checkbox]:checked').length > 0) {
				if(_prcNum < _txtNum) {
					flagNum = false;
					_nmeNum += $(this).find('.ssname').find('span').text()
				}
			}
		})
		if(!flag) {
			alert(_nme + '不能满足最低起送范围！')
		}
		else if(!flagNum)
		{
			alert(_nmeNum + '不能满足最低起送数量！')
		}
		else {
			$('.succ').find('a').attr('href', '/user/confirm/' + encodeURIComponent(JSON.stringify(_array)) + '/?url=' + window.location.href)
		}
	})
}
// formdata upload success price OK
function uploadData() {
	$('.action').on('click', function() {
		var _i     = 0,
			_data  = '',
			_ldata = '',
			_array = [],
			_finar = [],
			_fdata = {},
			_form  = {},
			_stid  = [],
			_href  = $(this).attr('href'),
			_type  = $('.payme').find('[type=radio]:checked').attr('payType')
			$('.list').find('ul').each(function() {
				_ldata = $(this).data()
			$(this).find('li').each(function() {
				_data  = $(this).data()
				_fdata = {
					suid: _ldata.suid,
					gid : _data.gid,
					goodsNum: $(this).find('.sum').find('span').text().substring(1)
				}
				_finar.push(_fdata)
			})
			_form  = {}
			_form  = {
				id         : '',
				smid       : _ldata.smid,
				ssid       : $('.payme').attr('ssid'),
				payType    : _type,
				orderSource: '4',
				goods      : _finar,
				message    : $('#message').val()
			}
		})
		if(!_type) {
			$('.checkPay').css('display', 'block')
			return
		}
		else {
			if(_type == 2) {
				$('.checkPay').css('display', 'none')
				$.get('/server/closeAccounts/?data=' + encodeURIComponent(JSON.stringify(_form)))
						.done(function(data) {
							var form = {
								body            : $('.txt').text(),
								out_trade_no    : data.bigOrder,
								product_id      : data.bigOrder,
								total_fee       : +($('.sub').find('.last').text().substring(1)) * 100
							}
							$.get('/server/deleteOrder/?data=' + encodeURIComponent(JSON.stringify(_stid)))
									.done(function(data) {
										window.location.pathname = '/user/pay/' + encodeURIComponent(JSON.stringify(form))
									})

						})
			}
			else {
				$('.checkPay').css('display', 'none')
				$.get('/server/closeAccounts/?data=' + encodeURIComponent(JSON.stringify(_form)))
						.done(function(data) {
							if(data) {

								$.get('/server/deleteOrder/?data=' + encodeURIComponent(JSON.stringify(_stid)))
										.done(function(data) {
											window.location.pathname = '/user/cashPay'
										})

							}
						})
				console.log(JSON.stringify(_form))
			}
			$('.list').find('li').each(function() {

			})
			$('.list').find('li').each(function() {
				var data = {
					stid: $(this).data().stid
				}
				_stid.push(data)
			})

		}
	})
}


//click edit 
function edit(){
	$('.edit').on('click', function() {
		if($(this).text() == '编辑') {
			$('.allreprice').css('display', 'none')
			$('.editclick').css('display', 'block')
			$(this).text('完成')
		}
		else {
			$('.allreprice').css('display', 'block')
			$('.editclick').css('display', 'none')
			$(this).text('编辑')
		}
		editColl()
		delOrder()
	})
}


//edit coll events
function editColl() {
	var arry = []
	$('.editclick').find('.coll').on('click', function() {
		$('.shop').find('[type=checkbox]:checked').each(function() {
			var href  = $(this).parents('.check').siblings('a').attr('href'),
				data  = {
					gid : href.substring(1).split('/')[1],
					smid: href.substring(1).split('/')[2]
				}
			arry.push(data)	
		})
		$.get('/server/insertColl/' + encodeURIComponent(JSON.stringify(arry)))
		.done(function(data) {
			if(data == 1) {
				$('.mc').css('display', 'block')
				$('.editclick').find('.coll').text('收藏成功')
				var index = $('.mc').text()
				time = setInterval(function() {
					if(index == 0) {
						$('.mc').css('display', 'none')
						$('.editclick').find('.coll').text('收藏')
						$('.mc').text(3)
						clearInterval(time)
						return
					}
					else {
						index--
						$('.mc').text(index)
					}
					console.log(11)
				}, 1000)
			}
		})	
		arry = []
	})
}
//delete orders events
function delOrder() {
	var arry = []
	$('.editclick').find('.del').on('click', function() {
		$('.shop').find('[type=checkbox]:checked').each(function() {
			var data = {
				stid: $(this).data().stid
			}
			arry.push(data)
		})
		$.get('/server/delOrders/' + encodeURIComponent(JSON.stringify(arry)))
		.done(function(data) {
			if(data == 1) {
				$('.list').find('li').each(function() {
					if($(this).find('.shop').length == 0) {
						$(this).remove()
						$('.result').css('display', 'none')
						$('.edit').css('display', 'none')
					}
					else {
						$('.shop').find('[type=checkbox]:checked').parents('.shop').remove()
						if($(this).find('.shop').length == 0) {
							$(this).remove()
							$('.result').css('display', 'none')
							$('.edit').css('display', 'none')
							window.location.pathname = '/user/purchase'
						}
					}
				})
			}
		})
		arry = []
	})
}
//实现阶梯价格增加和减少的价格判定

function ladderPrice(ele, arr, value, price, mask, t) {
	for(var i = 0; i < ele.length; i++) {
		arr.push(ele[i].split('件'))
	}
	if(mask) {
		if (arr.length > 0) {
		/*	console.log("------------------------------");
			console.log(arr[0][0]);
			console.log(arr[arr.length - 1]	[0]);
			console.log(price)*/
			if (arr[0][0] <= value && arr[arr.length - 1][0] >= value) {
				$(t).parents('.click').siblings('.prices').text($(t).parents('.click').siblings('.prices').text().substring(0, 1) + price)
			}
		}
	}
	else {
		if (arr.length > 0) {
			if (arr[0][0] <= value && arr[arr.length - 1][0] >= value) {
				$(t).parents('.click').siblings('.prices').text($(t).parents('.click').siblings('.prices').text().substring(0, 1) + price)
			}
		}
	}
}


//backbtn a href
function backbtn() {
	var _a    = $('.href')
	for(var i = 0; i < _a.length; i++) {
		var _href = _a.eq(i).attr('href')
		_a.eq(i).attr('href', _href + '/?url=' + window.location.href)
	}
}