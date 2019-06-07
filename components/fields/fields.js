import { baseField } from './fields_templates.js';
import { debounce } from '../logic_patterns/logic.js';

export function niceField( field = {} ) {

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

        if ( !field['can_be_empty'] )   { field['can_be_empty']   = true; }

        if (field['select_type'] === 'single') {

            let default_select_value = '';
            let default_select_content = '';
            let default_select_icon = '';
            jQuery.each(field['selections'], function (i, element) {
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

            let content = '';
            let check_count = -1;

            field['selections'].forEach ( function ( selection ) {
                if ( selection['checked'] ) {
                    check_count++;
                    if ( check_count === 0 ) {
                        content = selection['text'];
                        if ( selection['icon'] ) {
                            field['icon'] = selection['icon'];
                        }
                    }
                }
            });

            if ( content !== '' ) {
                content += Nice._t(' and + ') + check_count;
            } else {
                content = Nice._t( 'Nothing selected');
            }
            field['content'] = content;

        }

    } else if ( field['field_type'] === 'vanilla') {
        field['autocomplete'] = 'off';
    }

    if ( typeof field['icon'] === 'string' ) {
        let iconID = field['icon'];
        field['icon'] = {
            'id': iconID,
            'class': 'field_icon',
        };
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

    media_frame.on( 'close', function() {
        let selection =  media_frame.state().get('selection');
        selection.each( function( attachment ) {
            input.innerHTML = attachment['attributes']['url'];
            if ( input.getAttribute('data-validation') ) {
                Nice.field.updateMediaField( input );
                Nice.field.validate( input );
            }
        });
    });

    media_frame.open();

}

export function updateMediaField( elem ) {

    let preview_box = elem.parentNode.querySelector('.preview_box');
    let preview_box_icon = preview_box.querySelector('.preview_box__icon');

    if ( preview_box.classList.contains('preview') ) {
        preview_box.classList.remove('preview');
    }

    preview_box_icon.setAttribute('svg-id', 'loader');
    preview_box_icon.classList.add('spin');

    delayMediaImagePreview(elem);
}

export const delayMediaImagePreview = debounce( mediaImagePreview, 1200 );

export function mediaImagePreview( elem ) {

    let preview_box = elem.parentNode.querySelector('.preview_box');
    let preview_box_icon = preview_box.querySelector('.preview_box__icon');

    Nice.get( elem.textContent ).then( function ( responce ) {
        preview_box_icon.classList.remove('spin');
        preview_box_icon.setAttribute('svg-id', 'blind');
        if ( responce.status === 200 ) {
            preview_box.querySelector('.preview_img').setAttribute( 'src', elem.textContent );
            preview_box.classList.add('preview');
        }
    });
}