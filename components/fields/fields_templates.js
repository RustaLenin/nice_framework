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
        data-error-text="${ field['error_message'] }"
        data-name="${ field['name'] }"
        data-validation="${ field['validation'] }"
        data-placeholder="${ field['placeholder'] }"
        data-valid_count="${ field['valid_count'] ? field['valid_count'] : '' }"
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
        data-error-text="${ field['error_message'] }"
        placeholder="${ field['placeholder'] }"
        data-required="${ field['required'] }"
        autocomplete="${ field['autocomplete'] }"
        value="${ field['value'] }"
    >
    
    ${ fieldIcon( field ) }
    
    ${ validateIcons( field['validation'] ) }
    `;
}

export function textArea( field ) {
    return `
        <span 
            class="input textarea ${ field['field_class'] }"
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

export function wpEditor( field ) {
    return `
        <nice-wp_editor
            editor-id="${ field['id'] ? field['id'] : '' }"
            name="${ field['name'] ? field['name'] : '' }"
        >${ field['value'] ? field['value'] : '' }
        </nice-wp_editor>
    `;
}

export function mediaField( field ) {
    return `
        <span class="preview_box ${field['value'] ? `preview` : `` }"
            onclick="lightbox.view( this.querySelector('.preview_img').getAttribute('src') );">
            <img class="hack" src="data:image/jpeg;base64,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dFJpZ2h0bG9uZwAAAAAAAAALY3JvcFJlY3RUb3Bsb25nAAAAAAA4QklNA+0AAAAAABAASAAAAAEAAQBIAAAAAQABOEJJTQQmAAAAAAAOAAAAAAAAAAAAAD+AAAA4QklNBA0AAAAAAAQAAABaOEJJTQQZAAAAAAAEAAAAHjhCSU0D8wAAAAAACQAAAAAAAAAAAQA4QklNJxAAAAAAAAoAAQAAAAAAAAABOEJJTQP1AAAAAABIAC9mZgABAGxmZgAGAAAAAAABAC9mZgABAKGZmgAGAAAAAAABADIAAAABAFoAAAAGAAAAAAABADUAAAABAC0AAAAGAAAAAAABOEJJTQP4AAAAAABwAAD/////////////////////////////A+gAAAAA/////////////////////////////wPoAAAAAP////////////////////////////8D6AAAAAD/////////////////////////////A+gAADhCSU0EAAAAAAAAAgAAOEJJTQQCAAAAAAACAAA4QklNBDAAAAAAAAEBADhCSU0ELQAAAAAABgABAAAAAjhCSU0ECAAAAAAAEAAAAAEAAAJAAAACQAAAAAA4QklNBB4AAAAAAAQAAAAAOEJJTQQaAAAAAANJAAAABgAAAAAAAAAAAAAAMgAAADIAAAAKAFUAbgB0AGkAdABsAGUAZAAtADEAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAADIAAAAyAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAEAAAAAAABudWxsAAAAAgAAAAZib3VuZHNPYmpjAAAAAQAAAAAAAFJjdDEAAAAEAAAAAFRvcCBsb25nAAAAAAAAAABMZWZ0bG9uZwAAAAAAAAAAQnRvbWxvbmcAAAAyAAAAAFJnaHRsb25nAAAAMgAAAAZzbGljZXNWbExzAAAAAU9iamMAAAABAAAAAAAFc2xpY2UAAAASAAAAB3NsaWNlSURsb25nAAAAAAAAAAdncm91cElEbG9uZwAAAAAAAAAGb3JpZ2luZW51bQAAAAxFU2xpY2VPcmlnaW4AAAANYXV0b0dlbmVyYXRlZAAAAABUeXBlZW51bQAAAApFU2xpY2VUeXBlAAAAAEltZyAAAAAGYm91bmRzT2Jq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cGhvdG9zaG9wLzEuMC8iIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAxOS0wNi0wN1QyMTowMToxMSswMzowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOS0wNi0wN1QyMTowMToxMSswMzowMCIgeG1wOk1vZGlmeURhdGU9IjIwMTktMDYtMDdUMjE6MDE6MTErMDM6MDAiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6ZGI0MTQyMWMtNjdmNi1kMzQ1LTk5MGQtM2M2MmJkNzYwMjY4IiB4bXBNTTpEb2N1bWVudElEPSJhZG9iZTpkb2NpZDpwaG90b3Nob3A6ODExYzc2ZjQtY2Q4MS02YjRmLWI4MjMtMWFmYjViODkxNDhmIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6N2RjOGIwNzAtN2FkNS01NTQyLWEzMTMtYWIxZDczNDgzZGQzIiBkYzpmb3JtYXQ9ImltYWdlL2pwZWciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjdkYzhiMDcwLTdhZDUtNTU0Mi1hMzEzLWFiMWQ3MzQ4M2RkMyIgc3RFdnQ6d2hlbj0iMjAxOS0wNi0wN1QyMTowMToxMSswMzowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTggKFdpbmRvd3MpIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDpkYjQxNDIxYy02N2Y2LWQzNDUtOTkwZC0zYzYyYmQ3NjAyNjgiIHN0RXZ0OndoZW49IjIwMTktMDYtMDdUMjE6MDE6MTErMDM6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE4IChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPD94cGFja2V0IGVuZD0idyI/Pv/uACFBZG9iZQBkAAAAAAEDABADAgMGAAAAAAAAAAAAAAAA/9sAhAAGBAQEBQQGBQUGCQYFBgkLCAYGCAsMCgoLCgoMEAwMDAwMDBAMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMAQcHBw0MDRgQEBgUDg4OFBQODg4OFBEMDAwMDBERDAwMDAwMEQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wgARCAAyADIDAREAAhEBAxEB/8QAXQABAQAAAAAAAAAAAAAAAAAAAAgBAQAAAAAAAAAAAAAAAAAAAAAQAQAAAAAAAAAAAAAAAAAAAFARAQAAAAAAAAAAAAAAAAAAAFASAQAAAAAAAAAAAAAAAAAAAFD/2gAMAwEBAhEDEQAAAKpAAAAAAAAAAAAAAAAAAAAAAAAP/9oACAECAAEFAEf/2gAIAQMAAQUAR//aAAgBAQABBQBH/9oACAECAgY/AEf/2gAIAQMCBj8AR//aAAgBAQEGPwBH/9k=">
            ${ Nice.svg({'id': 'blind', 'class': 'preview_box__icon'}) }
            <img class="preview_img" src="${ field['value'] }">
        </span>

        <span
            class="input MediaField ${ field['field_class'] }"
            contenteditable="true"
            spellcheck="${ field['spellcheck'] }"
            data-type="${ field['type'] }"
            data-name="${ field['name'] }"
            data-validation="${ field['validation'] }"
            data-placeholder="${ field['placeholder'] }"
            data-required="${ field['required'] }"
            ${ validateMediaHandlers(field) }
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
                     ${ field['value'] ? '' :  'data-nothing="true"'}
                    data-data_format="${ field['data_format'] }"
                    data-can_be_empty="${ field['data_format'] ? `true` : `false` }"
                           ${ validateSelectHandlers( field ) }
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
        if (!field['hide_checkbox']) {
            return `
            <span class="selection_list__element_check">
                ${ Nice.svg({'id': 'check', 'size': field['size']}) }
            </span>`
    } else{
        return '';
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

export function validateMediaHandlers( field ) {
    if ( field['validation'] ) {
        return `
        oninput="Nice.field.delayValidate(this); this.closest('.nice_field').classList.remove('error', 'success');Nice.field.updateMediaField(this);"
        onfocus="Nice.field.delayValidate(this); this.closest('.nice_field').classList.remove('error', 'success');Nice.field.updateMediaField(this);"
        onfocusout="Nice.field.validate(this); Nice.field.updateMediaField(this);"
        onpaste="Nice.field.pastePlain(event); Nice.field.validate(this); Nice.field.updateMediaField(this);"
        `;
    } else {
        return 'onpaste="Nice.field.pastePlain(event); Nice.field.updateMediaField(this);"';
    }
}

export function validateSelectHandlers( field ) {
    return `
        onclick="this.closest('.nice_field').classList.remove('error', 'success');"
        `;
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

    if ( !field['show_label'] ) {
        classString += 'no_label ';
    }

    if ( !field['validation'] && !field['comment_message'] ) {
        classString += ' no_comment';
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