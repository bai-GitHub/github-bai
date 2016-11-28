//all checked orderStatus
$(function() {
    $.ajaxPrefilter(function(options) {
        options.async = true
    })
    $('.status').on('click', function() {
        var index = $(this).attr('order')
        if(index == 1) {
            $('.mk').css('display', 'block')
            $(this).attr('order', 2)
        }
        if(index == 2) {
            $('.mk').css('display', 'none')
            $(this).attr('order', 1)
        }
    })
    var href = window.location.href
    if(href.split('=')[href.split('=').length - 1] == 2) {
        $('.status').find('em').text('待发货')
    }
    else if(href.split('=')[href.split('=').length - 1] == 1) {
        $('.status').find('em').text('待付款')
    }
    else if(href.split('=')[href.split('=').length - 1] == 3) {
        $('.status').find('em').text('已发货')
    }

    //click find p element
    $('.mk').find('p').on('click', function() {
        $('.status').html($(this).text() + '<i><img src="/img/xia.png" width="10" height="10"></i>')
        var orderStatus = $(this).attr('orderStatus'),
            smid        = $('.mk').attr('smid'),
            currentPage = '0',
            data        = {
                orderState : orderStatus,
                smid       : smid,
                currentPage: currentPage
            }
        $('#orderState').attr('value',orderStatus)
        $.get('/server/orderStatus/?data=' + encodeURIComponent(JSON.stringify(data)))
            .done(function(data) {
                $('.orderSearchMsg').html(data)
            })
        $('.mk').css('display', 'none')
        $('.status').attr('order', 1)
    })



    finalPay()

})


//finaly pay mony
function finalPay() {
    $('.payall').on('click', function() {
        var href = $(this).attr('href'),
            prie = +($('.allpr').text().substring(1)) * 100,
            data = {
                body: $('.txt').find('span').text(),
                out_trade_no: $(this).attr('big'),
                product_id: $(this).attr('big'),
                total_fee: prie
            }
        $(this).attr('href', href + '/' + encodeURIComponent(JSON.stringify(data)))
    })
}