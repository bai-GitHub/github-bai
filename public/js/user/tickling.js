/**
 * Created by fandimeng on 16/6/1.
 */
$(function(){
    $('.area textarea').bind('input propertychange', function() {
        var num = $('.area textarea').val().length
        $('.area .o').text(num)
    });
    $('.submit').click(function(){
        if($('textarea').val() >= 201){
            alert('请输入小于200个字符')
        }else if($('textarea').val() == ''){
           alert('请输入您的意见')
        }else{
            $('#signupForm').submit()
        }
    })
    change()
})
//change home phone and name
function change() {
    $('.edit').on('click', function() {
       var txt  = $(this).text(),
           form = {}
       if(txt == '编辑') {
            $('#consignee,#phone').attr('disabled', false)
            $('#consignee,#phone').css({'background': '#fff', 'padding': '5px 0', 'textIndent': '.3em'})
            $(this).text('完成')
       }
       if(txt == '完成') {
            form = {
                smid: $('.basicmation').attr('smid'),
                consignee: $('#consignee').val(),
                phone: $('#phone').val()
            }
            $('#consignee,#phone').attr('disabled', true)
            $('#consignee,#phone').css({'background': 'transparent', 'textIndent': '0'})
            $.get('/server/modifyInfo/?data=' + encodeURIComponent(JSON.stringify(form)))
            .done(function(data) {
                if(data == '1') {
                    $('.edit').text('编辑')
                }
            })
       }
    })
}