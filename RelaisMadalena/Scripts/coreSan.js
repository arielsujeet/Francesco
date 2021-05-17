$(document).ready(function(){
/*$('.bxslider').bxSlider({
  mode: 'vertical',
  auto: true,
  pager: false

});
	*/
	
/*$('.bxslider1').bxSlider({
  mode: 'horizontal',
  useCSS: false,
  easing: 'easeOutElastic',
  auto: true,
  pager: false,
  slideWidth: 340,
  speed: 2000
});
	
	$('.bxslider2').bxSlider({
  mode: 'horizontal',
  useCSS: false,
  easing: 'easeOutElastic',
  auto: true,
  pager: false,
  slideWidth: 340,
  speed: 2000
});
	
$('.bxslider3').bxSlider({
  mode: 'horizontal',
	useCSS: false,
 pager: false,
	auto: true,
	slideWidth: 340,
  hideControlOnEnd: true,
  easing: 'easeOutElastic',
});*/
	
	
	
	
	
});

    $(document).ready(function () {
        /*var slider = $('.bxslider1').bxSlider({
            mode: 'horizontal',
	        useCSS: false,
            pager: false,
	        auto: true,
	        slideWidth: 340,
            hideControlOnEnd: true,
            easing: 'easeOutElastic',
        });

		
		 var slider = $('.bxslider2').bxSlider({
            mode: 'horizontal',
	        useCSS: false,
            pager: false,
	        auto: true,
	        slideWidth: 340,
            hideControlOnEnd: true,
            easing: 'easeOutElastic',
        });*/

       
		
	/*	 var slider = $('.bxslider3').bxSlider({
            mode: 'horizontal',
	        useCSS: false,
            pager: false,
	        auto: true,
	        slideWidth: 340,
            hideControlOnEnd: true,
            easing: 'easeOutElastic',
        });*/

       /* $(".bx-next, .bx-prev").click(function (e) {
			e.preventDefault();
            slider.stopAuto();
			console.log("clicked")
			
        });*/
		
		/*$('.bx-next, .bx-prev').hover(function(e){
			e.preventDefault();
        slider.stopAuto();   
       });
       $('.bx-next, .bx-prev').mouseleave(function(e){
		 e.preventDefault();
         slider.startAuto(); 
       });
	*/
		
		
        
});

    
(function(){ 

        slideSpeedAdjusted = false;
       
        var slider = $('.bxslider1').bxSlider({
          infiniteLoop: true,
			mode: 'horizontal',
	        useCSS: false,
            pager: false,
	        auto: true,
	        slideWidth: 340,
            hideControlOnEnd: true,
            easing: 'easeOutElastic',
          autoDelay:200,
          autoHover: true,
          speed: 2000
        });
		
	
        if(!slideSpeedAdjusted){
        $('.flavourSlider1 .bx-next').click(function(e){
         var current = slider.getCurrentSlide();
            e.preventDefault();
            slider.reloadSlider({
            startSlide: current,
            infiniteLoop: true,
            mode: 'horizontal',
	        useCSS: false,
            pager: false,
	        auto: false,
	        slideWidth: 340,
            hideControlOnEnd: true,
            easing: 'easeOutElastic',
			 });
            
            slideSpeedAdjusted = true;

            });

	
        $('flavourSlider1 .bx-prev').click(function(e){
            var current = slider.getCurrentSlide();
            e.preventDefault();
            slider.reloadSlider({
            startSlide: current,
            infiniteLoop: true,
            mode: 'horizontal',
	        useCSS: false,
            pager: false,
	        auto: false,
	        slideWidth: 340,
            hideControlOnEnd: true,
            easing: 'easeOutElastic',
				
            });
            slideSpeedAdjusted = true;
            });
        };


})();

(function(){ 

        slideSpeedAdjusted = false;
       
        var slider = $('.bxslider2').bxSlider({
          infiniteLoop: true,
			mode: 'horizontal',
	        useCSS: false,
            pager: false,
	        auto: true,
	        slideWidth: 340,
            hideControlOnEnd: true,
            easing: 'easeOutElastic',
          autoDelay:300,
          autoHover: true,
          speed: 2000
        });
		
	
        if(!slideSpeedAdjusted){
        $('.flavourSlider2 .bx-next').click(function(e){
         var current = slider.getCurrentSlide();
            e.preventDefault();
            slider.reloadSlider({
            startSlide: current,
            infiniteLoop: true,
            mode: 'horizontal',
	        useCSS: false,
            pager: false,
	        auto: false,
	        slideWidth: 340,
            hideControlOnEnd: true,
            easing: 'easeOutElastic',
			 });
            
            slideSpeedAdjusted = true;
            });

        $('.flavourSlider2 .bx-prev').click(function(e){
            var current = slider.getCurrentSlide();
            e.preventDefault();
            slider.reloadSlider({
            startSlide: current,
            infiniteLoop: true,
            mode: 'horizontal',
	        useCSS: false,
            pager: false,
	        auto: false,
	        slideWidth: 340,
            hideControlOnEnd: true,
            easing: 'easeOutElastic',
				
            });
            slideSpeedAdjusted = true;
            });
        };


})();

(function(){ 

        slideSpeedAdjusted = false;
       
        var slider = $('.bxslider3').bxSlider({
          infiniteLoop: true,
			mode: 'horizontal',
	        useCSS: false,
            pager: false,
	        auto: true,
	        slideWidth: 340,
            hideControlOnEnd: true,
            easing: 'easeOutElastic',
          autoDelay:400,
			autoHover:true,
          speed: 2000
        });
		
	
        if(!slideSpeedAdjusted){
        $('.flavourSlider3 .bx-next').click(function(e){
         var current = slider.getCurrentSlide();
            e.preventDefault();
            slider.reloadSlider({
            startSlide: current,
            infiniteLoop: true,
            mode: 'horizontal',
	        useCSS: false,
            pager: false,
	        auto: false,
	        slideWidth: 340,
            hideControlOnEnd: true,
            easing: 'easeOutElastic',
			 });
            
            slideSpeedAdjusted = true;
            });

        $('.flavourSlider3 .bx-prev').click(function(e){
            var current = slider.getCurrentSlide();
            e.preventDefault();
            slider.reloadSlider({
            startSlide: current,
            infiniteLoop: true,
            mode: 'horizontal',
	        useCSS: false,
            pager: false,
	        auto: false,
	        slideWidth: 340,
            hideControlOnEnd: true,
            easing: 'easeOutElastic',
				
            });
            slideSpeedAdjusted = true;
            });
        };


})();

/*$(document).click('.bx-next, .bx-prev',function(slider) {
    slider.stopAuto();
    slider.startAuto();
});*/


$(document).ready(function() {
  $('.flavourGallery').flexslider({
	  animation: "slide",
	  direction: "horizontal",
	   easing: 'swing',
	 directionNav: true,
	  slideshowSpeed: 2500,
  	controlNav: false
  });
});

/*
	$('.flexsliderVertical2').flexslider({
    animation: "slide",
	directionNav: true,
	direction: "vertical",
  	controlNav: false,
	slideshowSpeed: 2500  });
		
		 $('.flexsliderVertical3').flexslider({
    animation: "slide",
	directionNav: true,
	direction: "vertical",
  	controlNav: false,
	slideshowSpeed: 3000
   
  });
	*/

	$(document).ready(function() {
      $('.flexsliderVertical1').flexslider({
        animation: "slow",
        slideshowSpeed: 2000,
        controlNav: false,
        directionNav: false,
        pauseOnAction: false,
        pauseOnHover: false, 
		  animationLoop: true,    
		direction: "vertical",
        after: function(slider){
		$(slider).each(function( index ) {
        clearInterval(slider.animatedSlides);
		slider.animatedSlides = setTimeout(slider.animateSlides,3500)
         });
			
          },
        start: function(slider){
          $('body').removeClass('loading');
        }
      }); 
    
		
		 $('.flexsliderVertical2').flexslider({
        animation: "slide",
        slideshowSpeed: 2500,
        controlNav: false,
        directionNav: false,
        pauseOnAction: false,
        pauseOnHover: false, 
			 animationLoop: true,    
		  direction: "vertical",
        after: function(slider){
		$(slider).each(function( index ) {
        clearInterval(slider.animatedSlides);
		slider.animatedSlides = setTimeout(slider.animateSlides,3500)
         });
        },
        start: function(slider){
          $('body').removeClass('loading');
        }
      }); 
		
		 $('.flexsliderVertical3').flexslider({
        animation: "slide",
        slideshowSpeed: 3000,
        controlNav: false,
        directionNav: false,
        pauseOnAction: false,
        pauseOnHover: false, 
			 animationLoop: true,    
		  direction: "vertical",
        after: function(slider){
        $(slider).each(function( index ) {
        clearInterval(slider.animatedSlides);
		slider.animatedSlides = setTimeout(slider.animateSlides,3500)
         });
        },
        start: function(slider){
          $('body').removeClass('loading');
        }
      }); 
	
});
	