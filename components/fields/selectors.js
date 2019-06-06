export function toggleSelector( element = null ) {
    let area = jQuery(element).parents('.NiceFieldArea');
    area.toggleClass('open');
}

export function chooseThis( elem = null ) {

    if ( elem.classList.contains('blocked') ) {
        Nice.notify({'type': 'warning', 'message': Nice._t('This element is blocked')});
        return false;
    } else {
        /** Get values and html from clicked list element **/
        let value = jQuery(elem).attr('data-value');
        let title = jQuery(elem).find('.selection_list__element_text').html();
        let icon = jQuery(elem).find('.selection_list__element_icon').html();

        /** Find parent html elements: area & input itself **/
        let area  = jQuery(elem).parents('.NiceFieldArea');
        let input = area.find('.input');
        let select_type = input.attr('data-select_type');

        if ( select_type === 'single' ) {

            /** Remove checked from all element except clicked **/
            area.find('.selection_list__element').removeClass('checked');
            jQuery(elem).addClass('checked');

            /** Insert value and html **/
            if ( input.is( 'input' ) ) {
                input.val( value );
            } else {
                input.html( title );
                input.attr('data-value', value );
            }
            area.find('.FieldIcon').html(icon);
            area.removeClass('open');

        } else {
            jQuery(elem).toggleClass('checked');
        }

        /** Run callback **/
        let callback = input.attr('data-callback');
        if( input.attr('data-callback' ) ) {
            eval( callback );
        }
    }
}