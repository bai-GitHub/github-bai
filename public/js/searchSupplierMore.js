suppliergoodsQuery/**
 * Created by fandimeng on 16/6/15.
 */
$(function(){
    //加载更多供应商
    $(window).scroll(function(e) {
        var searchSupplierNum = $('.allSupplier ul').children('a').length
        if($(window).scrollTop() == $(document).height() - $(window).height()){
            $.ajax({
                    type : 'POST',
                    url  : '/list?searchSupplierNum=' + searchSupplierNum ,
                    data : {
                        searchSupplierNum: searchSupplierNum
                    }
                })
                .then(function(data) {
                    var ms =  $('.allSupplier ul').html()
                    $('.allSupplier ul').html(ms + data)
                })
        }
    });

})