/**
 * Created by kxhl on 2016/6/2.
 */

//uin pay more na

$(function() {
    //paymore
    $('.chek').on('click', function() {
        var big  = $(this).attr('index'),
            href = $(this).attr('href')

        if(big == 1) {
            var data = {
                bigOrder: $(this).attr('order')
            }
        }
        else {
            var data = {
                orderId: $(this).attr('order')
            }
        }
        $(this).attr('href', href + '/' + encodeURIComponent(JSON.stringify(data)))
    })
    $('.pay').on('click', function() {
        var href = $(this).attr('href'),
            prie = +($(this).parent().siblings('.all').find('.pr').text().substring(1)) * 100,
            data = {
                body: $(this).parents('.foot').siblings('.content').find('.txt').find('span').text(),
                out_trade_no: $(this).attr('big'),
                product_id: $(this).attr('big'),
                total_fee: prie
            }
        $(this).attr('href', href + '/' + encodeURIComponent(JSON.stringify(data)))
    })
    $('.war').on('click', function() {

    })
    updata()
    appeal()
})
// update function orders status

function updata() {
    $('.car').on('click', function() {
        if($(this).text() == '取消订单') {
            var data = {
                bigOrder  : $(this).attr('big'),
                orderState: '5'
            }
            $.get('/server/updateOrder/?data=' + encodeURIComponent(JSON.stringify(data)))
                .done(function(data) {
                    alert('取消成功!')
                    window.location.pathname = '/order'
                })
        }
        else {
            var data = {
                orderId  : $(this).attr('order'),
                orderState: '4'
            }
            if(confirm('点击确认收货后，钱将直接到卖家账户中，请务必收到货再确认!')) {
                $.get('/server/updateChildOrder/?data=' + encodeURIComponent(JSON.stringify(data)))
                    .done(function(data) {
                        window.location.pathname = '/order'
                    })
            }

        }
    })
}
//订单申诉
function appeal() {
    $('.shen').on('click', function() {
        var data = {
            smid    : $('.mk').attr('smid'),
            goid : $(this).attr('order')
        }
        if(confirm('进行订单申诉后，服务站将尽快和您取得联系，您也可以主动联系服务站：'+ $('.rtitle').attr('moblie') +'(服务站电话)。')) {
            $.get('/server/insertsExchange/?data=' + encodeURIComponent(JSON.stringify(data)))
                .done(function(data) {
                    if(data.code) {
                        window.location.pathname = '/order'
                    }
                })
        }
    })
}