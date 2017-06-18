$(function(){
	// 首页4栏切换
	//首先选项卡初始化显示页面 0，1，2，3
	var pageIndex = parseInt(window.location.href.substr(-1,1));
	pageIndex = typeof(pageIndex)!="number"||pageIndex>3?0:pageIndex;
	new TouchSlide({
		slideCell:"#touchSlide",
		titCell:".tab_li li",
		mainCell:".tab_container",
		titOnClassName:"current",
		defaultIndex:pageIndex,
		startFun:function(i,c){
            switch(i){
                case 0:
                    $(".banner").show();
                    document.title = '热销榜';
                    break;
                case 1:
                    $(".banner").hide();
                    document.title = '积分兑换';
                    break;
                case 2:
                    $(".banner").hide();
                    document.title = '新品首发';
                    break;
                case 3:
                    $(".banner").hide();
                    document.title = '品牌街';
                    break;
            }
		}
	});

	// 首页四块内容切换
	new TouchSlide({ 
		slideCell:"#banner",
		titCell:".banner_hd", //开启自动分页 autoPage:true ，此时设置 titCell 为导航元素包裹层
		mainCell:".banner_bd", 
		effect:"left", 
		autoPlay:true,//自动播放
		autoPage:true, //自动分页
		switchLoad:"_src" //切换加载，真实图片路径为"_src" 
	});
	//阻止冒泡
	$(".banner_bd").on("touchmove",function(e){
		// return false;
		e.stopPropagation();
	});
	//fix index-hotSales banner style [touchslide]
	$("#banner").width(window.innerWidth-6+"px");
	(function(){
		var evt = "onorientationchange" in window ? "orientationchange" : "resize";
		window.addEventListener(evt, function() {
			$("#banner").width(window.innerWidth-6+"px");
		}, false);
	})();
	//首页列表加载
	if(window.hotSalesTemp){
		ajaxRenderTemplate($(".caizhuang"),hotSalesTemp,"activity05");
	}
	//首页 分类列表选项卡初始化
	new Tab({
		hd:$('.tab_hd li'),
		bd:$('.tab_bd ul'),
		switchEnd:function(index){
			if(this.bd.eq(index).html()!=""){
				return;
			}else{
				ajaxRenderTemplate(this.bd.eq(index),hotSalesTemp,"activity0"+(5+index));
			}
		}
	});
	// 列表页收藏商品按钮
	$('.addFavor').on("tap",function(){
		var $_this = $(this);
		//添加收藏
		if($(this).data("flag") && $(this).data("flag")=="addFavor"){
			$.ajax({
				type:'GET',
				url:"/ajax/addFavor/"+$_this.data("uuid"),
				dataType:'json',
				timeout:10000,
				success:function(res){
					if(res.success){
//						$_this.data("flag","rmFavor");
                        $_this.attr("data-flag","rmFavor");
						Utils.showAlert("添加收藏成功");
					}else{
                        Utils.showAlert("收藏失败,请重试");
					}
				}
			});			
		}
		// 取消收藏
		else{
			$.ajax({
				type:'GET',
				url:"/ajax/delFavor/"+$_this.data("uuid"),
				dataType:'json',
				timeout:10000,
				success:function(res){
					if(res.success){
//						$_this.data("flag","addFavor");
                        $_this.attr("data-flag","addFavor");
						console.log(res);
                        Utils.showAlert("取消收藏成功");
					}else{
                        Utils.showAlert("取消失败,请重试");
					}
				}
			});				
		}
		return false;
	});

    $('#search_btn').on('tap', function(){
        var searchStr = $("#search_input").val().trim();
        if(searchStr){
            window.location.href = '/search/' + searchStr;
        }else{
            Utils.showAlert('输入不能为空');
        }
    });
});

/**
 * [ajaxRenderTemplate description] ajax加载数据渲染局部视图
 * @param  {[type]} $wrap       [渲染内容容器]
 * @param  {[type]} templateStr [art 模板片段]
 * @param  {[type]} scat_uuid   [activity05/6/7/8]
 * @return {[type]}             [undefined]
 */
function ajaxRenderTemplate($wrap,templateStr,scat_uuid){
	// console.log(scat_uuid);
	$.ajax({
		type:"GET",
		url:"/ajax/getHotSales/"+scat_uuid,
        dataType: 'json',
        timeout: 10000,
        success:function(res){
			var render = template.compile(templateStr);
			var html = render(res);
			$wrap.html(html);	
        }		
	});			
}
