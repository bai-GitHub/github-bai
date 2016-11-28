/**
 * Created by fandimeng on 16/6/2.
 */
$(function(){
    //选择搜索商品或者是供应商
    $('.search input').css('textIndent', $('.mospce').width() + 10)
    $('#one').click(function(){
        $('.search ul').toggle(200)
    })
    $('.search ul li').click(function(){
        $('#one').text($(this).text())
        $('.search ul').hide()
        $('.search input').css('textIndent', $('.mospce').width() + 10)
    })
    //分类过来搜索
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
                    $('.list').find('ul').html(data)
                    $('.list').find('.aurl').attr('href', $('.list').find('.aurl').attr('href') + '/?url=' + window.location.href)
                    $('.keyword').hide()
                    $('.bar').css({'display': 'block'});
                })

        }else if($('#one').text() == '供应商'){
            $('.list ul').html('')
            val = $('#search').val()
            $.ajax({
                type : 'GET',
                url  : '/list?searchSupplier=' + val
            })
                .then(function(data) {
                    $('.allSupplier').find('ul').html(data)
                    for(var i = 0; i< data.length; i++) {
                        $('.allSupplier').find('.url').eq(i).attr('href', $('.allSupplier').find('.url').eq(i).attr('href') + '/?url=' + window.location.href)
                    }
                    $('.keyword').hide()
                })
        }
    })





    /*var _li = $('.list').find('li')
    for(var i = 0; i < _li.length; i++) {
        var _href = _li.eq(i).find('a').attr('href')
        _li.eq(i).find('a').attr('href', _href + '/?url=' + window.location.href)
    }*/






//品牌下搜索
   /* $('.bidSearch').on('click',function(){
        $('.list').find('ul').html('')
        var val = $('#search').val()
        var bid = $('.back').attr('data')
        var suid=$
        $.ajax({
            type : 'POST',
            url  : '/server/bidSearch',
            data:{
                goodsName : val,
                bid : bid,
                suid : suid
            },
            success:function(data){
                $('.list').find('.ulTwo').html(data)
               
            }
        })
    })
*/


$('.bidSearch').on('click', function() {
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
                    
                    $('.list').html(data)
                    $('.list').find('.aurl').attr('href', $('.list').find('.aurl').attr('href') + '/?url=' + window.location.href)
                    $('.keyword').hide()
                    $('.bar').css({'display': 'block'})
                })

        }else if($('#one').text() == '供应商'){
            $('.list ul').html('')
            val = $('#search').val()
            $.ajax({
                type : 'GET',
                url  : '/list?searchSupplier=' + val
            })
                .then(function(data) {
                    $('.allSupplier').find('ul').html(data)
                    for(var i = 0; i< data.length; i++) {
                        $('.allSupplier').find('.url').eq(i).attr('href', $('.allSupplier').find('.url').eq(i).attr('href') + '/?url=' + window.location.href)
                    }
                    $('.keyword').hide()
                })
        }
    })





















    $('.inOrder').on('click', function() {
        if($('#one').text() == '商品') {
            var _val = $('#search').val(),
                _smid = $(this).attr('smid'),
                _cur = '0',
                form = {
                    smid: _smid,
                    currentPage: _cur,
                    name_commodity: _val
                }

            $.ajax({
                    url: '/server/searchOrder',
                    type: 'POST',
                    data: {
                        obj: form
                    }
                })
                .done(function (data) { 
                    $('.orderSearchMsg').html(data)
                })
        }else if($('#one').text() == '订单号') {
            var _val  = $('#search').val(),
                _smid = $(this).attr('smid'),
                _cur = '0',
                form = {
                    smid: _smid,
                    currentPage: _cur,
                    orderId: _val
                }
               
            $.ajax({
                    url: '/server/searchOrder',
                    type: 'POST',
                    data: {
                        obj: form
                    }
                })

                .done(function (data) {
                    $('.orderSearchMsg').html(data);
                    console.log(data)
                })
        }
    })
})