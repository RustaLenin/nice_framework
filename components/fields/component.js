import { wpEditor } from './fields_templates.js';
import { base, regular, validateHandlers, fieldIcon, validateIcons, previewBox, validateMediaHandlers } from './static.js';

/** Working on fields like web components
 * In progress
 **/

export class niceFieldComponent extends HTMLElement {

    defaultModel = {
        /** Core **/
        'name':           'name',
        'field_type':     'regular',                        // regular | textarea | wp_media | wp_editor | select_list
        'data_type':      'text',                           // text
        'required':       false,                            // true || false
        'field_class':    '',                               // any string
        'value':          '',                               // data
        'spellcheck':     false,                            // true || false
        'validation':     false,                            // false || func_name

        /** Required styling **/
        'size':           'medium',                         // tiny | small | medium | large
        'border_type':    'regular_border',                 // regular_border || bottom_border
        'label_type':     'above_border',                   // above_border || over_border

        /** Optional styling **/
        'class': '',                                        // string
        'hide_label':      false,                           // false || true
        'inline':          false,                           // false || true
        'no_min_width':    false,                           // false || true
        'align_center':    false,                           // false || true

        /** Text **/
        'label':           Nice._t('Really nice field'),    // text
        'placeholder':     Nice._t('Type some text'),       // text
        'error_message':   Nice._t('Enter valid data'),     // text
        'comment_message': '',                              // text
        'success_message': '',                              // text

        /** Icon **/
        'icon':            false,                           // false | icon - object | icon_id - string
        'icon_class':      '',                              // string

    };

    currentModel = {};

    constructor() {
        super();                                            // Make it first, cause we need access to this props and methods

        let dataString = this.getAttribute('data');
        let data =  isJson( dataString ) ? JSON.parse( dataString ) : eval( dataString );
        let listen = this.getAttribute('listen');

        this.initModel( data );

        if ( listen ) {
            let self = this;
            document.addEventListener( listen, function () {
                self.updateElem();
            });
        }
    }

    initModel( data = {} ){
        let newModel = {};
        Object.assign( newModel, this.defaultModel, data );

        if ( !newModel.validation ) { newModel.isValid = true }

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
            return base( field );
        } else {
            return wpEditor( field );
        }

    }

    updateValue() { this.currentModel.value = this.querySelector('.input').innerHTML }
    getValue() {  return this.currentModel.value; }
    isRequired() { return this.currentModel.required; }
    getIconData() { return this.currentModel.icon; }
    getIconElem() { return this.querySelector('.FieldIcon'); }
    isValid() { return this.currentModel.isValid }

}

