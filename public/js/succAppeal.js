/**
 * Created by fandimeng on 16/6/4.
 */
$(function(){
    $('#searchBtn').click(function(){
        var val =  $("#search").val()
        if($('#one').text() == '商品'){
            $.ajax({
                type: 'post',
                url : "/order/?name_commodity=" + val,
                data: {name_commodity: val}

            })
                .then(function(data) {
                    $('.orderSearchMsg').html(data);
                    console.log(data)
                })
        }else if($('#one').text() == '订单号'){
            $.ajax({
                type: 'post',
                url : "/order/?bigOrder=" + val,
                data: {bigOrder: val}

            })
                .then(function(data) {
                    $('.orderSearchMsg').html(data)
                })
        }

    })
})