/**
 * Created by fandimeng on 16/5/25.
 */
$(function(){
    $('#modify').click(function(){
        $('#consignee').attr({'disabled' : false}).css({"border":"1px solid #d9d9d9","background-color":"#fff"})
        $('#phone').attr({'disabled' : false} ).css({"border":"1px solid #d9d9d9","background-color":"#fff"})
        $(this).hide()
        $('#over').show()
    })
    $('#over').click(function(){
        if($('#phone').val().length < 7){
            alert("请输入正确的联系方式")
        }else if($('#consignee').val() == ''){
            alert('请输入收货人姓名')
        }else{
            $('#information').submit()
        }
    })
})