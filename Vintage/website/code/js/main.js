$(document).ready(function () {
  init();
  $(document).click(function (e) {
    fire(e);
  });
});

function fire(e) { alert('hi'); }

function touchHandler(event)
{
    var touches = event.changedTouches,
        first = touches[0],
        type = "";

    switch(event.type)
    {
       case "touchstart": type = "mousedown"; break;
       case "touchmove":  type = "mousemove"; break;
       case "touchend":   type = "mouseup"; break;
       default: return;
    }

    //initMouseEvent(type, canBubble, cancelable, view, clickCount,
    //           screenX, screenY, clientX, clientY, ctrlKey,
    //           altKey, shiftKey, metaKey, button, relatedTarget);

    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
                          first.screenX, first.screenY,
                          first.clientX, first.clientY, false,
                          false, false, false, 0/*left*/, null);

    first.target.dispatchEvent(simulatedEvent);
    
}

function init()
{
    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);
}
$(document).scroll(function () {
   	var y = $(this).scrollTop();
   	if (y > 100) {
       	$('#navigation').fadeIn();
   	} else {
       	$('#navigation').fadeOut();
   	}
});
$(document).scroll(function () {
   	var logonav = $(this).scrollTop();
   	if (logonav > 150) {
       	$('#nav-logo i').css({'font-size':'120px','left':'40px'});
   	} else {
       	$('#nav-logo i').css({'font-size':'0px','left':'0'});
   	}
});

$(document).scroll(function () {
   	var logo = $(this).scrollTop();
   	if (logo > 110) {
       	$('header h1 i').fadeOut(400);
   	} else {
       	$('header h1 i').fadeIn(400);
   	}
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

$(document).ready(function() {
      var text = $('.service-select option:selected').text()
      $(".selected-service").text(text);
      $(".zoom-out").css({"background-size":"100%"})
      $('.zoom-out').mouseenter(function(e) {
           $(this).animate({
               "background-size":"120%"
         }, 80 );
      }).mouseleave(function(e) {
           $(this).animate({
               "background-size":"100%"
         }, 80 );
      });

      //--------------------------------




$(document).click(function(){
      var text = $('.service-select option:selected').text()
      var formatted = text.substr(2, 10);
      $(".selected-service").text(formatted);
});


$(document).on('click', '#mobile-navigation' ,function(){
      $('.hamburger').slideToggle(300);
});


// $(document).on('click', function(){
//   if ($('.nl-dd-checked').text == 'de tatouages'){
//     $('form#contact-form').attr('action', '/send_form_tommi.php');
//   }
// });


$(document).on('click',function(){
      if($('.nl-field-toggle:contains("  general")').length) {
            $('form#contact-form').attr('action', '/send_form_email.php');
            $('.tattoo-select-wrapper').hide();
            $('.haircuts-select-wrapper').hide();
            $('.tattoo-select-wrapper .nl-field-toggle').text('le tatoueur');
            $('.haircuts-select-wrapper .nl-field-toggle').text('la coiffeuse/esthéticienne');
      }

});


$(document).on('click',function(){
      if($('.nl-field-toggle:contains("de coiffure")').length) {
            // $('form#contact-form').attr('action', '/send_form_myriam.php');
            $('.haircuts-select-wrapper').fadeIn(300);
            $('.tattoo-select-wrapper').hide();
            $('.tattoo-select-wrapper .nl-field-toggle').text('le tatoueur');
      }

});

$(document).on('click',function(){
      if($('.nl-field-toggle:contains("Myriam")').length) {
            $('form#contact-form').attr('action', '/send_form_myriam.php');
      }
});

$(document).on('click',function(){
      if($('.nl-field-toggle:contains("Valerie")').length) {
            $('form#contact-form').attr('action', '/send_form_esthetique.php');
      }
});


// /////////////////////////////////////////////////////////////////////
//
//                               TATTOO FORM
//
// /////////////////////////////////////////////////////////////////////
$(document).on('click',function(){
      if($('.nl-field-toggle:contains("de tatouages")').length) {
            $('.tattoo-select-wrapper').fadeIn(300);
            $('.haircuts-select-wrapper').hide();
      }
});

$(document).on('click',function(){
      if($('.nl-field-toggle:contains("Tommi")').length) {
            $('form#contact-form').attr('action', '/send_form_tommi.php');
      }
});

$(document).on('click',function(){
      if($('.nl-field-toggle:contains("Elvis")').length) {
            $('form#contact-form').attr('action', '/send_form_elvis.php');
      }
});

// /////////////////////////////////////////////////////////////////////
//
//                               TATTOO FORM END
//
// /////////////////////////////////////////////////////////////////////




// $(function(){
//       $('#demo5').scrollbox({
//         infiniteLoop: false,
//         autoPlay: false,
//         direction: 'h',
//         distance: 140
//       });
//       $('#demo5-backward').click(function () {
//         $('#demo5').trigger('backward');
//       });
//       $('#demo5-forward').click(function () {
//         $('#demo5').trigger('forward');
//       });
// });
//       //slider portfolio 2
//       $(function(){
//             $('#demo6').scrollbox({
//               infiniteLoop: false,
//               autoPlay: false,
//               direction: 'h',
//               distance: 140
//             });
//             $('#demo6-backward').click(function () {
//               $('#demo6').trigger('backward');
//             });
//             $('#demo6-forward').click(function () {
//               $('#demo6').trigger('forward');
//             });
//       });

$(function(){
  $('.tattoo').click(function(){
      $('.haircuts, .nails').hide('slide');
      $('.tattoos').slideToggle();
    });
});
$(function(){
  $('.haircut').click(function(){
      $('.tattoos, .nails').hide('slide');
      $('.haircuts').slideToggle();
    });
});
$(function(){
  $('.nail').click(function(){
      $('.haircuts, .tattoos').hide('slide');
      $('.nails').slideToggle();
    });
});

$(function(){
	$('.hamburger-menu').click(function(){
    	$('.mobile-sub-menu').slideToggle();
    	$('.hamburger-menu').toggleClass('opened-mobile-menu');
      $('.mobile-menu-title').toggleClass('hidden');
    });
});
});

// $(document).ready(function(i) {
//       $(".nl-field").each(function() {
//             $(this).addClass("nl-field" + (i+1));
//       });
// });



/*!
 * classie - class helper functions
 * from bonzo https://github.com/ded/bonzo
 *
 * classie.has( elem, 'my-class' ) -> true/false
 * classie.add( elem, 'my-new-class' )
 * classie.remove( elem, 'my-unwanted-class' )
 * classie.toggle( elem, 'my-class' )
 */

/*jshint browser: true, strict: true, undef: true */
/*global define: false */

( function( window ) {

'use strict';

// class helper functions from bonzo https://github.com/ded/bonzo

function classReg( className ) {
  return new RegExp("(^|\\s+)" + className + "(\\s+|$)");
}

// classList support for class management
// altho to be fair, the api sucks because it won't accept multiple classes at once
var hasClass, addClass, removeClass;

if ( 'classList' in document.documentElement ) {
  hasClass = function( elem, c ) {
    return elem.classList.contains( c );
  };
  addClass = function( elem, c ) {
    elem.classList.add( c );
  };
  removeClass = function( elem, c ) {
    elem.classList.remove( c );
  };
}
else {
  hasClass = function( elem, c ) {
    return classReg( c ).test( elem.className );
  };
  addClass = function( elem, c ) {
    if ( !hasClass( elem, c ) ) {
      elem.className = elem.className + ' ' + c;
    }
  };
  removeClass = function( elem, c ) {
    elem.className = elem.className.replace( classReg( c ), ' ' );
  };
}

function toggleClass( elem, c ) {
  var fn = hasClass( elem, c ) ? removeClass : addClass;
  fn( elem, c );
}

var classie = {
  // full names
  hasClass: hasClass,
  addClass: addClass,
  removeClass: removeClass,
  toggleClass: toggleClass,
  // short names
  has: hasClass,
  add: addClass,
  remove: removeClass,
  toggle: toggleClass
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( classie );
} else {
  // browser global
  window.classie = classie;
}

})( window );


/**
 * nlform.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
;( function( window ) {
	'use strict';

	var document = window.document;

	if (!String.prototype.trim) {
		String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};
	}

	function NLForm( el ) {
		this.el = el;
		this.overlay = this.el.querySelector( '.nl-overlay' );
		this.fields = [];
		this.fldOpen = -1;
		this._init();
	}

	NLForm.prototype = {
		_init : function() {
			var self = this;
			Array.prototype.slice.call( this.el.querySelectorAll( 'select' ) ).forEach( function( el, i ) {
				self.fldOpen++;
				self.fields.push( new NLField( self, el, 'dropdown', self.fldOpen ) );
			} );
			Array.prototype.slice.call( this.el.querySelectorAll( 'input' ) ).forEach( function( el, i ) {
				self.fldOpen++;
				self.fields.push( new NLField( self, el, 'input', self.fldOpen ) );
			} );
			this.overlay.addEventListener( 'click', function(ev) { self._closeFlds(); } );
			this.overlay.addEventListener( 'touchstart', function(ev) { self._closeFlds(); } );
		},
		_closeFlds : function() {
			if( this.fldOpen !== -1 ) {
				this.fields[ this.fldOpen ].close();
			}
		}
	}

	function NLField( form, el, type, idx ) {
		this.form = form;
		this.elOriginal = el;
		this.pos = idx;
		this.type = type;
		this._create();
		this._initEvents();
	}

	NLField.prototype = {
		_create : function() {
			if( this.type === 'dropdown' ) {
				this._createDropDown();
			}
			else if( this.type === 'input' ) {
				this._createInput();
			}
		},
		_createDropDown : function() {
			var self = this;
			this.fld = document.createElement( 'div' );
			this.fld.className = 'nl-field nl-dd';
			this.toggle = document.createElement( 'a' );
			this.toggle.innerHTML = this.elOriginal.options[ this.elOriginal.selectedIndex ].innerHTML;
			this.toggle.className = 'nl-field-toggle';
			this.optionsList = document.createElement( 'ul' );
			var ihtml = '';
			Array.prototype.slice.call( this.elOriginal.querySelectorAll( 'option' ) ).forEach( function( el, i ) {
				ihtml += self.elOriginal.selectedIndex === i ? '<li class="nl-dd-checked">' + el.innerHTML + '</li>' : '<li>' + el.innerHTML + '</li>';
				// selected index value
				if( self.elOriginal.selectedIndex === i ) {
					self.selectedIdx = i;
				}
			} );
			this.optionsList.innerHTML = ihtml;
			this.fld.appendChild( this.toggle );
			this.fld.appendChild( this.optionsList );
			this.elOriginal.parentNode.insertBefore( this.fld, this.elOriginal );
			this.elOriginal.style.display = 'none';
		},
		_createInput : function() {
			var self = this;
			this.fld = document.createElement( 'div' );
			this.fld.className = 'nl-field nl-ti-text';
			this.toggle = document.createElement( 'a' );
			this.toggle.innerHTML = this.elOriginal.getAttribute( 'placeholder' );
			this.toggle.className = 'nl-field-toggle';
			this.optionsList = document.createElement( 'ul' );
			this.getinput = document.createElement( 'input' );
			this.getinput.setAttribute( 'type', 'text' );
			this.getinput.setAttribute( 'placeholder', this.elOriginal.getAttribute( 'placeholder' ) );
			this.getinputWrapper = document.createElement( 'li' );
			this.getinputWrapper.className = 'nl-ti-input';
			this.inputsubmit = document.createElement( 'button' );
			this.inputsubmit.className = 'nl-field-go';
			this.inputsubmit.innerHTML = 'Go';
			this.getinputWrapper.appendChild( this.getinput );
			this.getinputWrapper.appendChild( this.inputsubmit );
			this.example = document.createElement( 'li' );
			this.example.className = 'nl-ti-example';
			this.example.innerHTML = this.elOriginal.getAttribute( 'data-subline' );
			this.optionsList.appendChild( this.getinputWrapper );
			this.optionsList.appendChild( this.example );
			this.fld.appendChild( this.toggle );
			this.fld.appendChild( this.optionsList );
			this.elOriginal.parentNode.insertBefore( this.fld, this.elOriginal );
			this.elOriginal.style.display = 'none';
		},
		_initEvents : function() {
			var self = this;
			this.toggle.addEventListener( 'click', function( ev ) { ev.preventDefault(); ev.stopPropagation(); self._open(); } );
			this.toggle.addEventListener( 'touchstart', function( ev ) { ev.preventDefault(); ev.stopPropagation(); self._open(); } );

			if( this.type === 'dropdown' ) {
				var opts = Array.prototype.slice.call( this.optionsList.querySelectorAll( 'li' ) );
				opts.forEach( function( el, i ) {
					el.addEventListener( 'click', function( ev ) { ev.preventDefault(); self.close( el, opts.indexOf( el ) ); } );
					el.addEventListener( 'touchstart', function( ev ) { ev.preventDefault(); self.close( el, opts.indexOf( el ) ); } );
				} );
			}
			else if( this.type === 'input' ) {
				this.getinput.addEventListener( 'keydown', function( ev ) {
					if ( ev.keyCode == 13 ) {
						self.close();
					}
				} );
				this.inputsubmit.addEventListener( 'click', function( ev ) { ev.preventDefault(); self.close(); } );
				this.inputsubmit.addEventListener( 'touchstart', function( ev ) { ev.preventDefault(); self.close(); } );
			}

		},
		_open : function() {
			if( this.open ) {
				return false;
			}
			this.open = true;
			this.form.fldOpen = this.pos;
			var self = this;
			this.fld.className += ' nl-field-open';
		},
		close : function( opt, idx ) {
			if( !this.open ) {
				return false;
			}
			this.open = false;
			this.form.fldOpen = -1;
			this.fld.className = this.fld.className.replace(/\b nl-field-open\b/,'');

			if( this.type === 'dropdown' ) {
				if( opt ) {
					// remove class nl-dd-checked from previous option
					var selectedopt = this.optionsList.children[ this.selectedIdx ];
					selectedopt.className = '';
					opt.className = 'nl-dd-checked';
					this.toggle.innerHTML = opt.innerHTML;
					// update selected index value
					this.selectedIdx = idx;
					// update original select element´s value
					this.elOriginal.value = this.elOriginal.children[ this.selectedIdx ].value;
				}
			}
			else if( this.type === 'input' ) {
				this.getinput.blur();
				this.toggle.innerHTML = this.getinput.value.trim() !== '' ? this.getinput.value : this.getinput.getAttribute( 'placeholder' );
				this.elOriginal.value = this.getinput.value;
			}
		}
	}

	// add to global namespace
	window.NLForm = NLForm;

} )( window );
