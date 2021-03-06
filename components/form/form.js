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

        if ( this.tagName.toLowerCase() === 'nice-checkbox' ) {
            data_name = this.name();
            data_value = this.isChecked();
        }

        /** This part is for textarea **/
        else if ( field.is('textarea') ) {

            if ( field.parents('nice-wp_editor').length > 0 ) {
                let wp_editor = field.parents('nice-wp_editor')[0];
                data_name = wp_editor.getName();
                data_value = wp_editor.getValue();
            } else {
                data_name = field.attr('name');                                                                         // Take key from textarea name attribute
                data_value  = field.val();
            }
                                                                                                                        // Take value from textarea
        }

        /** This part is for NiceFields based on contenteditable="true" elements with data attributes **/
        else {

            data_type = field.attr('data-type');

            if (                                                                                                         // This types store value in data attribute
                data_type === 'checkbox' ||
                data_type === 'bool'
            ) {
                data_name = field.attr('data-name');                                                                     // Take key from field data-name attribute
                data_value  = field.attr('data-value');                                                                  // Take val from field data-value attribute
            }

            if ( data_type === 'select' ) {

                let select_type = field.attr('data-select_type');

                if ( select_type === 'single' ) {
                    data_name = field.attr('data-name');                                                                     // Take key from field data-name attribute
                    data_value  = field.attr('data-value');
                } else if ( select_type === 'multiple' ) {

                    data_name = field.attr('data-name');
                    let field_cont = field.parents('.nice_field');
                    let list_elements = field_cont.find('.selection_list__element');
                    let data_format = field.attr('data-data_format');

                    if ( data_format === 'array' ) {
                        data_value = [];
                        list_elements.each(function() {
                            if ( jQuery(this).hasClass('checked') ) {
                                data_value.push( jQuery(this).attr('data-value') );
                            }
                        });
                    }

                    else if ( data_format === 'object' ) {
                        data_value = {};
                        list_elements.each(function() {
                            if ( jQuery(this).hasClass('checked') ) {
                                data_value[jQuery(this).attr('data-name')] = jQuery(this).attr('data-value')
                            }
                        });
                    }

                    else if ( data_format === 'binary_map' ) {
                        data_value = {};
                        list_elements.each(function() {
                            data_value[jQuery(this).attr('data-value')] = jQuery(this).hasClass('checked');
                        });
                    }

                    else if ( data_format === 'map' ) {
                        data_value = {};
                        list_elements.each(function() {

                            data_value[jQuery(this).attr('data-name')] = {
                                'name': jQuery(this).attr('data-name'),
                                'text': jQuery(this).find('.selection_list__element_text').html(),
                                'icon': jQuery(this).find('.selection_list__element_icon').html(),
                                'value': jQuery(this).attr('data-value'),
                            };

                            data_value[jQuery(this).attr('data-name')]['checked'] = jQuery(this).hasClass('checked');

                        });
                    }

                }
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
                if ( field.parents('nice-wp_editor').length > 0 ) {
                    let wp_editor = field.parents('nice-wp_editor')[0];
                    data_name = wp_editor.getName();
                    data_value = wp_editor.getValue();
                } else {
                    data_name = field.attr('name');                                                                              // Take key from textarea name attribute
                    data_value  = field.val();
                }
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

export function collectFlatData( selector = '.input', formSelector = document ) {

    let data = []; // Prepare empty array for data
    let data_value, data_type, field;

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
                data_value  = field.val();                                                                               // Take val from input
            } else if (
                data_type === 'checkbox' ||
                data_type === 'radio'
            ) {
                if ( field.is(':checked') ) {                                                                            // Take value only if checked
                    data_value  = field.val();                                                                           // Take val from input
                }
            }

        }

        /** This part is for textarea **/
        else if ( field.is("textarea") ) {
            data_value  = field.val();                                                                                   // Take value from textarea

        }

        /** This part is for NiceFields based on contenteditable="true" elements with data attributes **/
        else {

            data_type = field.attr('data-type');

            if (                                                                                                         // This types store value in data attribute
                data_type === 'checkbox' ||
                data_type === 'bool'
            ) {
                data_value  = field.attr('data-value');                                                                  // Take val from field data-value attribute
            }

            if ( data_type === 'select' ) {

                let select_type = field.attr('data-select_type');

                if ( select_type === 'single' ) {
                    data_value  = field.attr('data-value');
                } else if ( select_type === 'multiple' ) {

                    let field_cont = field.parents('.nice_field');
                    let list_elements = field_cont.find('.selection_list__element');
                    let data_format = field.attr('data-data_format');

                    if ( data_format === 'array' ) {
                        data_value = [];
                        list_elements.each(function() {
                            if ( jQuery(this).hasClass('checked') ) {
                                data_value.push( jQuery(this).attr('data-value') );
                            }
                        });
                    }

                    else if ( data_format === 'object' ) {
                        data_value = {};
                        list_elements.each(function() {
                            if ( jQuery(this).hasClass('checked') ) {
                                data_value[jQuery(this).attr('data-name')] = jQuery(this).attr('data-value')
                            }
                        });
                    }

                    else if ( data_format === 'binary_map' ) {
                        data_value = {};
                        list_elements.each(function() {
                            data_value[jQuery(this).attr('data-value')] = jQuery(this).hasClass('checked');
                        });
                    }

                    else if ( data_format === 'map' ) {
                        data_value = {};
                        list_elements.each(function() {

                            data_value[jQuery(this).attr('data-name')] = {
                                'name': jQuery(this).attr('data-name'),
                                'text': jQuery(this).find('.selection_list__element_text').html(),
                                'icon': jQuery(this).find('.selection_list__element_icon').html(),
                                'value': jQuery(this).attr('data-value'),
                            };

                            data_value[jQuery(this).attr('data-name')]['checked'] = jQuery(this).hasClass('checked');

                        });
                    }

                }
            }

            else if ( data_type === 'text' ) {                                                                           // This type store data in the html
                data_value  = field.html();
            }

            else if ( data_type === 'single_check') {                                                                    // This type data must be taken only if checked
                if ( field.hasClass('checked') ) {
                    data_value  = field.attr('data-value');
                }
            }
        }

        /** At this moment we have key => value pair, what we store in object **/
        data.push(data_value);

    });
    return data;
}