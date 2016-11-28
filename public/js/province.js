 $(function() {
	 //第一种四级省
	 $.ajax({
		 type    : 'post',
		 url     : '/server/addressQueryBackstage',
		 data    : null,
		 dataType: "json",
		 success : function (data) {
			 $('#province').html(null)
			 var mss    = JSON.parse(data),
			 	 models = eval(mss),
			 	 rows   = '<option>请选择</option>'
			 for (var i in models) {
				 rows = rows + '<option name = "province1" value = ' +  models[i].code + '>' +  models[i].name + '</option>'
			 }
			 $("#province").append(rows)
		 }
	 })
	 //第一种四级市
	 $("#province").change(function () {
		 var province = $('#province option:selected').val()
		 $.ajax({
			 type    : 'post',
			 url     : '/server/addresssQueryBackstageCity',
			 data    : {province : province},
			 dataType: "json",
			 success : function (data) {
				 $('#city').html(null)
				 var mss    = JSON.parse(data),
				 	 models = eval(mss),
					 rows   = '<option>请选择</option>'
				 for (var i in models) {
					 rows = rows + "<option name = 'city1' value = " + models[i].code + ">" + models[i].name + "</option>"
				 }
				 $("#city").append(rows)
			 }
		 })
	 })
	 //第一种四级区
	 $("#city").change(function () {
		 var city = $("#city option:selected").val()
		 $.ajax({
			 type    : 'post',
			 url     : '/server/addresssQueryBackstageCounty',
			 data    : {city : city},
			 dataType: "json",
			 success : function (data) {
				 $('#county').html(null)
				 var mss    = JSON.parse(data),
					 models = eval(mss),
				     rows   = '<option>请选择</option>'
				 for (var i in models) {
					 rows = rows + "<option name = 'county1' value = " + models[i].code + ">" + models[i].name + "</option>"
				 }
				 $("#county").append(rows)
			 }
		 })
	 })
	 //第一种四级街道
	 $("#county").change(function () {
		 var county = $("#county option:selected").val()
		 $.ajax({
			 type    : 'post',
			 url     : '/server/addresssQueryBackstageMarketArea',
			 data    : {county : county},
			 dataType: "json",
			 success : function (data) {
				 $('#marketArea').html(null)
				 var mss    = JSON.parse(data),
				 	 models = eval(mss),
					 rows   = '<option>请选择</option>'
				 for (var i in models) {
					 rows = rows + "<option name = 'marketArea' value = " + models[i].code + ">" + models[i].name + "</option>"
				 }
				 $("#marketArea").append(rows)
			 }
		 })
	 })







	 //第二种四级省
	 $.ajax({
		 type    : 'post',
		 url     : '/server/addressQueryBackstage',
		 data    : null,
		 dataType: "json",
		 success : function (data) {
			 $('#provinceTwo').html(null)
			 var mss    = JSON.parse(data),
			 	 models = eval(mss),
			 	 rows   = '<option>请选择</option>'
			 for (var i in models) {
				 rows = rows + '<option name = "province" value = ' +  models[i].code + '>' +  models[i].name + '</option>'
			 }
			 $("#provinceTwo").append(rows)
		 }
	 })
	 //第二种四级市
	 $("#provinceTwo").change(function () {
		 var province = $('#provinceTwo option:selected').val()
		 $.ajax({
			 type    : 'post',
			 url     : '/server/addresssQueryBackstageCity',
			 data    : {province : province },
			 dataType: "json",
			 success : function (data) {
				 $('#cityTwo').html(null)
				 var mss    = JSON.parse(data),
					 models = eval(mss),
				 	 rows   = '<option>请选择</option>'
				 for (var i in models) {
					 rows = rows + "<option name = 'city' value = " + models[i].code + ">" + models[i].name + "</option>"
				 }
				 $("#cityTwo").append(rows)
			 }
		 })
	 })
	 //第二种四级区
	 $("#cityTwo").change(function () {
		 var city = $("#cityTwo option:selected").val();
		 $.ajax({
			 type    : 'post',
			 url     : '/server/addresssQueryBackstageCounty',
			 data    :{city : city},
			 dataType: "json",
			 success : function (data) {
				 $('#countyTwo').html(null)
				 var mss    = JSON.parse(data),
				 	 models = eval(mss),
					 rows   = '<option>请选择</option>'
				 for (var i in models) {
					 rows = rows + "<option name = 'county' value = " + models[i].code + ">" + models[i].name + "</option>"
				 }
				 $("#countyTwo").append(rows)
			 }
		 })
	 })
	 //第二种四级街道
	 $("#countyTwo").change(function () {
		 var county = $("#countyTwo option:selected").val()
		 $.ajax({
			 type    : 'post',
			 url     : '/server/addresssQueryBackstageMarketArea',
			 data    : {county : county},
			 dataType: "json",
			 success : function (data) {
				 $('#marketAreTwo').html(null)
				 var mss    = JSON.parse(data),
				 	 models = eval(mss),
				     rows   = '<option>请选择</option>'
				 for (var i in models) {
					 rows = rows + "<option name = 'marketAreaTwo' value = " + models[i].code + ">" + models[i].name + "</option>"
				 }
				 $("#marketAreTwo").append(rows)
			 }
		 })
	 })

 })