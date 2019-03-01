function toggleSelector( element = null, event = null ) {
    if ( element && event ) {
        if ( element === event.target ) {
            if ( jQuery(element).hasClass('NiceFieldArea') ) {
                jQuery(element).toggleClass('open');
            }
        }
    } else {

    }

}

function chooseThis( elem ) {
    let value = jQuery(this);
    let title = jQuery(this);
    let area  = jQuery(this).parents('.NiceFieldArea');
    let input = area.find('.input');

    if ( input.is( 'input' ) ) {
        input.val( value );
    } else {
        input.html( title );
        input.attr('data-value', value );
    }
}