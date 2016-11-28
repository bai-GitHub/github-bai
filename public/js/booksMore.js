/**
 * Created by fandimeng on 16/6/15.
 */

$(function(){
    //加载更多账本
    $(window).scroll(function(e) {
        var num = $('.btl').children('.pay').length
        if($(window).scrollTop() == $(document).height() - $(window).height()){
            $.ajax({
                type : 'get',
                url  : '/user/books',
                data : {
                    num: num
                },
                success:function(data){
                    var ms =  $('.btl').html()
                    $('.btl').html(ms + data)
                }
            })
        }
    });

})