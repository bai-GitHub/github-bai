
$(function(){
    // 加载更多供应商商品
    var num = 1;
    var levelName1=decodeURI(window.location.search.split('=')[1].split('&')[0]);
    $(window).scroll(function(e) {
        if($(window).scrollTop() == $(document).height() - $(window).height()){
            $.ajax({
                type : 'post',
                url  : '/server/logoMore',
                data : {
                    num : num,
                    levelName1 : levelName1
                },
                success:function(data){
                    num++;
                    $('.list').find('ul').eq(0).append(data);
                }
            })
        }
    });

})