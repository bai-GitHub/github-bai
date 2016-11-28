/**
 * Created by fandimeng on 16/5/24.
 */
$(function() {
    // 验证手机发送验证码
    $('#yan').click(function () {
        var num = $("#mobile").val()
        time()
        $.ajax({
            type: 'post',
            url: "/server/getCode",
            dataType: "json",
            data: {mobile: num},
            success: function (code) {
                var mgg = JSON.parse(code)
                if (mgg.flag == true) {
                    alert("验证码发送成功")
                } else {
                    alert("验证码发送失败")
                }
            }
        })
    })
    //验证验证码
    $('#code').bind('input propertychange', function () {
        if ($(this).val().length == 6) {
            $.ajax({
                type: 'post',
                url: "/server/FindCodeIsExits",
                dataType: "json",
                data: {
                    mobile: function () {
                        return $("#mobile").val()
                    },
                    code: function () {
                        return $("#code").val()
                    }
                },
                success: function (data) {
                    var mss = JSON.parse(data)
                    if (mss.flag == false) {
                        alert('请输入正确的验证码')
                        $('#zheng').val('2')
                    } else {
                        $('#zheng').val('1')
                    }
                }
            })
        }
    })
    //下一步
    $('.btn').click(function () {
        if ($('#zheng').val() == 2) {
            alert('请输入正确的验证码')
        } else if ($('#code').val() == '') {
            alert('请输入验证码')
        } else if ($('#zheng').val() == '') {
            alert('请输入验证码')
        } else {
            window.location = '/user/newphone'
        }
    })
    //完成修改

    $('#btn').click(function () {
        var num = $("#mobile").val()
        var phone = document.getElementById('mobile').value
        if (!(/^1[3|4|5|7|8]\d{9}$/.test(phone))) {
            alert("手机号码有误，请重填")
            return false
        } else {
            $.ajax({
                type: 'post',
                url: "/server/supermarketIsRegister",
                dataType: "json",
                data: {mobile: num},
                success: function (data) {
                    var mss = JSON.parse(data)
                    if (mss.errorCode == "000000") {
                        alert('手机号已被注册')
                    } else {
                        $('#signupForm').submit()
                    }
                }
            })
        }
    })

})
//60秒后可重新发送验证码
var wait = 60;
function time(){
    if (wait===0) {
        $('#yan').css("background","#ffa200")
        $('#yan').attr("disabled",false)
        $('#yan').val("获取验证码")
        wait = 60;

    }else{
        $('#yan').css("background","#cccccc")
        $('#yan').attr("disabled",true)
        $('#yan').val(wait + "秒后重试")
        wait--;
        setTimeout(function(){
            time()
        },1000)
    }
}
