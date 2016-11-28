//listening addorder events
$(function() {
	addOreder()
	updateStatus()
})
//addOrder events
function addOreder() {
	$('.addshop').each(function() {
		$(this).on('click', function() {
			var href  = $(this).parent().siblings('a').attr('href'),
			    name  = href.substring(1).split('/'),
				arry  = [],
				data  = {
					smid    : name[2],
					gid     : name[1],
					goodsNum: '1'
				}
			arry.push(data)
			
			$.get('/server/addOrder/' + encodeURIComponent(JSON.stringify(arry)))
			.done(function(data){
				alert('添加成功！')
			})	
		})
	})	
}


//所有订单交易完成的状态 点击再次购买

function updateStatus() {
	var arry = []
	$('.agin').on('click', function() {
		$(this).parents('.foot').siblings('.content').each(function() {
			var  name  = $(this).attr('gid'),
				 smid  = $('.mk').attr('smid'),
				 data  = {
					smid    : smid,
					gid     : name,
					goodsNum: $(this).find('.cnum').text().substring(1)
				}
			arry.push(data)
		})
		$.get('/server/addOrder/' + encodeURIComponent(JSON.stringify(arry)))
				.done(function(data){
					if(data == 1) {
						window.location.pathname = '/user/purchase'
					}
				})
		arry = []
	})

}
