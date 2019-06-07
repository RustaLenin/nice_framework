export const fields_templates = {
    'regular': regularField,
    'vanilla': vanillaField,
    'select_list': selectField,
    'media': mediaField,
    'textarea': textArea,
};

export function baseField( field ) {
    return `
        <div 
            class="nice_field NiceField ${field['class']} ${field['size']} ${field['border_type']} ${field['label_type']} ${fieldClass(field)}
            ">
            
               ${ fieldLabel( field ) }
                
                <div class="area NiceFieldArea">
                    ${ fields_templates[field['field_type']](field) }
                </div>
                
                ${ validateText( field ) }
                
        </div>
`;
}

export function regularField( field ) {
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

export function vanillaField( field ) {
    return `
    <input
        class="input ${ field['field_class'] }"
        spellcheck="${ field['spellcheck'] }"
        type="${ field['type'] }"
        name="${ field['name'] }"
        data-validation="${ field['validation'] }"
        placeholder="${ field['placeholder'] }"
        data-required="${ field['required'] }"
        value="${ field['value'] }"
    >
    
    ${ fieldIcon( field ) }
    
    ${ validateIcons( field['validation'] ) }
    `;
}

export function textArea( field ) {
    return `
        <span 
            class="input ${ field['field_class'] }"
            contenteditable="true"
            spellcheck="${ field['spellcheck'] }"
            data-type="text"
            data-name="${ field['name'] }"
            data-placeholder="${ field['placeholder'] }"
            data-required="${ field['required'] }"
            onpaste="Nice.field.pastePlain(event);"
        >${ field['value'] }</span>
    `;
}

export function mediaField( field ) {
    return `
        <span
            class="input MediaField ${ field['field_class'] }"
            contenteditable="true"
            spellcheck="${ field['spellcheck'] }"
            data-type="${ field['type'] }"
            data-name="${ field['name'] }"
            data-validation="${ field['validation'] }"
            data-placeholder="${ field['placeholder'] }"
            data-required="${ field['required'] }"
            onpaste="Nice.field.pastePlain(event);"
        >${ field['value'] }</span>
        
        ${ Nice.svg({
            'id': 'add_image',
            'class': ['field_icon', 'FieldIcon' ],
            'size': field['size'],
            'onclick': 'Nice.pickers.media( this, event );',
            'click_able': true,
        }) }

        ${ validateIcons( field['validation'] ) }
    `;
}

export function selectField( field ) {
    console.log( field );
    return `
        <div class="head_wrapper" onclick="Nice.field.toggleSelector( this )">
        
            <span
                    class="input ${ field['field_class'] }"
                    contenteditable="${ field['editable'] ? 'true' : 'false' }"
                    spellcheck="${ field['spellcheck'] }"
                    data-type="select"
                    data-name="${ field['name'] }"
                    data-value="${ field['value'] }"
                    data-validation="${ field['validation'] }"
                    data-placeholder="${ field['placeholder'] }"
                    data-required="${ field['required'] }"
                    data-callback="${ field['callback'] }"
                    data-select_type="${ field['select_type'] }"
                    data-data_format="${ field['data_format'] }"
                    data-can_be_empty="${ field['data_format'] ? `true` : `false` }"
                    ${ field['editable'] ? `oninput="Nice.field.searchList(this)" contenteditable="true" onpaste="Nice.field.pastePlain(event);"` : `contenteditable="false"` }
            > ${ field['content'] ? field['content'] : field['label'] }
            </span>
            
            ${ Nice.svg( {'id': 'arrow_down', 'size': 'micro', 'class': 'selector_arrow,SelectorArrow' } ) } 

            ${ fieldIcon( field ) }
            
        </div>
        
        <div class="selections_list SelectionsList ${ field['select_type'] }">
            
            ${ selectList( field ) }
            
        
        </div>
`;
}

export function selectList( field ) {

    let buffer = '';
    field['selections'].forEach( function ( name, element ) {
        buffer += selectElement( field, element );
    });
    return buffer;

}

export function selectElement( field, element ) {
    return `
        <div
            class="selection_list__element ${selectElementClass( field, element )}"
            onclick="Nice.field.chooseThis(this)"
            data-value="${ element['value'] }"
            ${selectElementName( field, element )}
            ${selectElementColor(element)}
        >
            <span class="selection_list__element_icon">
                ${ Nice.svg( element['icon'] ) }
            </span>
            
            <span class="selection_list__element_text">${ element['text'] }</span>
            
            ${selectElementChecks(field) }
            
        </div>
    `;
}

export function selectElementClass( field, element ) {
    let string = '';
    if ( field['select_type'] === 'single' ) {
        string += ' single';
        if ( field['value'] === element['value'] ) {
            string += ' checked';
        }
    } else if ( field['select_type'] === 'multiple' ) {
        if ( element['checked'] ) {
            string += ' checked';
        }
    }
    if ( element['blocked'] ) {
        string += ' blocked';
    }

    return string;
}

export function selectElementName( field, element ) {
    if ( element['name'] ) {
        return `data-name="${ element['name'] }"`
    }
}

export function selectElementColor( element ) {
    if ( element['color'] ) {
        return `style="border-left:2px solid ${ element['color'] }"`
    }
}

export function selectElementChecks( field ) {
    if ( field['checkboxes'] ) {
        return `
            <span class="selection_list__element_check">
                ${ Nice.svg( { 'id': 'check', 'size': field['size'] } ) }
            </span>`
    }
}


export function validateText( field) {
    if ( field['validation'] !== 'false' ) {
        return `
            <span class="error_message">${ field['error_message'] }</span>
        `;
    } else {
        return ``;
    }
}

export function validateIcons( field ) {
    if ( field['validation'] !== 'false' ) {
        return `
            ${ Nice.svg({
                'id': 'check',
                'class': 'success_icon'
            })}
            ${ Nice.svg({
                'id': 'close',
                'class': 'error_icon'
            })}
        `;
    } else {
        return ``;
    }
}

export function fieldIcon( field ) {
    if ( field['icon'] ) {
        if ( typeof field['icon'] === 'object' ) {
            return  Nice.svg( field['icon'] );
        } else if (  typeof field['icon'] === 'string' ) {
            return Nice.svg({
                        'id': field['icon'],
                        'class': field['icon_class'],
                        'size': field['size']
                    });
        } else {
            return ``;
        }
    } else {
        return ``;
    }
}

export function validateHandlers( field ) {
    if ( field['validation'] ) {
        return `
        oninput="Nice.field.delayValidate(this); this.closest('.nice_field').classList.remove('error', 'success');"
        onfocus="Nice.field.delayValidate(this); this.closest('.nice_field').classList.remove('error', 'success');"
        onfocusout="Nice.field.validate(this)"
        onpaste="Nice.field.pastePlain(event); Nice.field.validate(this);"
        `;
    } else {
        return 'onpaste="Nice.field.pastePlain(event);"';
    }
}

export function fieldClass( field ) {

    let classString = '';

    if ( field['inline'] ) {
        classString += 'inline ';
    }

    if ( field['no_min_width'] ) {
        classString += 'no_min_width ';
    }

    if ( field['align_center'] ) {
        classString += 'align_center ';
    }

    if ( field['icon'] && field['field_type'] !== 'textarea' ) {
        classString += 'with_icon ';
    } else if ( field['field_type'] === 'media' ) {
        classString += 'with_icon ';
    }

    classString.slice( 0, -1 );

    return classString;

}

export function fieldLabel( field ) {
    if ( field['show_label'] ) {
        return `<span class="label">${ field['label'] }</span>`;
    }
}