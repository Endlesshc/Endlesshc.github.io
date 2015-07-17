
$(document).scroll(function () {
   	var y = $(this).scrollTop();
   	if (y > 500) {
       	$('.menu').fadeIn();
   	} else {
       	$('.menu').fadeOut();
   	}
});

$(function (){
  $('.first-arrow').click(function(){
    $('.first-arrow').hide();
    $('.second-arrow').show();
  });
});
$(function (){
  $('.second-arrow').click(function(){
    $('.second-arrow').hide();
    $('.third-arrow').show();
  });
});


$(function (){
  $('.third-arrow').click(function(){
    $('.third-arrow').fadeOut(600);
    
  });
});

$(function (){
  $('.back-to-top-arrow').click(function(){
    $('.back-to-top-arrow').hide();
    $('.first-arrow').show();
  });
});



  $(window).scroll(function() {

   if ($(this).scrollTop()>3200)
    {
       $('.back-to-top-arrow').fadeIn();
       $('.first-arrow').hide();
    }
   else
    {
     $('.back-to-top-arrow').fadeOut();
    }
});


$(function(){
	$('.hamburger-menu').click(function(){
    	$('.mobile-sub-menu').slideToggle();
    	$('.hamburger-menu').toggleClass('opened-mobile-menu');
      $('.mobile-menu-title').toggleClass('hidden');
    });
});