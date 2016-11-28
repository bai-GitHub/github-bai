/**
 * Created by fandimeng on 16/6/15.
 */
$(function(){
    //加载更多商品
    var num=0
    $(window).scroll(function(e) {
        /*var num = $('.list').children('li').length
        var orderState = $('#orderState').attr('value')
        var index = 0*/
        if($(window).scrollTop() >= $(document).height() - $(window).height()){
            $.ajax({
                    type : 'GET',
                    url  : '/list',
                    data : {
                        num: num
                    },
                    success:function(data){
                        num++;
                        var ms=$('.list').find('ul').eq(0).after(data);
                    }
                })
        }
    });

})