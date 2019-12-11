import {baseField, wpEditor} from './fields_templates.js';
import {debounce} from '../logic_patterns/logic.js';

function defaultRegularField() {
    return {

        /** Core **/
        name: '',                           // string
        value: '',                           // string
        default_value: false,                        // false || string
        data_type: 'text',                       // string
        type: 'text',                       // string
        field_type: 'regular',                    // string: regular, vanilla, select_list, media, wp_editor

        /** Classes **/
        class: '',                           // string
        field_class: '',                           // string
        icon_class: '',                           // string

        /** Form data **/
        required: false,                        // bool
        validation: false,                        // bool
        paste_chat: false,                        // bool

        /** Editable settings **/
        spellcheck: false,                        // bool
        editable: true,                         // bool

        /** Text **/
        placeholder: Nice._t('Type some text'),    // string: text
        label: Nice._t('Really nice field'), // string: text
        error_message: Nice._t('Enter valid data'),  // string: text
        success_message: Nice._t('Seems ok'),          // string: text
        comment_message: '',                           // string: text

        /** Styling **/
        size: 'small',                     // string: tiny, small, medium, large, huge
        inline: false,                        // bool
        show_label: true,                         // bool
        no_min_width: false,                        // no_min_width
        align_center: false,                        // align_center
        border_type: 'regular_border',             // border_type
        label_type: 'above_border',               // label_type
        icon: false,                        // false | string | object

        /** Functionality **/
        callback: false,                        // false || function name

    };
}

function defaultSelectList() {
    return {
        select_type: 'single',                     // string: single | multiple
        open: false,                        // bool
        checkboxes: false,                        // bool
        content: '',                           // string text
        can_be_empty: true,                         // bool
    };
}

function defaultSelection() {
    return {
        name: '',                           // string
        value: '',                           // string
        text: '',                           // string text
        icon: false,                        // false | string
        checked: false,                        // bool
        default: false,                        // bool
        hide_checkbox: false,                        // bool
    }
}

export function niceField(field = {}) {

    field = Object.assign({}, defaultRegularField(), field);

    // if (!(field['value'])) {
    //     field['value'] = ''
    // }
    // if (!(field['type'])) {
    //     field['type'] = 'text'
    // }
    // if (!(field['size'])) {
    //     field['size'] = 'medium'
    // }
    // if (!(field['class'])) {
    //     field['class'] = ''
    // }
    // if (!(field['inline'])) {
    //     field['inline'] = false
    // }
    // if (!(field['required'])) {
    //     field['required'] = false
    // }
    // if (!(field['field_class'])) {
    //     field['field_class'] = ''
    // }
    // if (!(field['field_type'])) {
    //     field['field_type'] = 'regular'
    // }
    // if (!(field['icon_class'])) {
    //     field['icon_class'] = ''
    // }
    // if (!(field['spellcheck'])) {
    //     field['spellcheck'] = false
    // }
    // if (!(field['name'])) {
    //     field['name'] = ''
    // }
    // if (!(field['validation'])) {
    //     field['validation'] = false
    // }
    // if (typeof field['editable'] === 'undefined') {
    //     field['editable'] = true
    // }
    // if (!(field['placeholder'])) {
    //     field['placeholder'] = Nice._t('Type some text')
    // }
    // if (!(field['label'])) {
    //     field['label'] = Nice._t('Really nice field')
    // }
    // if (!(field['error_message'])) {
    //     field['error_message'] = Nice._t('Enter valid data')
    // }
    // if (field['show_label'] === "" || !(field['show_label'])) {
    //     field['show_label'] = true
    // }
    // if (!(field['no_min_width'])) {
    //     field['no_min_width'] = false
    // }
    // if (!(field['align_center'])) {
    //     field['align_center'] = false
    // }
    // if (!(field['border_type'])) {
    //     field['border_type'] = 'regular_border'
    // }
    // if (!(field['label_type'])) {
    //     field['label_type'] = 'above_border'
    // }

    /** Default values for simple fields **/
    if (field['field_type'] === 'regular' || field['field_type'] === 'vanilla') {
        if (field['default_value'] && !field['value']) {
            field['value'] = field['default_value'];
        }
    }

    /** Default values for drop down lists **/
    if (field['field_type'] === 'select_list') {

        field['type'] = 'select';

        field = Object.assign({}, defaultSelectList(), field);

        // if (!(field['select_type'])) {
        //     field['select_type'] = 'single';
        // }
        // if (!(field['open'])) {
        //     field['open'] = false;
        // }
        // if (field['checkboxes'] === '') {
        //     field['checkboxes'] = true;
        // }
        // if (!(field['content'])) {
        //     field['content'] = '';
        // }
        // if (!(field['editable'])) {
        //     field['editable'] = false;
        // }
        //
        // if (!(field['callback'])) {
        //     field['callback'] = '';
        // }
        // if (typeof field['icon'] === 'undefined') {
        //     field['icon'] = false
        // }
        //
        // if (!field['can_be_empty']) {
        //     field['can_be_empty'] = true;
        // }


        field.selections.forEach(function (name, selection) {
            field.selections[name] = Object.assign({}, defaultSelection(), selection);

            // if ( typeof selection['icon']          === 'undefined' ) { selection['icon'] = false; }
            // if ( typeof selection['hide_checkbox'] === 'undefined' ) { selection['hide_checkbox'] = false; }
        });


        if (field['select_type'] === 'single') {

            let checked = false;
            field.selections.forEach(function (i, selection) {
                if (selection.checked === true) {
                    checked = i;
                }
            });

            if (checked) {
                field.value = field.selections[checked].value;
                field.content = field.selections[checked].text;
                if (field.selections[checked].icon) {
                    field.icon = field.selections[checked].icon
                }
            } else {
                let default_select_value = '';
                let default_select_content = '';
                let default_select_icon = '';

                field.selections.forEach(function (i, selection) {
                    if (selection['default']) {
                        default_select_value = selection['value'];
                        default_select_content = selection['text'];
                        default_select_icon = selection['icon'];
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
            }

            field['data-nothing'] = true;

            if (field['value']) {
                field['data-nothing'] = false;
            }
        } else {

            if (field['no_min_width']) {
                field['no_min_width'] = false;
            }

            let content = '';
            let check_count = -1;

            field.selections.forEach(function (name, selection) {

                if (selection['checked']) {
                    field['data-nothing'] = false;
                    check_count++;
                    if (check_count === 0) {
                        content = selection['text'];
                        if (selection['icon']) {
                            field['icon'] = selection['icon'];
                        }
                    }
                }
                else if (check_count < 0) {
                    field['data-nothing'] = true;
                }
            });

            if (content !== '') {
                if (check_count > 0) {
                    content += Nice._t(' and + ') + check_count;
                }
            } else {
                content = Nice._t('Nothing selected');
            }
            field['content'] = content;

        }

    } else if (field['field_type'] === 'vanilla') {
        field['autocomplete'] = 'off';
    }

    if (typeof field['icon'] === 'string') {
        let iconID = field['icon'];
        field['icon'] = {
            'id': iconID,
            'class': 'field_icon',
        };
    }

    if (field['field_type'] !== 'wp_editor') {
        return baseField(field);
    } else {
        return wpEditor(field);
    }

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

export function pastePlainChat(e) {
    e.preventDefault();
    let plain_text = (e.originalEvent || e).clipboardData.getData('text/plain');
    plain_text = plain_text.replace(/(?:\r\n|\r|\n)/g, '<br>');
    if (typeof plain_text !== 'undefined') {
        document.execCommand('insertHTML', false, plain_text);
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

export function WPMediaForFields(icon, e, avatar = false) {
    e.preventDefault();

    let
        container = icon.closest('.NiceField'),
        input = container.querySelector('.input')
    ;

    let media_frame = wp.media({
        title: Nice._t('Choose Image'),
        multiple: false,
        library: {
            type: 'image',
        },
        frame: 'post',
    });

    media_frame.on('close', function () {
        let selection = media_frame.state().get('selection');
        let link = '';
        selection.each(function (attachment) {
            let size = document.querySelector('.media-modal-content .size').value;
            if (typeof size === 'undefined') {
                size = 'full';
            }
            link = attachment['attributes']['sizes'][size]['url'];
            input.innerHTML = link;
            if (input.getAttribute('data-validation')) {
                Nice.field.updateMediaField(input);
                Nice.field.validate(input);
            }

        });
    });

    media_frame.open();

}


export function cropModalButton(self) {

    let
        container = self.closest('.NiceField'),
        input = container.querySelector('.input');
    let modal_data = {
        'icon': false,
        'title': t_('Choose area'),
        'content': cropModal,
        'data': input.textContent,
        'submit': `Nice.pickers.base64( this )`,
        'submit_text': t_('Crop')
    };
    Nice.newModal(modal_data);
    let modal = document.querySelector('.crop-image').closest('nice-modal');
    input.setAttribute('data-modal', modal.getAttribute('id'));
    Nice.pickers.crop(document.querySelector('.crop-image'));
}
function cropModal(link) {
    return `<div class="center">
    <img crossorigin="Anonymous" src="${link}" class="crop-image" alt=""/>
</div>`;
}

export function updateMediaField(elem) {

    let preview_box = elem.parentNode.parentNode.querySelector('.preview_box');
    let preview_box_icon = preview_box.querySelector('.preview_box__icon');

    if (preview_box.classList.contains('preview')) {
        preview_box.classList.remove('preview');
    }

    preview_box_icon.setAttribute('svg-id', 'loader');
    preview_box_icon.classList.add('spin');

    delayMediaImagePreview(elem);
}

export const delayMediaImagePreview = debounce(mediaImagePreview, 1200);

export function mediaImagePreview(elem) {
    let parent = elem.parentNode.parentNode;
    let preview_box = parent.querySelector('.preview_box');
    let preview_box_icon = preview_box.querySelector('.preview_box__icon');
    let add_icon_box = parent.querySelector('.add_icon_box');

    Nice.get(elem.textContent).then(function (response) {
        preview_box_icon.classList.remove('spin');
        if (response.status === 200) {
            if (elem.textContent) {
                preview_box.querySelector('.preview_img').setAttribute('src', elem.textContent);
                preview_box.classList.add('preview');
                add_icon_box.setAttribute('svg-id', 'edit');
            } else {
                add_icon_box.setAttribute('svg-id', 'add_image');
            }
        } else {
            add_icon_box.setAttribute('svg-id', 'edit');
        }
    });
}