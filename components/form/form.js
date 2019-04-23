export function renderForm( model = null, values = null ) {
    let formHtml = '';
    let data = {};

    if ( model ) {



        if ( model && values ) {
            data = Object.assign( model, values );
        } else {
            data = model;
        }

        jQuery.each( data, function ( key, field ) {
            if ( field['in_form'] ) {
                formHtml += Nice.field( field );
            }
        });
    }

    return formHtml;
}

export function getFieldValue( selector = '.input' ) {

    let
        value = null,
        field_cont = jQuery(selector),
        field_input = field_cont.find('.input')
    ;

    if ( field_input.is('input') || field_input.is("textarea") ) {
        value = field_input.val();
    }

    else {

        let data_type = field_input.attr('data-type');

        if (
            data_type === 'select' ||
            data_type === 'checkbox' ||
            data_type === 'bool'
        ) {
            value  = field_input.attr('data-value');
        }

        else if ( data_type === 'text' ) {
            value  = field_input.html();
        }

    }

    return value;
}

/**
 * Prepare data from all elements with special class selector
 * @param {string} selector - fields css selector
 * @param {string|object} formSelector - css selector for a form in which we search fields
 */


export function collectData( selector = '.input', formSelector = document ) {

    let data = {}; // Prepare empty object for data
    let data_name, data_value, data_type, field;

    jQuery(formSelector).find( selector ).each(function() {                                                              // Start iterating all fields

        field = jQuery(this);

        /** This part for getting values and store it in object for vanilla inputs**/
        if ( field.is('input') ) {

            data_type = field.attr('type');

            if (                                                                                                         // Certainly we need to add more types here later
                data_type === 'text'   ||
                data_type === 'email'  ||
                data_type === 'number' ||
                data_type === 'tel'    ||
                data_type === 'url'    ||
                data_type === 'password'
            ) {
                data_name = field.attr('name');                                                                          // Take key from input name attribute
                data_value  = field.val();                                                                               // Take val from input
            } else if (
                data_type === 'checkbox' ||
                data_type === 'radio'
            ) {
                if ( field.is(':checked') ) {                                                                            // Take value only if checked
                    data_name = field.attr('name');                                                                      // Take key from input name attribute
                    data_value  = field.val();                                                                           // Take val from input
                }
            }

        }

        /** This part is for textarea **/
        else if ( field.is("textarea") ) {
            data_name = field.attr('name');                                                                              // Take key from textarea name attribute
            data_value  = field.val();                                                                                   // Take value from textarea

        }

        /** This part is for NiceFields based on contenteditable="true" elements with data attributes **/
        else {

            data_type = field.attr('data-type');

            if (                                                                                                         // This types store value in data attribute
                data_type === 'select' ||
                data_type === 'checkbox' ||
                data_type === 'bool'
            ) {
                data_name = field.attr('data-name');                                                                     // Take key from field data-name attribute
                data_value  = field.attr('data-value');                                                                  // Take val from field data-value attribute
            }

            else if ( data_type === 'text' ) {                                                                           // This type store data in the html
                data_name = field.attr('data-name');
                data_value  = field.html();
            }

            else if ( data_type === 'single_check') {                                                                    // This type data must be taken only if checked
                if ( field.hasClass('checked') ) {
                    data_name = field.attr('data-name');
                    data_value  = field.attr('data-value');
                }
            }
        }

        /** At this moment we have key => value pair, what we store in object **/
        data[data_name] = data_value;

    });
    return data;
}

/**
 * Prepare data from all elements with special class selector if fields a valid
 * @param {string} selector - fields css selector
 * @param {string|object} formSelector - css selector for a form in which we search fields
 */
export function collectValidData( selector = '.input', formSelector = document ) {

    let data = {};
    let data_name, data_value, data_type, field;

    jQuery(formSelector).find( selector ).each(function() {

        field = jQuery( this );

        let container = field.parents('.NiceField');

        if ( container.hasClass('success') ) {

            /** This part for getting values and store it in object for vanilla inputs**/
            if ( field.is('input') ) {

                data_type = field.attr('type');

                if (                                                                                                     // Certainly we need to add more types here later
                    data_type === 'text'   ||
                    data_type === 'email'  ||
                    data_type === 'number' ||
                    data_type === 'tel'    ||
                    data_type === 'url'    ||
                    data_type === 'password'
                ) {
                    data_name = field.attr('name');                                                                      // Take key from input name attribute
                    data_value  = field.val();                                                                           // Take val from input
                } else if (
                    data_type === 'checkbox' ||
                    data_type === 'radio'
                ) {
                    if ( field.is(':checked') ) {                                                                        // Take value only if checked
                        data_name = field.attr('name');                                                                  // Take key from input name attribute
                        data_value  = field.val();                                                                       // Take val from input
                    }
                }

            }

            /** This part is for textarea **/
            else if ( field.is("textarea") ) {
                data_name = field.attr('name');                                                                          // Take key from textarea name attribute
                data_value  = field.val();                                                                               // Take value from textarea

            }

            /** This part is for NiceFields based on contenteditable="true" elements with data attributes **/
            else {

                data_type = field.attr('data-type');

                if (                                                                                                     // This types store value in data attribute
                    data_type === 'select' || 'checkbox' || 'bool'
                ) {
                    data_name = field.attr('data-name');                                                                 // Take key from field data-name attribute
                    data_value  = field.attr('data-value');                                                              // Take val from field data-value attribute
                }

                else if ( data_type === 'text' ) {                                                                       // This type store data in the html
                    data_name = field.attr('data-name');
                    data_value  = field.html();
                }

                else if ( data_type === 'single_check') {                                                                // This type data must be taken only if checked
                    if ( field.hasClass('checked') ) {
                        data_name = field.attr('data-name');
                        data_value  = field.attr('data-value');
                    }
                }
            }

            /** At this moment we have key => value pair, what we store in object **/
            data[data_name] = data_value;

        }

    });
    return data;
}