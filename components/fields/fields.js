import { baseField } from './fields_templates.js';

export function niceField(field) {
    if (!field) {
        field = {}
    }
    if (!(field['value'])) {
        field['value'] = ''
    }
    if (!(field['type'])) {
        field['type'] = 'text'
    }
    if (!(field['size'])) {
        field['size'] = 'medium'
    }
    if (!(field['class'])) {
        field['class'] = ''
    }
    if (!(field['inline'])) {
        field['inline'] = false
    }
    if (!(field['required'])) {
        field['required'] = false
    }
    if (!(field['field_class'])) {
        field['field_class'] = ''
    }
    if (!(field['field_type'])) {
        field['field_type'] = 'regular'
    }
    if (!(field['icon_class'])) {
        field['icon_class'] = ''
    }
    if (!(field['spellcheck'])) {
        field['spellcheck'] = false
    }
    if (!(field['name'])) {
        field['name'] = ''
    }
    if (!(field['validation'])) {
        field['validation'] = false
    }


    if (!(field['placeholder'])) {
        field['placeholder'] = Nice._t('Type some text')
    }
    if (!(field['label'])) {
        field['label'] = Nice._t('Really nice field')
    }
    if (!(field['error_message'])) {
        field['error_message'] = Nice._t('Enter valid data')
    }
    if (field['show_label'] === "" || !(field['show_label'])) {
        field['show_label'] = true
    }
    if (!(field['no_min_width'])) {
        field['no_min_width'] = false
    }
    if (!(field['align_center'])) {
        field['align_center'] = false
    }
    if (!(field['border_type'])) {
        field['border_type'] = 'regular_border'
    }
    if (!(field['label_type'])) {
        field['label_type'] = 'above_border'
    }
    /** Default values for simple fields **/
    if (field['field_type'] === 'regular' || field['field_type'] === 'vanilla') {
        if (field['default_value'] && !field['value']) {
            field['value'] = field['default_value'];
        }
    }

    /** Default values for drop down lists **/
    if (field['field_type'] === 'select_list') {

        field['type'] = 'select';

        if (!(field['select_type'])) {
            field['select_type'] = 'single';
        }
        if (!(field['open'])) {
            field['open'] = false;
        }
        if (!(field['checkboxes'])) {
            field['checkboxes'] = true;
        }
        if (!(field['content'])) {
            field['content'] = '';
        }
        if (!(field['editable'])) {
            field['editable'] = false;
        }
        if (!(field['callback'])) {
            field['callback'] = '';
        }
        if (typeof field['icon'] === 'undefined') {
            field['icon'] = false
        }

        if (field['select_type'] === 'single') {

            let default_select_value = '';
            let default_select_content = '';
            let default_select_icon = '';
            jQuery.each(field['selections'], function (i, element) {
                console.log(element);
                if (element['default']) {
                    default_select_value = element['value'];
                    default_select_content = element['text'];
                    default_select_icon = element['icon'];
                }
            });

            if (!field['value'] && default_select_value) {
                field['value'] = default_select_value;
            }

            if (!field['content'] && default_select_content) {
                field['content'] = default_select_content;
            }

            if (!field['icon'] && default_select_icon) {
                field['icon'] = default_select_icon;
            }

        } else {

            if (field['no_min_width']) {
                field['no_min_width'] = false;
            }

        }

    }

    return baseField( field );

}

export function clearEditable() {
    jQuery('*[contenteditable]').on('paste', function (e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        pastePlain(e);
    });
}

export function clearEditableInArea(area) {

    let fileds = jQuery(area).find('[contenteditable]');
    fileds.on('paste', function (e) {
        e.stopImmediatePropagation();
        e.preventDefault();
        pastePlain(e);
    });

}

export function pastePlain(e) {
    e.preventDefault();
    let plain_text = (e.originalEvent || e).clipboardData.getData('text/plain');
    if (typeof plain_text !== 'undefined') {
        document.execCommand('insertText', false, plain_text);
    }
    return false;
}

export function searchList(elem) {

    let
        field = jQuery(elem),
        container = field.parents('.NiceField'),
        list = container.find('.selection_list__element'),
        text = field.html()
    ;

    if (text === '') {
        list.removeClass('hidden');
    }

    jQuery.each(list, function () {
        let
            list_elem = jQuery(this),
            list_text = list_elem.find('.selection_list__element_text').html()
        ;
        if (list_text.search(new RegExp(text, "i")) !== -1) {
            list_elem.removeClass('hidden');
        } else {
            list_elem.addClass('hidden');
        }
    });


}

export function WPMediaForFields( icon, e ) {

    e.preventDefault();

    let
        container = icon.closest('.NiceField'),
        input = container.querySelector('.input')
    ;

    let media_frame = wp.media({
        title: Nice._t('Choose Image'),
        multiple : false,
        library : {
            type : 'image',
        }
    });

    console.log( media_frame );

    media_frame.on( 'close', function() {
        let selection =  media_frame.state().get('selection');
        selection.each( function( attachment ) {
            input.innerHTML = attachment['attributes']['url'];
            if ( input.getAttribute('data-validation') ) {
                Nice.field.validate( input );
            }
        });
    });

    media_frame.open();

}