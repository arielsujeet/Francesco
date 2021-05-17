          
$(window).load(function() {
  $('.propertySlider').flexslider({
    animation: "slide",
    animationLoop: true,
	 directionNav: false,	
  	controlNav: false
  });
});

$(document).ready(function() {
  $('#spotlightPictureGallery').flexslider({
    animation: "slide",
	 directionNav: true,
  	controlNav: false
  });
});



$(function() {	

                var opts = {
                    defaultDate: "+1w",
                    showWeek: true,
                    firstDay: 1,
                    changeMonth: true,
                    numberOfMonths: 1,
                    dateFormat: "dd M \'' y",
                    altFormat: "mm/dd/yy",
                    onClose: function( addDays ) {
                        var dateArr = $('#start').datepicker('getDate'); 
                        var dateLeav = $('#end').datepicker('getDate'); 
                        if(!(dateArr < dateLeav)) {
                            dateArr.setDate(dateArr.getDate()+1); 
                            $('#end').datepicker('setDate', dateArr);
                        }; 
                    }
                };

                $('#start').datepicker(
                    $.extend({
                        altField: '#from'
                    }, opts)
                );
                $('#end').datepicker(
                    $.extend({
                        altField: '#to'
                    }, opts)
                );
                $("#start").datepicker('setDate', '+0d');
                $("#end").datepicker('setDate', '+1d');
            });

            $(function() {	

                var opts = {
                    defaultDate: "+1w",
                    showWeek: true,
                    firstDay: 1,
                    changeMonth: true,
                    numberOfMonths: 1,
                    dateFormat: "dd M \'' y",
                    altFormat: "mm/dd/yy",
                    onClose: function( addDays ) {
                        var dateArr = $('#start2').datepicker('getDate'); 
                        var dateLeav = $('#end2').datepicker('getDate'); 
                        if(!(dateArr < dateLeav)) {
                            dateArr.setDate(dateArr.getDate()+1); 
                            $('#end2').datepicker('setDate', dateArr);
                        }; 
                    }
                };

                $('#start2').datepicker(
                    $.extend({
                        altField: '#from2'
                    }, opts)
                );
                $('#end2').datepicker(
                    $.extend({
                        altField: '#to2'
                    }, opts)
                );
                $("#start2").datepicker('setDate', '+0d');
                $("#end2").datepicker('setDate', '+1d');
            });


            $(document).ready(function() {

                $(window).scroll(function() {    
                    var scroll = $(window).scrollTop();
					
					if ($("body").hasClass("noCarousel")){
						var topScroll = 70;
					}else {					
						var topScroll = 400;
					}
					
                    if (scroll >= topScroll) {
                        $("#bookingFormContainer_wide").addClass("appear");
                    } else {
                        $("#bookingFormContainer_wide").removeClass("appear");
                    }
                });	

                $('[data-toggle="tooltip"]').tooltip()

                $("#top-nav-smaller-toggle").click(function(){
                    $(this).toggleClass("closed");
                    $("#top-nav-smaller").toggleClass("activated");	
                });
            });


            (function($) {
                $(window).load(function() {

                     $("#carousel3").flexslider({
                        animation: "slide",
                        controlNav: false,
                        directionNav: true,	
                        animationLoop: true,
                        slideshow: false,
                        itemWidth: 240,
                        itemMargin: 5,
                       asNavFor: '#sliderNew'
                    });

                    $('#sliderNew').flexslider({
                        animation: "slide",
                        controlNav: false,               
                        directionNav: true,            
                        prevText: "Previous",           
                        nextText: "Next",
                        animationLoop: true,
                        slideshow: true,
                        sync: "#carousel3",
                        start: function(slider){
                        $('body').removeClass('loading');
                        }
                    });
					
					$('#offerSlider').flexslider({
        animation: "slide",
        slideshow: true,
        touch: true,
        directionNav: true,
        controlNav: false,
        slideshowSpeed: 5000,
        animationSpeed: 1000,
        randomize: false,
        itemMargin: "0"
    });
					
					
                });
            })(jQuery);


$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top 
        }, 1000);
        return false;
      }
    }
  });
});



$(document).ready(function(){
var modal = $("#myModal");
var btn = $("#myBtn");
var span = $(".close");

$(btn).click(function(){
	$("body").addClass("modalBox");
	$(modal).css("display","block");
	
});
	
$(span).click(function(){
	$(modal).css("display","none");
	$("body").removeClass("modalBox");

	
});	
	
	
});




$(document).ready(function(){
var modal = $("#tourModal");
var btn = $("#tourBtn");
var span = $(".close");

$(btn).click(function(){
	$("body").addClass("modalBox");
	$(modal).css("display","block");
	
});
	
$(span).click(function(){
	$(modal).css("display","none");
	$("body").removeClass("modalBox");

	
});	
	
	
});

$(document).ready(function() {
$('li .dropDownIcon').on("click",function(){
	var itemMenu = $(this).parent("li").find(".internalMenu, .dropdown-menu");
	$(this).parent("li").find(".internalMenu, .dropdown-menu").slideToggle().toggleClass('currentItem');
	 if ( $( itemMenu ).hasClass("currentItem")) {
	$(this).find('.fa').removeClass('fa-angle-right').addClass('fa-angle-down');
	 }
	else{
	$(this).find('.fa').removeClass('fa-angle-down').addClass('fa-angle-right');
	}
});
	});