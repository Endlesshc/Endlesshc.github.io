if ( !kimoby ) {
    var kimoby = {};
}

kimoby.Retina = {};

kimoby.Retina.init = function() {
    if ( $.cookie( 'retina' ) == undefined && window.devicePixelRatio > 1 ) {
        $.cookie( 'retina', true, { expires: 365 } );

        if ( $.cookie( 'retina' ) != undefined ) {
            window.location.reload( true );
        }
    }

    if ( $.cookie( 'retina' ) ) {
        $.each( $( 'body' ).find( '[data-retina]' ), function( index, item ) {
            item = $( item );

            if ( item.is( 'img' ) ) {
                item.attr( 'src', item.data( 'retina' ) );
            } else {
                item.css( 'backgroundImage', 'url("' + item.data( 'retina' ) + '")' );
            }
        } );
    }
};

$( document ).init( 'ready', kimoby.Retina.init );