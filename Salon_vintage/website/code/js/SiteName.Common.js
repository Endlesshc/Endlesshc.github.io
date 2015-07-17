if ( !SiteName ) {
    var SiteName = {};
}

SiteName.Common = {};

SiteName.Common.lazyLoad = function( theId, theSrc, globals ) {
    var addedJS = null;
    var firstJS = document.getElementsByTagName( 'script' )[ 0 ];

    if( !document.getElementById( theId ) ) {
        addedJS = document.createElement( 'script' );
        addedJS.id = theId;
        addedJS.src = theSrc;
        addedJS.async = true;
        firstJS.parentNode.insertBefore( addedJS, firstJS );
    }

    if( globals ) {
        for( llvar in globals ){
            window[ [ llvar ] ] = globals[ llvar ];
        }
    }
};

SiteName.Common.init = function() {
    if( typeof window._isDev == 'undefined' ) {
        SiteName.Common.lazyLoad( 'google-analytics', ( 'https:'==location.protocol?'//ssl':'//www' ) + '.google-analytics.com/ga.js', { _gaq: [ [ '_setAccount','[PH]' ],[ '_trackPageview' ] ] } );
    }
};

$( document ).init( 'ready', SiteName.Common.init );