/**
 * Created by fandimeng on 16/6/2.
 */
$(function(){
    $('.floor ul li p').click(function(e){
        e.stopPropagation()
        $(this).addClass('current').parent('li').siblings().children('p').removeClass('current')
        $(this).prev('span').css('background','#ff6600')
        $(this).parent('li').siblings().children('span').css('background','#f2f2f2')
    })
    $('#level1').click(function(){
        $.ajax({
            type: 'post',
            url : "/server/cation1",
            data: {
                level1:'1000000'
            },
            success: function(data){
                $('.sild').html(data)
            }
        })
    })
    $('#level2').click(function(){
        $.ajax({
            type: 'post',
            url : "/server/cation1",
            data: {
                level1:'2000000'
            },
            success: function(data){
               $('.sild').html(data)
            }
        })
    })
    $('#level3').click(function(){
        $.ajax({
            type: 'post',
            url : "/server/cation1",
            data: {
                level1:'3000000'
            },
            success: function(data){
                $('.sild').html(data)
            }
        })
    })
    $('#level4').click(function(){
        $.ajax({
            type: 'post',
            url : "/server/cation1",
            data: {
                level1:'4000000'
            },
            success: function(data){
                $('.sild').html(data)
            }
        })
    })
    $('#level5').click(function(){
        $.ajax({
            type: 'post',
            url : "/server/cation1",
            data: {
                level1:'5000000'
            },
            success: function(data){
                $('.sild').html(data)
            }
        })
    })
    $('#level6').click(function(){
        $.ajax({
            type: 'post',
            url : "/server/cation1",
            data: {
                level1:'6000000'
            },
            success: function(data){
                $('.sild').html(data)
            }
        })
    })
    $('#level7').click(function(){
        $.ajax({
            type: 'post',
            url : "/server/cation1",
            data: {
                level1:'7000000'
            },
            success: function(data){
                $('.sild').html(data)
            }
        })
    })
    $('#level8').click(function(){
        $.ajax({
            type: 'post',
            url : "/server/cation1",
            data: {
                level1:'8000000'
            },
            success: function(data){
                $('.sild').html(data)
            }
        })
    })
    $('#level9').click(function(){
        $.ajax({
            type: 'post',
            url : "/server/cation1",
            data: {
                level1:'9000000'
            },
            success: function(data){
                $('.sild').html(data)
            }
        })
    })
})
function levelSearch (obj){
    var val  = $(obj).children('li').text(),
        href = window.location.pathname,
        urll = $(obj).attr('href')
    $(obj).attr('href', urll+'/?levelName3=' + val + '&url=' + href)
}

function levelSearchEr (obj){
    var val  = $(obj).children(":first").text(),
        href = window.location.pathname,
        urll = $(obj).attr('href')
    $(obj).attr('href', urll+'/?levelName2=' + val + '&url=' + href)
}
