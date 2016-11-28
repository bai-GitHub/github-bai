/// const url for server
//const baseUrl = 'http://192.168.99.11:8080/'
var fs = require('fs')
var path = require('path')

var uri = JSON.parse(fs.readFileSync(__dirname + '/' + 'config.properties'))

var baseUrl = uri.apiUrl + ":" +  uri.apiPort + '/'
//const baseUrl = 'http://192.168.99.13:8080/'
//const baseUrl = 'http://10.45.237.113:8089/'
//const baseUrl = 'http://192.168.5.166:8080/'
// const baseUrl = 'http://139.129.97.135:8080/'

//公用接口调用

//注册
exports.register = baseUrl + 'FastEliminateApp/supermarketRegister'

//登陆
exports.login = baseUrl + 'FastEliminateApp/supermarketLogin'

//得到验证码
exports.getCode = baseUrl + 'FastEliminateApp/getCode'

//验证码是否正确
exports.yanCode = baseUrl + 'FastEliminateApp/FindCodeIsExits'

//验证手机或者用户是否可用
exports.available = baseUrl + 'FastEliminateApp/supermarketIsRegister'


/*************首页******************/

//get  ad
exports.getAd = baseUrl + 'FastEliminateApp/findAdvertisement'

//get  notice
exports.getNotice = baseUrl + 'FastEliminateApp/findWeekNotice'

//get floor
exports.getFloor = baseUrl + 'FastEliminateApp/goodsFloorBrandQuery'

//get  推荐
exports.getSuggest = baseUrl + 'FastEliminateApp/homeGoodsArrayQuery'

//get 金牌供应商
exports.getGoldSupplier = baseUrl + 'FastEliminateApp/homesupplier'

//get 所有供应商
exports.getAllSupplier = baseUrl + 'FastEliminateApp/supplierQuery'

//get 推荐品牌
exports.getSuggestBrand = baseUrl + 'FastEliminateApp/brandQuery'

//get 所有品牌
exports.getAllBrand = baseUrl + 'FastEliminateApp/homeBrandQueryArray'

//get 没有限制的所有品牌
exports.brandQueryArray = baseUrl + 'FastEliminateApp/brandQueryArray'


//get 进货单
exports.getMyOrder = baseUrl + 'FastEliminateApp/findStock'

//加入 进货单
exports.addShoppingOrder = baseUrl + 'FastEliminateApp/insertStock'

//加入 收藏
exports.addCollection = baseUrl + 'FastEliminateApp/insertFavorite'

//删除收藏
exports.deleteCollection = baseUrl + 'FastEliminateApp/deleteFavorite'

//delete 进货单
exports.deleteOrder = baseUrl + 'FastEliminateApp/deleteStock'

//得到楼层的二级分类下面的数据
exports.floorGoodsByCate = baseUrl + 'FastEliminateApp/goodsFloorQuery'

//得到楼层的二级分类下面的数据
exports.userFavorite = baseUrl + 'FastEliminateApp/findFavorite'

//搜索单个商品 根据gid
exports.getGoodsDetail = baseUrl + 'FastEliminateApp/goodsQueryById'

//品牌所有商品 brandQueryByIdArray
exports.getbrandGoods = baseUrl + 'FastEliminateApp/brandQueryByIdArray'

/******************search *******************/
//search
exports.search = baseUrl + 'FastEliminateApp/goodsQuery'

//search supplier
exports.searchSupplier = baseUrl + 'FastEliminateApp/supplierfuzzyQuery'

//search 左边推荐
exports.searchSuggest = baseUrl + 'FastEliminateApp/goodsRecommendQuery'  //name_commodity   county





/*************user******************/

//得到进货单
exports.getShoppingOrder = baseUrl + 'FastEliminateApp/findStock'

// get order
exports.myOrder = baseUrl + 'FastEliminateApp/findOrder'

// get exchange
exports.exchange = baseUrl + 'FastEliminateApp/findExchange'

// get 积分
exports.myIntegral= baseUrl + 'FastEliminateApp/findIntegral'

// get 积分 详细
exports.myIntegralDetail= baseUrl + 'FastEliminateApp/findIntegralRecord'

// get 用户优惠券
exports.myCoupons= baseUrl + 'FastEliminateApp/findCoupons'

// get 用户优惠券
exports.updataMyPassword= baseUrl + 'FastEliminateApp/updatePayPassword'


//用户更新支付密码
exports.updataMyPassword= baseUrl + 'FastEliminateApp/updatePayPassword'

// 用户更新登陆密码
exports.updataLoginPassword= baseUrl + 'FastEliminateApp/findLoginPassword'

// 用户修改登陆密码
exports.modifyLoginPassword= baseUrl + 'FastEliminateApp/supermarketUpdate'

// 验证原支付密码
exports.verifyPayPassword= baseUrl + 'FastEliminateApp/findPayPassword'

// 用户个人信息查询
exports.userInfo= baseUrl + 'FastEliminateApp/supermarketInfo'

//最终结算
exports.finalSettle= baseUrl + 'FastEliminateApp/closeAccount'

//修改个人信息
exports.modifyInfo= baseUrl + 'FastEliminateApp/supermarketUpdate'

//忘记密码
exports.forgetPassword= baseUrl + 'FastEliminateApp/forgetSupermarketLoginPassword'


//订单详情页
exports.DetialOfOrder= baseUrl + 'FastEliminateApp/findOrderById'

//我的账本
exports.findMyRecord= baseUrl + 'FastEliminateApp/findSupermarketRecord'
/************* Supplier ******************/

//得到供应商详情
exports.supplierDetail = baseUrl + 'FastEliminateApp/supplierDetailQuery'

//得到供应商详情 里面的商品
exports.supplierDetailGoods = baseUrl + 'FastEliminateApp/suppliergoodsQuery'

//站内搜索
exports.supplierSearch = baseUrl + 'FastEliminateApp/suppliergoodsfuzzyQuery'

//供应商推荐商品查询
exports.supplierSuggestGood = baseUrl + 'FastEliminateApp/suppliergoodstenQuery'

//供应商分类查询
exports.supplierCategory = baseUrl + 'FastEliminateApp/classificationQuery' //suid

//供应商 筛选
exports.sift = baseUrl + 'FastEliminateApp/goodsScreeningQuery'  //name_commodity   county suid   price  bid sorting

//供应商 价格区间
exports.price  = baseUrl + 'FastEliminateApp/goodsPriceQuery'  //name_commodity   county suid


//超市的总产品数量

exports.allNum = baseUrl + 'FastEliminateApp/insertStock'


//查询省级的接口
exports.marketAddress = baseUrl + 'FastEliminateApp/addressQueryBackstage'

//查询省级以下的接口

exports.marketAddresss = baseUrl + 'FastEliminateApp/addresssQueryBackstage'

//查询业务员
exports.searchSalesman = baseUrl + 'FastEliminateApp/salesmansQuery'

//更改订单状态。
exports.updateOrder = baseUrl + 'FastEliminateApp/updateOrder'

//查询订单数量接口
exports.findOrderNum = baseUrl + 'FastEliminateApp/findOrderNum'

//查询所有公告
exports.moreNotice = baseUrl + 'FastEliminateApp/moreNotice'

//查询公告详情页面
exports.oneNotice = baseUrl + 'FastEliminateApp/FindOneNotice'

//意见反馈
exports.FeedbackAdd = baseUrl + 'FastEliminateApp/FeedbackAdd'

//供应商详情筛选分类
exports.findSecondClass = baseUrl + 'FastEliminateApp/findSecondClass'

//供应商详情筛选品牌
exports.supplierAllBrandQuery = baseUrl + 'FastEliminateApp/supplierAllBrandQuery'

//关键词
exports.keywordsQuery = baseUrl + 'FastEliminateApp/keywordsQuery'


//订单结算
exports.closeAccounts = baseUrl + 'FastEliminateApp/closeAccounts'

//分类
exports.getClassification = baseUrl + 'FastEliminateApp/getClassification'

//最终付款接口
exports.QRPay = 'http://123.57.140.21:8080/project.pay.controller-0.0.1-SNAPSHOT/wechat/QRPay/unifiedOrder.rest'


//申诉
exports.insertsExchange = baseUrl + 'FastEliminateApp/insertsExchange'

//子订单接口
exports.updateChildOrder = baseUrl + 'FastEliminateApp/updateChildOrder'

//查询公告详情

exports.noticeInfo = baseUrl + 'FastEliminateApp/noticeInfo'