var express    = require('express')
var router     = express.Router()
var main       = require('../config/request')
var baseUrl    = require('../config/url')
var info       = require('../config/console')
var moment     = require('moment')
//请求主页
router.get('/', function(req, res) {
	try{
		req.session.userInfo.smid
	}
	catch(e) {
		res.redirect('/user')
	}
	res.render('index')
})
//请求用户页面
router.get('/user', function(req, res) {
	res.render('login/login', {user: req.session.passwordError})

})
//请求注册页面
router.get('/registry', function(req, res) {
	res.render('login/registry')
})
//请求最后注册页面
router.post('/registryFinal', function(req, res) {
	req.session.user = req.body.user
	res.render('login/registryFinal' , {user: req.session.user})
})
//请求忘记密码1
router.get('/forgot', function(req, res) {
	res.render('login/forgot')
})




//请求忘记密码页面2
router.post('/forgotFinal', function(req, res) {
	req.session.user = req.body.user
	res.render('login/forgotFinal', {user: req.session.user})
})






//请求商品列表
router.all('/list', function(req, res) {
	if(req.query.name_commodity) {
		req.session.user.goodsName = req.query.name_commodity
		var form = {
			name_commodity: req.query.name_commodity,
			currentPage   : "0",
			county        : req.session.userInfo.county
		}
		main.post(form, baseUrl.sift, function(body) {
			var json = JSON.parse(body)
			res.render('list/search', {items: json.content.goods, smid: req.session.user.content.smid, county: req.session.user.content.county})
		})
	}else if(req.query.num){
		var form = {
			name_commodity: req.session.user.goodsName,
			currentPage : req.query.num,
			ssid        : req.session.user.content.ssid
		}
		main.post(form, baseUrl.searchSupplier, function(body) {
			var json = JSON.parse(body)
			res.render('list/searchSupplier', {items: json.content, smid: req.session.user.content.smid, county: req.session.user.content.county, url: req.query.url})
		})
	}else if(req.query.searchSupplier){
		req.session.user.searchSupplier = req.query.searchSupplier
		var form = {
			supplierName: req.query.searchSupplier,
			currentPage : "0",
			ssid        : req.session.user.content.ssid,
			suid:req.body.suid
		}
		main.post(form, baseUrl.searchSupplier, function(body) {
			var json = JSON.parse(body)
			res.render('list/searchSupplier', {items: json.content, smid: req.session.user.content.smid, county: req.session.user.content.county, url: req.query.url})
		})
	}else if(req.query.searchSupplierNum){
		var form = {
			supplierName: req.session.user.searchSupplier,
			currentPage : req.query.searchSupplierNum,
			ssid        : req.session.user.content.ssid,
			suid:req.body.suid
		}
		main.post(form, baseUrl.searchSupplier, function(body) {
			var json = JSON.parse(body)
			res.render('list/searchSupplier', {items: json.content, smid: req.session.user.content.smid, county: req.session.user.content.county, url: req.query.url})
		})
	} else if(req.query.levelName3){
		req.session.user.goodsName = req.query.levelName3
		var form = {
			levelName3 : req.query.levelName3,
			county     : req.session.userInfo.county,
			currentPage: "0",
			sorting    : "5",
			suid:req.body.suid
		}
		main.post(form, baseUrl.sift, function(body) {
			var json = JSON.parse(body)
			res.render('list/cationSearch', {items: json.content.goods, smid: req.session.user.content.smid, county: req.session.user.content.county, url: req.query.url, a: 1})
		})
	}else if(req.query.fult){
		var form = {
			sorting    : "5",
			name_commodity: req.body.searchName,
			county     : req.session.userInfo.county,
			currentPage: "0",
			suid:req.body.suid
		}
		main.post(form, baseUrl.sift, function(body) {
			var json = JSON.parse(body)
			res.render('list/search', {items: json.content.goods, smid: req.session.user.content.smid, county: req.session.user.content.county, url: req.query.url})
		})
	} else if(req.query.jiaGeZ){
		var form = {
			sorting    : "3",
			name_commodity: req.body.searchName,
			county     : req.session.userInfo.county,
			currentPage: "0",
			suid:req.body.suid
		}
		main.post(form, baseUrl.sift, function(body) {
			var json = JSON.parse(body)
			res.render('list/search', {items: json.content.goods, smid: req.session.user.content.smid, county: req.session.user.content.county, url: req.query.url})
		})
	} else if(req.query.jiaGeD){
		var form = {
			sorting    : "4",
			name_commodity: req.body.searchName,
			county     : req.session.userInfo.county,
			currentPage: "0",
			suid:req.body.suid
		}
		main.post(form, baseUrl.sift, function(body) {
			var json = JSON.parse(body)
			res.render('list/search', {items: json.content.goods, smid: req.session.user.content.smid, county: req.session.user.content.county, url: req.query.url})
		})
	}else if(req.query.salesVolumeZ){
		var form = {
			sorting    : "2",
			name_commodity: req.body.searchName,
			county     : req.session.userInfo.county,
			currentPage: "0",
			suid        :req.body.suid
		}
		main.post(form, baseUrl.sift, function(body) {
			var json = JSON.parse(body)
			res.render('list/search', {items: json.content.goods, smid: req.session.user.content.smid, county: req.session.user.content.county, url: req.query.url})
		})
	}else if(req.query.salesVolumeD){
		var form = {
			sorting    : "1",
			name_commodity: req.body.searchName,
			county     : req.session.userInfo.county,
			currentPage: "0",
			suid        :req.body.suid
		}
		console.log("xyz"+form);
		main.post(form, baseUrl.sift, function(body) {
			var json = JSON.parse(body)
			res.render('list/search', {items: json.content.goods, smid: req.session.user.content.smid, county: req.session.user.content.county, url: req.query.url})
		})
	}else if(req.query.bid){
		var form = {
			bid        : req.query.bid,
			county     : req.session.userInfo.county,
			currentPage: "0",
			sorting    : "5"
		}
		main.post(form, baseUrl.sift, function(body) {
			var json = JSON.parse(body)
			res.render('list/cationSearch', {bid:req.query.bid,items: json.content.goods, smid: req.session.user.content.smid, county: req.session.user.content.county, url: req.query.url})
		})
	}else if(req.query.levelName2){
		req.session.user.goodsName = req.query.levelName2
		var form = {
			levelName2 : req.query.levelName2,
			county     : req.session.userInfo.county,
			currentPage: "0",
			sorting    : "5"
		}
		main.post(form, baseUrl.sift, function(body) {
			var json = JSON.parse(body)
			res.render('list/cationSearch', {items: json.content.goods, smid: req.session.user.content.smid, county: req.session.user.content.county, url: req.query.url, a: 1})
		})
	}else if(req.query.levelName1){
		var form = {
			levelName1 : req.query.levelName1,
			county     : req.session.userInfo.county,
			currentPage: "0",
			sorting    : "5"
		}
		main.post(form, baseUrl.sift, function(body) {
			var json = JSON.parse(body)

			res.render('list/cationSearch', {items: json.content.goods, smid: req.session.user.content.smid, county: req.session.user.content.county, url: req.query.url, a: 1})
		})
	} else {
		var form = {
			ssid        : req.session.userInfo.ssid
		}
		main.post(form, baseUrl.keywordsQuery, function(body) {
			var json = JSON.parse(body)
			res.render('list/list', {county: req.session.user.content.county, keyWord:json.content, url: req.query.url})
		})
	}
})



//请求供应商所有商品列表
router.get('/supplierlist/:id', function(req, res) {

	if(req.query.num){
		var form = {
			suid       : req.params.id,
			currentPage: req.query.num
		}

		main.post(form, baseUrl.sift, function(body) {
			var json = JSON.parse(body)
			res.render('list/supplierMore', {items: json.content, suid: form.suid, county: req.session.user.content.county, smid: req.session.user.content.smid, url: req.query.url})
		})

	}else{
		var form = {
			suid       : req.params.id,
			currentPage: '0'
		}
		main.post(form, baseUrl.sift, function(body) {
			var json = JSON.parse(body)
			res.render('list/supplierlist', {items: json.content, suid: form.suid, county: req.session.user.content.county, smid: req.session.user.content.smid, url: req.query.url})
		})
	}
})

//轮播图请求商品详情
router.get('/goodss/:id', function(req, res) {
	var form = {
		gid : req.params.id,
		smid: req.session.user.content.smid
	}
	main.post(form, baseUrl.getGoodsDetail, function(body) {
		var json = JSON.parse(body)
		res.render('details/goods', {items: json.content, smid: req.session.user.content.smid, url: req.query.url})
	})
})
//请求商品详情页面
router.get('/goods/:id/:sm/:su', function(req, res) {
	var form = {
		gid : req.params.id,
		smid: req.session.user.content.smid
	}
	
	main.post(form, baseUrl.getGoodsDetail, function(body) {
		var json = JSON.parse(body)
			try {
				var url = ''
				if(req.query.url.length) {
					url = req.query.url.join('&url=')
				}
				res.render('details/goods', {items: json.content, smid: req.session.user.content.smid, url: url})
			} catch(e) {
				res.render('details/goods', {items: json.content, smid: req.session.user.content.smid, url: req.query.url})
			}


	})
})

//请求订单页面
router.all('/order', function(req, res) {
	if(req.query.name_commodity){
		var form = {
			smid          : req.session.user.content.smid,
			orderState    : '',
			name_commodity: req.body.name_commodity,
			supplierName  : '',
			endTime       : '',
			currentPage   : '0',
		}
		main.post(form, baseUrl.myOrder, function(body) {
			var json = JSON.parse(body)
			res.render('order/orderSearch', {items: json.content, smid: req.session.user.content.smid})
		})
	}else if(req.query.num){
		var form = {
			orderState    : req.query.orderState,
			smid          : req.session.user.content.smid,
			name_commodity: '',
			supplierName  : '',
			endTime       : '',
			currentPage   : req.query.num
		}
		main.post(form, baseUrl.myOrder, function(body) {
			var json = JSON.parse(body)
			res.render('order/orderSearch', {items: json.content, smid: req.session.user.content.smid})
		})
	}else if(req.query.bigOrder){
		var form = {
			smid          : req.session.user.content.smid,
			orderState    : '',
			name_commodity: '',
			supplierName  : '',
			endTime       : '',
			currentPage   : '0',
			bigOrder      : req.body.bigOrder,
		}
		main.post(form, baseUrl.myOrder, function(body) {
			var json = JSON.parse(body)
			res.render('order/orderSearch', {items: json.content, smid: req.session.user.content.smid})
		})
	}else if(req.query.orderState1){
		var form = {
			smid          : req.session.user.content.smid,
			orderState    : '1',
			name_commodity: '',
			supplierName  : '',
			endTime       : '',
			currentPage   : '0',
			bigOrder      : ''
		}
		main.post(form, baseUrl.myOrder, function(body) {
			var json = JSON.parse(body)
			res.render('order/order', {items: json.content, smid: req.session.user.content.smid, mobile: req.session.userInfo.mobile})
		})

	}else if(req.query.orderState2){
		var form = {
			smid          : req.session.user.content.smid,
			orderState    : '2',
			name_commodity: '',
			supplierName  : '',
			endTime       : '',
			currentPage   : '0',
			bigOrder      : ''
		}
		main.post(form, baseUrl.myOrder, function(body) {
			var json = JSON.parse(body)
			res.render('order/order', {items: json.content, smid: req.session.user.content.smid, mobile: req.session.userInfo.mobile})
		})

	}else if(req.query.orderState3){
		var form = {
			smid          : req.session.user.content.smid,
			orderState    : '3',
			name_commodity: '',
			supplierName  : '',
			endTime       : '',
			currentPage   : '0',
			bigOrder      : ''
		}
		main.post(form, baseUrl.myOrder, function(body) {
			var json = JSON.parse(body)
			res.render('order/order', {items: json.content, smid: req.session.user.content.smid, mobile: req.session.userInfo.mobile})
		})

	}else{
		var form = {
			smid          : req.session.user.content.smid,
			orderState    : '',
			name_commodity: '',
			supplierName  : '',
			endTime       : '',
			currentPage   : '0'
		}
		main.post(form, baseUrl.myOrder, function(body) {
			var json = JSON.parse(body)
			res.render('order/order', {items: json.content, smid: req.session.user.content.smid, mobile: req.session.userInfo.mobile})
		})
	}
})
//请求订单详情页面
router.get('/orderDetail/:id', function(req, res) {
	var data = JSON.parse(req.params.id)
	main.post(data, baseUrl.DetialOfOrder, function(body) {
		var json = JSON.parse(body)
		res.render('order/orderDetail', {items: json.content, big: data.bigOrder, smid: req.session.user.content.smid})
	})

})
//请求订单单个搜索页面
router.get('/searchOrder', function(req, res) {

	res.render('order/searchOrder')
})
//请求个人中心页面
router.get('/user/myCenter', function(req, res) {
	var form ={
		smid: req.session.user.content.smid
	}
	main.post(form, baseUrl.findOrderNum, function(body) {
		var json = JSON.parse(body)
		req.session.user.content.toBePaid    = json.content.toBePaid
		req.session.user.content.toBeShipped = json.content.toBeShipped
		req.session.user.content.Shipped     = json.content.Shipped
		res.render('my/myCenter', {user: req.session.user})
	})

})
//请求个人中心设置页面
router.get('/user/settings', function(req, res) {
	res.render('my/settings')
})
//请求安全中心设置页面
router.get('/user/security', function(req, res) {
	res.render('my/security')
})
//请求关于我们页面
router.get('/user/about', function(req, res) {
	res.render('my/about')
})
//请求手机验证页面
router.get('/user/auth', function(req, res) {
	res.render('my/phoneverity', {user: req.session.user})
})
//请求重新设置的页面
router.get('/user/newphone', function(req, res) {
	res.render('my/newPhone', {user: req.session.user})
})
//请求修改密码的页面
router.get('/user/newpassword', function(req, res) {
	res.render('my/newPassword')
})

//请求我的账本页面
router.get('/user/books', function(req,res) {
	if(req.query.num){
		var form = {
			smid       : req.session.user.content.smid,
			currentPage: req.query.num
		}
		main.post(form, baseUrl.findMyRecord, function(body) {
			var json = JSON.parse(body),
				arry = [],
				data = {}
			for(var i = 0; i < json.content.length; i++) {
				data = {
					year       : moment(+(json.content[i].createTime)).format('YYYY/MM/DD'),
					time       : moment(+(json.content[i].createTime)).format('h:mm:ss'),
					count      : json.content[i].count,
					recordMoney: json.content[i].recordMoney,
					page       : json.content[i].page,
					tradeId    : json.content[i].tradeId
				}
				arry.push(data)
			}
			res.render('my/booksMore', {items: arry})
		})
	}else{
		var form = {
			smid       : req.session.user.content.smid,
			currentPage: '0'
		}
		main.post(form, baseUrl.findMyRecord, function(body) {
			var json = JSON.parse(body),
				arry = [],
				data = {}
			for(var i = 0; i < json.content.length; i++) {
				data = {
					year       : moment(+(json.content[i].createTime)).format('YYYY/MM/DD'),
					time       : moment(+(json.content[i].createTime)).format('h:mm:ss'),
					count      : json.content[i].count,
					recordMoney: json.content[i].recordMoney,
					page       : json.content[i].page,
					tradeId    : json.content[i].tradeId
				}
				arry.push(data)
			}
			res.render('my/myBooks', {items: arry})
		})
	}
	
})
//请求我的账户信息页面
router.get('/user/information', function(req, res) {
	var form ={
		smid: req.session.user.content.smid
	}
	main.post(form, baseUrl.userInfo, function(body) {
		var json = JSON.parse(body)
		res.render('my/information', {info: json.content, smid: req.session.user.content.smid})
	})
})
//请求收藏页面
router.get('/user/coll', function(req, res) {
	var form ={
		smid: req.session.user.content.smid
	}
	main.post(form, baseUrl.userFavorite, function(body) {
		var json          = JSON.parse(body)
		req.session.goods = json.content
		res.render('my/coll', {user: req.session.user, goods: json.content})
	})
})
//请求意见反馈页面
router.get('/user/tickling', function(req, res) {
	res.render('my/tickling')
})
//请求进货单页面
router.get('/user/purchase', function(req, res) {
	var form = {
        smid: req.session.userInfo.smid
    }
    main.post(form, baseUrl.getMyOrder, function(body) {
        var json = JSON.parse(body)
		if(JSON.stringify(json.content).length == 2) {
			var len = 1
		}
		else {
			var len = 2
		}
        res.render('purchase/purchase', {items: json.content, drag: len, smid: form.smid})
    })

})
//请求确认支付页面
router.get('/user/confirm/:id', function(req, res) {
	// var json = JSON.parse(req.params.id)
	var form = {}
	try {
		form = {
			smid: req.session.user.content.smid,
			json: JSON.parse(req.params.id)
		}
		res.render('purchase/confirm', {items: form, ssid: JSON.parse(req.session.userInfo.ssid), url: req.query.url})
	}
	catch (e) {
		form = {
			smid: req.session.user.content.smid,
			json: JSON.parse(req.params.id)
		}
		res.render('purchase/confirm', {items: form, ssid: JSON.parse(req.session.userInfo.ssid)})
	}
})
//请求货到付款页面
router.get('/user/cashPay', function(req, res) {
	res.render('purchase/cashPay')
})
//请求支付页面
router.get('/user/pay/:id', function(req, res) {

	var data = JSON.parse(req.params.id),
		form = {}
		form = {
			body            : data.body,
			out_trade_no    : data.out_trade_no,
			product_id      : data.product_id,
			total_fee       : data.total_fee
		}
	res.render('purchase/pay', {items: JSON.stringify(form)})

})

//请求分类页面
router.all('/cation', function(req, res) {
	var form = {
		level1 : '1000000'
	}
	main.post(form, baseUrl.getClassification, function(body) {
		var json = JSON.parse(body)
		res.render('cation/cation', {level : json.content})
	})
})
//请求快消公告中心页面
router.get('/notice', function(req, res) {
	if(req.query.num){
		var form = {
			ssid       : req.session.user.content.ssid,
			currentPage: req.query.num,
			userType   : 'supermarket'
		}
		main.post(form, baseUrl.moreNotice, function(body) {
			var json = JSON.parse(body)
			res.render('notice/noticeMore', {items: json.content})
		})
	}else{
		var form = {
			ssid       : req.session.user.content.ssid,
			currentPage: '0',
			userType   : 'supermarket'
		}
		main.post(form, baseUrl.moreNotice, function(body) {
			var json = JSON.parse(body)
			res.render('notice/notice', {items: json.content})
		})
	}
})
//请求快消公告中心详情页面
router.get('/oneNotice/:id', function(req, res) {
	var form = {
		announcementId : req.params.id
	}
	main.post(form, baseUrl.noticeInfo, function(body) {
        var json = JSON.parse(body)
       	res.render('notice/oneNotice', {items: json.content})
    })
})
//请求订单搜索页面

router.get('/succAppeal', function(req, res) {
	res.render('order/succAppeal', {smid: req.session.userInfo.smid})
})

module.exports = router