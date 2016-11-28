/**
 * Created by fandimeng on 16/5/25.
 */
$(function() {
    $('#password').bind('input propertychange', function () {
        if($(this).val().length > 5){
            $.ajax({
                type: 'post',
                url: "/server/findLoginPassword",
                dataType: "json",
                data: {
                    loginPassword: function () {
                        return $("#password").val()
                    },
                    smid:function(){
                        return $("#smid").val()
                    }
                },
                success: function (data) {
                    var mss = JSON.parse(data)
                    if (mss.errorCode == "060002"){
                        $('#yan').val('2')
                    } else {
                        $('#yan').val('1')
                    }
                }
            })
        }
    })
})
function newPassword (){
    if($('#password').val() == ''){
        alert('请输入原密码')
        return false
    }else if($('#yan').val() == ''){
        alert('请输入正确的原密码')
        return false
    }else if($('#yan').val() == '2'){
        alert('请输入正确的原密码')
        return false
    }else if($('#newpassword').val() == ''){
        alert('请输入新密码')
        return false
    }else if($('#newpassword').val().length < 8){
        alert('请输入8-20位新密码')
        return false
    }else if($('#newpassword').val().length > 20){
        alert('请输入8-20位新密码')
        return false
    }else if($('#unewpassword').val() != $('#newpassword').val()){
        alert('两次新密码输入不一致')
        return false
    }else{
        $('#signupForm').submit()
    }
}