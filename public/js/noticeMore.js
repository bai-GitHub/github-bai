/**
 * Created by fandimeng on 16/6/15.
 */

$(function(){
    //加载更多公告
    $(window).scroll(function(e) {
        var num = $('.noticee').children('.content').length
        if($(window).scrollTop() == $(document).height() - $(window).height()){
            $.ajax({
                    type : 'get',
                    url  : '/notice',
                    data : {
                        num: num
                    },
                    success:function(data){
                        var ms =  $('.noticee').html()
                        $('.noticee').html(ms + data)
                    }
                })
        }
    });

})