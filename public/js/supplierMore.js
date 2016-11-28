
$(function(){
    // 加载更多供应商商品
    var num=1;
    $(window).scroll(function(e) {
        var suid = $('.supplier').attr('data-suid')
        if($(window).scrollTop() == $(document).height() - $(window).height()){
            $.ajax({
                type : 'get',
                url  : '/supplierlist/' + suid + '/?num=' + num,
                success:function(data){
                  num++;
                  $('.list').find('ul').eq(0).append(data);
                }
            })
        }
    });

})