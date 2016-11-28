/**
 * Created by kxhl on 2016/6/2.
 */

$(function() {
    var pay = $('.sp').data().succ,
        form = {
            body            : pay.body,
            out_trade_no    : pay.out_trade_no,
            product_id      : pay.product_id,
            total_fee       : 100,
            spbill_create_ip: '202.106.0.20'
        }
    $.ajax({
        type       : 'POST',
        dataType   : 'json',
        contentType: 'application/json',
        url        : 'http://123.57.140.21:8080/project.pay.controller-0.0.1-SNAPSHOT/wechat/QRPay/unifiedOrder.rest',
        data       : JSON.stringify(form)

    })
        .then(function(data) {
            $('.mask').find('img').attr('src', data.code_url)

            setInterval(function() {
                return $.get('/server/findOrderByIds/?data=' + encodeURIComponent(pay.out_trade_no))
            }, 1000)
        })
        .then(function(data) {
            if(data == 1) {
                window.location.pathname = '/order'
            }
        })
})

