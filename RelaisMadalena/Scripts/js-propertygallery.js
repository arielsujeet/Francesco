(function ($) {
	function loadGallery(element, str){
	//	console.log(str);	
	//	console.log(element);
		var url = "pgal?gal=" + str;
		var galleryCont = element.find(".gallery-cont");
		galleryCont.load(url, function() {
 			//window.slimmage.checkResponsiveImages(1);
			galleryCont.fadeIn();			
			galleryCont.find(" .slider").flexslider({
			controlNav: false,
				animation:"slide",
				easing:"swing"
			});	


		});
		

		
	}
	
	$( window ).load(function() {
		
		$( ".hasGallery" ).each(function( index ) {
		var thisEl = $( this );
		var galleryId = thisEl.data("gallery-id");
		thisEl.addClass("gallery-loaded" );	
		loadGallery(thisEl, galleryId);
		console.log(galleryId);
        });
		
		
});
/*	$(document).on({
    mouseenter: function () {
		var thisEl = $(this);
		if(thisEl.hasClass("gallery-loaded")){	
			thisEl.find(".gallery-cont").fadeIn();
		}else{		
		var galleryId = thisEl.data("gallery-id");
		thisEl.addClass("gallery-loaded");		
		loadGallery(thisEl, galleryId);
			console.log(galleryId);
		}
    },
    mouseleave: function () {
  
    }
}, ".hasGallery");*/
	
	
	
	
})(jQuery);	