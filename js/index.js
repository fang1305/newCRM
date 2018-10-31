$(document).ready(function(){
	$('.menu_left li').mouseenter(function(){
		$(this).find('.nav_down').fadeIn(300)
	})
	$('.menu_left li').mouseleave(function(){
		$(this).find('.nav_down').hide()
	})
//	导航
/*	$('.list .btn_part').hover(function(){
		change($(this),$('.list').find('.btn_part'),'active')
	});
	$('.banner,.nav_choose li').hover(function(){
		$('.nav_down').hide()
		$(this).find('.nav_down').show()
	})
	$('.down_li').click(function(){
		$('.nav_down').hide()
	})
	
	$('.know_intro').hover(function(){
		change($(this),$('.know_intro'),'active')
	})
	
	$('.news_list').hover(function(){
		change($(this),$('.news_list'),'active')
	})
	
	$("#myCarousel").carousel({  
        interval :2000,  
   	});
   	$("#myCarousel0").carousel({  
        interval :2000,  
   	});*/
   	
/*//	 返回顶部
   	$(window).bind("scroll",function() {  
	    if ($(document).scrollTop()> 500) {  
	      $('.part_right').fadeIn()
	    }else{
	      $('.part_right').hide()
	    }
	})  
	$(window).bind("scroll",function() {  
	    if ($(document).scrollTop()> 500) {  
	      $('.part_right').show()
	    }
	})  
   	$('.to_top').click(function(){
   		$("html,body").animate({scrollTop:0}, 500);
   	})*/
})
function change(e,all,cl){
	all.removeClass(cl)
	e.addClass(cl)
}