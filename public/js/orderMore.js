/**
 * Created by fandimeng on 16/6/15.
 */
$(function(){
    $(window).scroll(function(e) {
        var num = $('.orderSearchMsg .supplier').children('.content').length
        var orderState = $('#orderState').attr('value')
        if($(window).scrollTop() >= $(document).height() - $(window).height()){
            $.ajax({
                    type : 'GET',
                    url  : '/order?orderState=' + orderState ,
                    data : {
                        num: num
                    }
                })
                .then(function(data) {
                    var ms =  $('.orderSearchMsg').html()
                    $('.orderSearchMsg').html(ms + data)
                    if(data == ''){

                    }
                })
        }
    });

})