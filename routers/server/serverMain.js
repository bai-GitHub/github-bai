var express    = require('express')
var router     = express.Router()
var main       = require('../config/request');
var baseUrl    = require('../config/url')
var info       = require('../config/console')
//登陆
router.post('/supermarketLogin', function(req, res) {
    var form  = req.session.user = req.body.user
        main.post(form, baseUrl.login, function(body) {
            var json = JSON.parse(body)
            if(json.flag == false){
                req.session.passwordError = json.msg
                res.redirect('/user')
            }else{
                req.session.userInfo     = json.content
                req.session.user.content = json.content
                res.redirect('/')
            }
        })
})
//验证 用户名/手机 是否存在
router.post('/supermarketIsRegister', function(req, res) {
    var form  = {
        username: req.body.username,
        mobile  : req.body.mobile
    }
    main.post(form, baseUrl.available, function(body) {
        res.json(body)
    })
})
//修改个人信息
router.post('/supermarketUpdate', function(req, res) {
    var form = req.body.user
    main.post(form, baseUrl.modifyLoginPassword, function() {
        req.session.user.content.mobile = req.body.user.mobile,
        req.session.user.loginPassword  = req.body.loginPassword,
        res.redirect('/user/myCenter')
    })
})

//验证码
router.post('/getCode', function(req, res) {
    var form = {
        mobile: req.body.mobile
    }
    main.post(form, baseUrl.getCode, function(body) {
        res.json(body)
    })
})
//验证验证码是否正确
router.post('/FindCodeIsExits',function(req, res) {
    var form = {
        mobile: req.body.mobile,
        code  : req.body.code
    }
    main.post(form, baseUrl.yanCode, function(body) {
        res.json(body)
    })
})
//验证原登录密码
router.post('/findLoginPassword', function(req, res) {
    var form = {
        loginPassword: req.body.loginPassword,
        smid         : req.body.smid
    }
    main.post(form, baseUrl.updataLoginPassword, function(body) {
        res.json(body)
    })
})
//完成忘记密码
router.post('/forgetSupermarketLoginPassword', function(req, res) {
    var form = req.body.user
    main.post(form, baseUrl.forgetPassword, function() {
        req.session.passwordError = ""
        res.redirect('/user')
    })
})
//查询省
router.post('/addressQueryBackstage', function(req, res) {
    var form = null
    main.post(form, baseUrl.marketAddress, function(body) {
        res.json(body)
    })
})
//查询市
router.post('/addresssQueryBackstageCity', function(req, res) {
    var form = {
        province: req.body.province
    }
    main.post(form, baseUrl.marketAddresss + "?code=" + form.province, function(body) {
        res.json(body)
    })
})
//查询区
router.post('/addresssQueryBackstageCounty', function(req, res) {
    var form = {
        city: req.body.city
    }
    main.post(form, baseUrl.marketAddresss + "?code=" + form.city, function(body) {
        res.json(body)
    })
})
//查询街道
router.post('/addresssQueryBackstageMarketArea', function(req, res) {
    var form = {
        county: req.body.county
    }
    main.post(form, baseUrl.marketAddresss + "?code=" + form.county, function(body) {
        res.json(body)
    })
})
//查询业务员
router.post('/salesmansQuery', function(req, res) {
    var form = {
        salesman: req.body.salesman
    }
    main.post(form, baseUrl.searchSalesman + "?salesman=" + form.salesman, function(body) {
        res.json(body)
    })
})
//完成注册
router.post('/supermarketRegister', function(req, res) {
    var form  = req.body.user
    main.post(form, baseUrl.register, function(body) {

    })
    res.redirect("/user")
})

//首页焦点轮播图
router.get('/indexClouse', function(req, res) {
    var form = {
        ssid: req.session.userInfo.ssid
    }
    main.post(form, baseUrl.getAd, function(body) {
        var json = JSON.parse(body),
            data = {
                smid: req.session.userInfo.smid,
                form: json.content
            }
        res.json(data)
    })
})
//首页供货商
router.get('/indexSupplier', function(req, res) {
    var form = {
        ssid: req.session.userInfo.ssid,
        num : req.query.num
    }
    main.post(form, baseUrl.getGoldSupplier, function(body) {
        var json = JSON.parse(body)
        res.json(json.content)
    })
})
//首页推荐品牌
router.get('/indexBrand', function(req, res) {
    var form = {
        ssid: req.session.userInfo.ssid,
        num : req.query.num
    }
    main.post(form, baseUrl.getSuggestBrand, function(body) {
        var json = JSON.parse(body)
        res.json(json.content)
    })
})
//首页推荐商品
router.get('/indexGoods', function(req, res) {
    var form = {
        ssid: req.session.userInfo.ssid,
        num : req.query.num
    }
    main.post(form, baseUrl.getSuggest, function(body) {
        var json = JSON.parse(body)
        var data = {
            smid: req.session.userInfo.smid,
            json: json.content
        }
        res.json(data)
    })
})

//供应商详细信息
router.get('/moreSupplier/:id', function(req, res) {
    var form = {
        suid: req.params.id
    }
    main.post(form, baseUrl.supplierDetail, function(body) {
        var json = JSON.parse(body)
        res.json(json.content)
    })
})
//查询超市详细信息
router.get('/marketInfo', function(req, res) {
    var form = {
        smid: req.session.user.content.smid
    }
    main.post(form, baseUrl.userInfo, function(body) {
        var json = JSON.parse(body)
        res.json(json.content)
    })
})
//加入收藏
router.get('/insertColl/:id', function(req, res) {
    var data = JSON.parse(req.params.id)
    main.post(data, baseUrl.addCollection, function(body) {
        res.json(1)
    })
})
//删除收藏
router.get('/deleteColl/:id', function(req, res) {
    var arry = []
    var data = {
        faid: req.params.id
    }
    arry.push(data)
    main.post(arry, baseUrl.deleteCollection, function(body) {
        res.json(0)
    })
})
//收藏夹删除收藏
router.post('/deleteCollTwo', function(req, res) {
    var arry = []
    var data = {
        faid: req.body.faid
    }
    arry.push(data)
    main.post(arry, baseUrl.deleteCollection, function() {
    })
})

//供应商推荐商品
router.get('/shopCur/:id', function(req, res) {
    var data = {
        suid: req.params.id
    }
    main.post(data, baseUrl.supplierSuggestGood, function(body) {
        var json = JSON.parse(body)
        res.render('details/mend', {items: json.content, smid: req.session.user.content.smid, suid: data.suid})
    })
})
//添加到进货单
router.get('/addOrder/:id', function(req, res) {
    var data = JSON.parse(req.params.id);
    
    main.post(data, baseUrl.addShoppingOrder, function(body) {
        res.json(1)
    })
})
//删除进货单
router.get('/delOrders/:id', function(req, res) {
    var data = JSON.parse(req.params.id)
    main.post(data, baseUrl.deleteOrder, function(body) {
        res.json(1)
    })
})

//价格区间
router.get('/price', function(req, res) {
    var data = JSON.parse(req.query.data)
    main.post(data, baseUrl.price, function(body) {
        var json = JSON.parse(body)
        res.json(json.content)
    })
})

//所有品牌筛选
router.get('/brandQueryArray', function(req, res) {
    var data = JSON.parse(req.query.data)
    main.post(data, baseUrl.brandQueryArray, function(body) {
        var json = JSON.parse(body)
        res.json(json.content)
    })
})

//精确筛选
router.get('/sift', function(req, res) {
    var data = JSON.parse(req.query.data)
    main.post(data, baseUrl.sift, function(body) {
        var json = JSON.parse(body)
        res.render('list/search', {items: json.content.goods})
    })
})

//站内搜索
router.get('/supplierSearch', function(req, res) {
    var form = JSON.parse(req.query.data)
    main.post(form, baseUrl.sift, function(body) {
        var json = JSON.parse(body)
        res.render('list/supplierSearch', {items: json.content, smid: req.session.user.content.smid})
    })
})
//品牌下搜索
router.post('/bidSearch', function(req, res) {
    var form = {
        name_commodity: req.body.goodsName,
        bid : req.body.bid,
        currentPage : "0",
        county     : req.session.userInfo.county,
        sorting    : "5"
    }
    
    main.post(form, baseUrl.sift, function(body) {
        var json = JSON.parse(body)
        res.render('list/cationSearchMore', {bid:req.query.bid,items: json.content.goods, smid: req.session.user.content.smid, county: req.session.user.content.county, url: req.query.url})
    })
})


//意见反馈
router.post('/FeedbackAdd', function(req, res) {
    var form = {
        supermarketId: req.session.user.content.smid,
        source       : "1",
        content      : req.body.user.content
    }

    main.post(form, baseUrl.FeedbackAdd, function(body) {
        res.redirect('/user/myCenter')
    })
})

//供应商详情筛选分类
router.get('/findSecondClass', function(req, res) {
    var data = JSON.parse(req.query.data)
    main.post(data, baseUrl.findSecondClass, function(body) {
        var json = JSON.parse(body)
        res.json(json.content)
    })
})

//供应商详情筛选品牌
router.get('/supplierAllBrandQuery', function(req, res) {
    var data = JSON.parse(req.query.data)
    main.post(data, baseUrl.supplierAllBrandQuery, function(body) {
        var json = JSON.parse(body)
        res.json(json.content)
    })
})
//品牌下的商品

router.post('/logoMore', function(req, res) {
    var form = {
        bid        : req.body.bid,
        county     : req.session.userInfo.county,
        currentPage: req.body.num,
        levelName1 : req.body.levelName1,
        sorting    : "5"
    }
    main.post(form, baseUrl.sift, function(body) {
        var json = JSON.parse(body)
        res.render('list/cationSearchMore', {items: json.content.goods, smid: req.session.user.content.smid, county: req.session.user.content.county, url: req.query.url})
    })

})

//提交订单
router.get('/closeAccounts', function(req, res) {
    var data = JSON.parse(req.query.data)
    main.post(data, baseUrl.closeAccounts, function(body) {
        var json = JSON.parse(body)
        res.json(json)
    })
})

//请求分类
router.all('/cation1', function(req, res) {
    var form = {
        level1 : req.body.level1
    }
    main.post(form, baseUrl.getClassification, function(body) {
        var json = JSON.parse(body)
        res.render('cation/cationLevel', {level : json.content})
    })
})
//修改个人中心账户信息
router.get('/modifyInfo', function(req, res) {
    var data = JSON.parse(req.query.data)
    main.post(data, baseUrl.modifyInfo, function(body) {
        res.json(1)
    })
})

//按状态查询订单
router.get('/orderStatus', function(req, res) {
    var data = JSON.parse(req.query.data);
    main.post(data, baseUrl.myOrder, function(body) {
        var json = JSON.parse(body)
        res.render('order/searchOrder', {items: json.content})
    })
})

//轮询订单最终结算状态
router.get('/findOrderByIds', function(req, res) {
    var data = {
        bigOrder: JSON.parse(req.query.data)
    }
    main.post(data, baseUrl.findOrderByIds, function(body) {
        var json = JSON.parse(body)
        res.json(json.content)
    })
})

// 更新订单状态
router.get('/updateOrder', function(req, res) {
    var data = JSON.parse(req.query.data)
    main.post(data, baseUrl.updateOrder, function(body) {
        var json = JSON.parse(body)
        res.json(json.errorCode)
    })
})


//交易完成申诉
router.get('/insertsExchange', function(req, res) {
    var data = JSON.parse(req.query.data)
    main.post(data, baseUrl.insertsExchange, function(body) {
        var json = JSON.parse(body)
        var form = {
            code:json.errorCode,
            moblie: req.session.userInfo.mobile
        }
        res.json(form)
    })
})

//退出登录
router.get('/logout', function(req, res) {
    delete req.session.user
    delete req.session.userInfo
    res.redirect('/user')
})

//提交完订单之后删除进货单
router.get('/deleteOrder', function(req, res) {
    var data = JSON.parse(req.query.data)
    main.post(data, baseUrl.deleteOrder, function(body) {
        res.json(1)
    })
})

//子订单接口
router.get('/updateChildOrder', function(req, res) {
    var data = JSON.parse(req.query.data)
    main.post(data, baseUrl.updateChildOrder, function(body) {
        res.json(1)
    })
})


//搜索订单

router.post('/searchOrder', function(req, res) {
    var data = req.body.obj;
    main.post(data, baseUrl.myOrder, function(body) {
        var json = JSON.parse(body)
        res.render('order/oneSearchOrder', {items: json.content})
    })
})



module.exports = router