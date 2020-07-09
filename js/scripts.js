//Matthew Schlanger
//NTT DATA INC
// 2/4/14

//-------------tab switcher-------------//
//switcher code is wrapped in enclosure and will auto execute
(function($) {
    $(function() {
        $('.section-tab').each(function(){
			$('>ul >li',this).each(function(){
				$(this).attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);
				$(this).click(function(event) {
	                $(this).addClass('active').siblings().removeClass('active');
					var daClassname = $(this).attr('class').split(' ')[0];
					var targetDivClassname = '.'+ daClassname.replace('tab', 'div');
					$(targetDivClassname).siblings().each(function(){
						if ( $(this).hasClass('active') ){
							$(this).fadeOut({duration:200, ease:'swing', complete: function(){
								$(targetDivClassname).fadeIn(200,'swing');
	               				 $(targetDivClassname).addClass('active').siblings().removeClass('active');
							}});
						};	
					});
	                //added to fix using switcher with carousels
	                $(targetDivClassname).find('div.slides-container').css('left',0);
	                event.preventDefault();
	           	});
			});
		});
    });
})(jQuery);

function initSecondaryNav(){
	$('.secondary-nav-tabs').each(function(){
		var maxTabsWidth = 890.0;
		var numberOfTabs = $('ul li', this).length;
		var aWidth = Math.floor(maxTabsWidth/numberOfTabs);
		var tabsWidth = aWidth*numberOfTabs;
		$('.secondary-nav-tabs').css('width',tabsWidth);
		$('.secondary-nav-tabs ul li a').css('width',aWidth);
		$('>ul >li >a',this).each(function(){
			var $theDiv = $('>div', this);
			var words = $theDiv.html().split(' ').length;
			//console.log('words',words);
			//console.log('height',$theDiv.height());
 			if(words === 2){
 				var html = $(this).html().split(" ");
				html = html[0] + "<br>" + html.slice(1).join(" ");
				$(this).html(html);
			}else if($theDiv.height() < 20){	
				if(words === 4){
					var html = $(this).html().split(" ");
					html = html[0] + ' ' + html[1] + "<br>" + html[2] + ' ' + html[3];
					$(this).html(html);
				}
				if(words === 3){
					var html = $(this).html().split(" ");
					var firstTwo = html[0] + ' ' + html[1];
					var secondTwo = html[1] + ' ' + html[2];
					if (firstTwo.length > secondTwo.length){
						html = html[0] + "<br>" + html.slice(1).join(" ");
					}else{
						html =  html[0] + ' ' + html[1] + "<br>" + html[2];
					}
					$(this).html(html);
				}
 			};
			$(this).attr('unselectable', 'on').css('user-select', 'none').on('selectstart', false);
			$(this).click(function(event) {
                $(this).addClass('active').parent().siblings().find('a').removeClass('active');
           	});
		});
	});
};

function collapseExpandFAQ(buttonClass,divClass){
	//$('.'+buttonClass).css('cursor','pointer');
	var slideRate = 200;
	$('.question').each(function(){
		var questionObj = this;
		$(buttonClass, this).on('click',function(event){
			if ($(divClass, questionObj).hasClass('open')){
				$(divClass, questionObj).removeClass('open').slideUp(slideRate);
				$(buttonClass, questionObj).css('background-position','0px 2px');
			}else{
				$(divClass, questionObj).addClass('open').slideDown(slideRate,'swing');	
				$(buttonClass, questionObj).css('background-position','0px -12px');	
			}
			event.preventDefault();
		});	
	});
	
}

function collapseExpand(buttonClass,divClass,sliderat,backoffestObj,openfunction,closefunction){
	"use strict";
	//$('.'+buttonClass).css('cursor','pointer');
	var slideRate = sliderat,
	backPosOffsetObj = backoffestObj,
	backPosOffset,
	backGroundClass;
	if (backPosOffsetObj === undefined){
		backPosOffset = 0;
	}else{
		backPosOffset = backPosOffsetObj.offset;
		backGroundClass = backPosOffsetObj.theClass;
	} 
	if ($('html').is('.ie6, .ie7, .ie8')) {
		var backgroundPos = [$(backGroundClass).css('backgroundPositionX'), $(backGroundClass).css('backgroundPositionY')];
	}else{
		var backgroundPos = $(backGroundClass).css('backgroundPosition').split(" ");
	}
	var yPos = parseInt(backgroundPos[1].replace("px",""));
	var xPos = backgroundPos[0];
	if (slideRate === undefined){slideRate = 250;}
	$(buttonClass).on('click',function(event){
		if ($(divClass).hasClass('open')){
			if (closefunction !== undefined){closefunction();}
			$(divClass).removeClass('open').stop().slideUp(slideRate);
			$(backGroundClass).css('background-position',xPos +' '+ (yPos) + 'px');
		}else{
			if (openfunction !== undefined){openfunction();}
			$(divClass).addClass('open').slideDown(slideRate,'swing');	
			$(backGroundClass).css('background-position',xPos+' '+(yPos + backPosOffset) + 'px');	
		}
		event.preventDefault();
	});
}

function initRegion(regionDataObj){
	var dataObj = regionDataObj;
	console.log('dataObj',dataObj);
	$('.na-region-select').on('change', function(){
		var thevalue = $(this).attr('value');
		$('.need-assistance-flag >img').attr("src",'assets/images/'+dataObj[thevalue]['icon-file']);
		$('.na-region-phonenum >span').html(dataObj[thevalue]['phone']);
		$('.na-region-email >span.email-text').html(dataObj[thevalue]['email']);
	});
}




