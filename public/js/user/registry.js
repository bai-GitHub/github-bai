/**
 * Created by fandimeng on 16/5/16.
 */

$(function() {
    //监控select的值
    $("#province").change(function(){
        var provinceText = $('#province option:selected').text()
        $('#province').prev('input').val(provinceText)
    })
    $("#city").change(function(){
        var cityText = $('#city option:selected').text()
        $('#city').prev('input').val(cityText)
    })
    $("#county").change(function(){
        var countyText = $('#county option:selected').text()
        $('#county').prev('input').val(countyText)
    })
    $("#marketArea").change(function(){
        var marketAreaText = $('#marketArea option:selected').text()
        $('#marketArea').prev('input').val(marketAreaText)
    })

    $("#provinceTwo").change(function(){
        var provinceText = $('#provinceTwo option:selected').text()
        $('#provinceTwo').prev('input').val(provinceText)
    })
    $("#cityTwo").change(function(){
        var cityText = $('#cityTwo option:selected').text()
        $('#cityTwo').prev('input').val(cityText)
    })
    $("#countyTwo").change(function(){
        var countyText = $('#countyTwo option:selected').text()
        $('#countyTwo').prev('input').val(countyText)
    })
    $("#marketAreTwo").change(function(){
        var marketAreaText = $('#marketAreTwo option:selected').text()
        $('#marketAreTwo').prev('input').val(marketAreaText)
    })

    //验证用户名是否存在
    $('#username').blur(function () {
        $.ajax({
            type: "post",
            url: "/server/supermarketIsRegister",
            dataType: "json",
            data: {
                username: function () {
                    return $("#username").val()
                }
            },
            success: function (data) {
                var mss = JSON.parse(data)
                if (mss.flag == false) {
                    alert('用户名已被注册')
                    $('#next').attr({"disabled": true})
                    $('#next').css("background-color","#cccccc")
                }else{
                    $('#next').attr({"disabled": false})
                    $('#next').css("background-color","#ffa200")
                }
            }

        })
    })
    // 验证手机发送验证码
    $('#yan').click(function() {
        var num = $("#mobile").val()
        var phone = document.getElementById('mobile').value
        if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone))){
            alert("手机号码有误，请重填")
            return false
        }else {
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
                        $.ajax({
                            type: 'post',
                            url: "/server/getCode",
                            dataType: "json",
                            data: {mobile: num},
                            success: function (code) {
                                var mgg = JSON.parse(code);
                                if (mgg.flag == true) {
                                    time()
                                    alert("验证码发送成功")
                                } else {
                                    alert("验证码发送失败")
                                }
                            }
                        })

                    }
                }
            })
        }
    })
    //验证验证码
    $('#code').bind('input propertychange', function() {
        if($(this).val().length == 6){
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
                        $('#next').attr({"disabled": true})
                        $('#next').css("background-color","#cccccc")
                    } else {
                        $('#next').attr({"disabled": false})
                        $('#next').css("background-color","#ffa200")
                    }
                }
            })
        }
    })
    //验证业务员
    $('#salesman').bind('input propertychange', function() {
        var salesman = $('#salesman').val()
        if(salesman.length > 1) {
            $.ajax({
                type: 'post',
                url: "/server/salesmansQuery",
                dataType: "json",
                data: {salesman:salesman},
                cache: false,
                success: function (data) {
                    var ms = JSON.parse(data)
                    var mss = eval(ms)
                    if(mss.length == 0){
                        $('.errorS input').val('没有查到该业务员')
                    }else{
                        $('#sid').val(mss[0].sid)
                        $('.errorS input').val('')
                    }
                }

            })
        }else{
            $('.errorS input').val('')
        }
    })

    //++++++忘记密码

    // 忘记密码验证手机发送验证码
    $('#forgotYan').click(function() {
        var num = $("#mobile").val()
        var phone = document.getElementById('mobile').value
        if(!(/^1[3|4|5|7|8]\d{9}$/.test(phone))){
            alert("手机号码有误，请重填")
            return false
        }else {
            timeTwo()
            $.ajax({
                type: 'post',
                url: "/server/supermarketIsRegister",
                dataType: "json",
                data: {mobile: num},
                success: function (data) {
                    var mss = JSON.parse(data)
                    if (mss.errorCode == "000000") {
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
                    } else {
                        alert('手机号不存在')
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
//60秒后可重新发送验证码
var wait = 60;
function timeTwo(){
    if (wait===0) {
        $('#forgotYan').css("background","#ffa200")
        $('#forgotYan').attr("disabled",false)
        $('#forgotYan').val("获取验证码")
        wait = 60;

    }else{
        $('#forgotYan').css("background","#cccccc")
        $('#forgotYan').attr("disabled",true)
        $('#forgotYan').val(wait + "秒后重试")
        wait--;
        setTimeout(function(){
            time()
        },1000)
    }
}

//注册1 验证
function nextt(){
    if($('#username').val() == ''){
        alert('请输入用户名')
        return false
    }else if($('#username').val().length < 4){
        alert('请输入4-20位用户名')
        return false
    }else if($('#username').val().length > 20){
        alert('请输入4-20位用户名')
        return false
    }else if($('#loginPassword').val() == ''){
        alert('请输入密码')
        return false
    }else if($('#loginPassword').val().length < 8){
        alert('请输入8-20位密码')
        return false
    }else if($('#loginPassword').val().length > 20){
        alert('请输入8-20位密码')
        return false
    }else if($('#upassword').val() != $('#loginPassword').val()){
        alert('两次密码输入不一致')
        return false
    }else if($('#mobile').val() == ''){
        alert('请输入手机号')
        return false
    }else if($('#mobile').val().length < 11){
        alert('请输入正确的手机号')
        return false
    }else if($('#mobile').val().length > 11){
        alert('请输入正确的手机号')
        return false
    }else if($('#code').val() == ''){
        alert('请输入验证码')
        return false
    }else if($('#code').val().length < 6){
        alert('请输入正确的验证码')
        return false
    }else if($('#code').val().length > 6){
        alert('请输入正确的验证码')
        return false
    }
}
//注册2验证
function overr(){
    var num = $("#phone").val()
    if($('#supermarketName').val() == ''){
        alert('请输入超市名称')
        return false
    }else if($('#supermarketName').val().length < 4){
        alert('请输入4-20位超市名称')
        return false
    }else if($('#supermarketName').val().length > 20){
        alert('请输入4-20位超市名称')
        return false
    }else if($('#county').val() == null){
        alert('请选择收货地址')
        return false
    }else if($('#consignee').val() == ''){
        alert('请输入收货人姓名')
        return false
    }else if($('#consignee').val().length < 2){
        alert('请输入正确的收货人姓名')
        return false
    }else if($('#consignee').val().length > 20){
        alert('请输入正确的收货人姓名')
        return false
    }else if($('#phone').val() == ''){
        alert('请输入收货人联系方式')
        return false
    }else if($('#phone').val().length < 11){
        alert('请输入正确的手机号')
        return false
    }else if($('#phone').val().length > 11){
        alert('请输入正确的手机号')
        return false
    } else if(!(/^1[3|4|5|7|8]\d{9}$/.test(num))){
        alert("请输入正确的手机号");
        return false;
    }else if($('.errorS input').val() != ''){
        alert("请输入正确的业务员");
        return false
    }
}
// 忘记密码验证
function forgotNext(){
    if($('#mobile').val() == ''){
        alert('请输入手机号')
        return false
    }else if($('#mobile').val().length < 11){
        alert('请输入正确的手机号')
        return false
    }else if($('#mobile').val().length > 11){
        alert('请输入正确的手机号')
        return false
    }else if($('#code').val() == ''){
        alert('请输入验证码')
        return false
    }else if($('#code').val().length < 6){
        alert('请输入正确的验证码')
        return false
    }else if($('#code').val().length < 6){
        alert('请输入正确验证码')
        return false
    }

}
// 忘记密码2验证
function forgotOvern(){
    if($('#loginPassword').val() == ''){
        alert('请输入密码')
        return false
    }else if($('#loginPassword').val().length < 8){
        alert('请输入8-20位密码')
        return false
    }else if($('#loginPassword').val().length > 20){
        alert('请输入8-20位密码')
        return false
    }else if($('#upassword').val() != $('#loginPassword').val()){
        alert('两次密码输入不一致')
        return false
    }
}