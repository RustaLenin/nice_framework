import { wpEditor } from './fields_templates.js';
import { validateHandlers, fieldIcon, validateIcons } from './static.js';

/** Working on fields like web components
 * In progress
 **/

export class niceField extends HTMLElement {

    defaultModel = {
        /** Core **/
        'name': 'name',
        'field_type': 'regular',
        'data_type': 'text',
        'required': false,
        'field_class': '',
        'value': '',
        'spellcheck': false,
        'validation': false,

        /** Required styling **/
        'size': 'medium',
        'border_type': 'regular_border',
        'label_type': 'above_border',

        /** Optional styling **/
        'class': '',
        'hide_label': false,
        'inline': false,
        'no_min_width': false,
        'align_center': false,

        /** Text **/
        'label': Nice._t('Really nice field'),
        'placeholder': Nice._t('Type some text'),
        'error_message': Nice._t('Enter valid data'),
        'comment_message': '',
        'success_message': '',

        /** Icon **/
        'icon': false,
        'icon_class': '',


    };

    currentModel = {};

    constructor() {
        super();

        let data = eval( this.getAttribute('data') );
        let listen = this.getAttribute('listen');

        this.initModel( data );

        if ( listen ) {
            let self = this;
            document.addEventListener( listen, function () {
                self.updateElem();
            });
        }
    }

    initModel( data ){
        let newModel = {};
        Object.assign( newModel, this.defaultModel, data );
        this.currentModel = newModel;
        this.updateElem();
    }

    updateElem() {
        this.updateClass();
        this.innerHTML = this.render();

    }

    updateClass() {

        let field = this.currentModel;

        /** Required properties **/
        this.classList.add(field['size']);
        this.classList.add(field['border_type']);
        this.classList.add(field['label_type']);

        /** Optional properties **/
        if ( field['class'] ) {
            this.classList.add(field['class']);
        }

        if ( field['inline'] ) {
            this.classList.add('inline');
        }

        if ( field['no_min_width'] ) {
            this.classList.add('no_min_width');
        }

        if ( field['align_center'] ) {
            this.classList.add('align_center');
        }

        if ( field['hide_label'] ) {
            this.classList.add('no_label');
        }

        if ( !field['validation'] && !field['comment_message'] ) {
            this.classList.add('no_comment');
        }

        if ( field['icon'] && field['field_type'] !== 'textarea' ) {
            this.classList.add('with_icon');
        } else if ( field['field_type'] === 'media' ) {
            this.classList.add('with_icon');
        }

    }

    render() {

        let field = this.currentModel;

        if ( field['field_type'] !== 'wp_editor' ) {
            return this.base( field );
        } else {
            return wpEditor( field );
        }

    }

    base( field ) {
        let buffer = ``;
        buffer += `<span class="label">${ field['label'] }</span>`;
        buffer += `<div class="area NiceFieldArea">`;

        if ( field['field_type'] === 'regular' ) {
            buffer += this.regular();
        }

        buffer += `</div>`;
        if ( field['validation'] !== 'false' ) {
            buffer += `<span class="error_message">${ field['error_message'] }</span>`;
            if ( field['success_message'] ) {
                buffer += `<span class="success_message">${ field['success_message'] }</span>`;
            }
        }
        return buffer;
    }

    regular() {
        let field = this.currentModel;

        return `
        <span 
            class="input ${ field['field_class'] }"
            contenteditable="true"
            spellcheck="${ field['spellcheck'] }"
            data-type="${ field['type'] }"
            data-name="${ field['name'] }"
            data-validation="${ field['validation'] }"
            data-placeholder="${ field['placeholder'] }"
            data-required="${ field['required'] }"
            onpaste="Nice.field.pastePlain(event);"
            ${ validateHandlers( field ) }
        >${ field['value'] }</span>
                    
                    
        ${ fieldIcon( field ) }
    
        ${ validateIcons( field['validation'] ) }
    `;
    }



}

