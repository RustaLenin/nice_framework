export const fields_templates = {
    'regular': regularField,
    'vanilla': vanillaField,
    'select_list': selectField,
    'media': mediaField,
    'textarea': textArea,
};

export function baseField(field) {
    return `
        <div 
            class="nice_field NiceField ${field['class']} ${field['size']} ${field['border_type']} ${field['label_type']} ${fieldClass(field)}
            ">
            
               ${ field['show_label'] ? fieldLabel(field) : '' }
                
                <div class="area NiceFieldArea">
                    ${ fields_templates[field['field_type']](field) }
                </div>
                
                ${ validateText(field) }
                
        </div>
`;
}

export function regularField(field) {
    return `
    <span 
        class="input ${ field['field_class'] }"
        contenteditable="${ field['editable'] ? 'true' : 'false'}"
        spellcheck="${ field['spellcheck'] }"
        data-type="${ field['type'] }"
        data-error-text="${ field['error_message'] }"
        data-name="${ field['name'] }"
        data-validation="${ field['validation'] }"
        data-placeholder="${ field['placeholder'] }"
        data-valid_count="${ field['valid_count'] ? field['valid_count'] : '' }"
        data-required="${ field['required'] }"
        onpaste="${ field['paste_chat'] ? 'Nice.field.pastePlainChat(event);' : 'Nice.field.pastePlain(event);' }"
        ${ validateHandlers(field) }
    >${ typeof(field['value']) !== 'undefined' ? field['value'] : ''  }</span>
                    
                    
        ${ fieldIcon(field) }
    
        ${ validateIcons(field['validation']) }
    `;
}

export function vanillaField(field) {
    if (field['type'] === 'textarea') {
        return `<textarea name="${ field['name'] }"  placeholder="${ field['placeholder'] }" class="input ${ field['field_class'] }" cols="30" rows="5">${ field['value'] }</textarea>`
    } else {
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
        value="${ typeof(field['value']) !== 'undefined' ? field['value'] : ''  }"
    >
    
    ${ fieldIcon(field) }
    
    ${ validateIcons(field['validation']) }
    `;
    }

}

export function textArea(field) {
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

export function wpEditor(field) {
    return `
        <nice-wp_editor
            editor-id="${ field['id'] ? field['id'] : '' }"
            name="${ field['name'] ? field['name'] : '' }"
        >${ field['value'] ? field['value'] : '' }
        </nice-wp_editor>
    `;
}

export function mediaField(field) {
    return `
    

        <span
            class="input MediaField  ${ field['field_class'] }"
            contenteditable="true"
            spellcheck="${ field['spellcheck'] }"
            data-type="${ field['type'] }"
            data-name="${ field['name'] }"
            data-validation="${ field['validation'] }"
            data-placeholder="${ field['placeholder'] }"
            data-required="${ field['required'] }"
            ${ validateMediaHandlers(field) }
        >${ field['value'] }</span>  
          <span class="preview_box preview_el ${field['value'] ? `preview` : `` }"
            onclick="lightbox.view( this.querySelector('.preview_img').getAttribute('src') );">
            ${ Nice.svg({'id': 'blind', 'class': 'preview_box__icon'}) }
            <img class="preview_img" src="${ field['value'] }">
        </span>
        <span class="preview_box" onclick="Nice.pickers.media( this, event );">
        <nice-svg svg-id="${field['value'] ? `edit` : `add_image`}" svg-size="${field['size']}"  class="add_icon_box" ></nice-svg>
        </span>

        ${ validateIcons(field['validation']) }
    `;
}

export function selectField(field) {
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
                    data-nothing="${ field['data-nothing'] }"
                     
                    data-data_format="${ field['data_format'] }"
                    data-can_be_empty="${ field['can_be_empty'] === true ? `true` : `false` }"
                           ${ validateSelectHandlers(field) }
                    ${ field['editable'] ? `oninput="Nice.field.searchList(this)" contenteditable="true" onpaste="Nice.field.pastePlain(event);"` : `contenteditable="false"` }
            > ${ field['content'] ? field['content'] : field['label'] }
            </span>
            
            ${ Nice.svg({'id': 'arrow_down', 'size': 'micro', 'class': 'selector_arrow,SelectorArrow'}) } 

            ${ fieldIcon(field) }
            
        </div>
        
        <div class="selections_list SelectionsList ${ field['select_type'] }">
            
            ${ selectList(field) }
            
        
        </div>
`;
}

export function selectList(field) {

    let buffer = '';
    field['selections'].forEach(function (name, element) {
        buffer += selectElement(field, element);
    });
    return buffer;

}

export function selectElement(field, element) {
    return `
        <div
            class="selection_list__element ${selectElementClass(field, element)}"
            onclick="Nice.field.chooseThis(this)"
            data-value="${ element['value'] }"
            ${selectElementName(field, element)}
            ${selectElementColor(element)}
        >
            <span class="selection_list__element_icon">
                ${ Nice.svg(element['icon']) }
            </span>
            
            <span class="selection_list__element_text">${ element['text'] ? element['text'] : 'Something' }</span>
            
            ${selectElementChecks(field) }
            
        </div>
    `;
}

export function selectElementClass(field, element) {
    let string = '';
    if (field['select_type'] === 'single') {
        string += ' single';
        if (field['value'] === element['value']) {
            string += ' checked';
        }
    } else if (field['select_type'] === 'multiple') {
        if (element['checked']) {
            string += ' checked';
        }
    }
    if (element['blocked']) {
        string += ' blocked';
    }

    return string;
}

export function selectElementName(field, element) {
    if (element['name']) {
        return `data-name="${ element['name'] }"`
    }
}

export function selectElementColor(element) {
    if (element['color']) {
        return `style="border-left:2px solid ${ element['color'] }"`
    }
}

export function selectElementChecks(field) {
    if (field['checkboxes']) {
        return `
            <span class="selection_list__element_check">
                ${ Nice.svg({'id': 'check', 'size': field['size']}) }
            </span>`
    } else {
        return '';
    }
}


export function validateText(field) {

    let buffer = ``;

    if (field['validation'] || field['required']) {
        buffer += `<span class="error_message">${ field['error_message'] }</span>`;
        if (field['success_message']) {
            buffer += `<span class="success_message">${ field['success_message'] }</span>`;
        }
    }
    if (field['comment_message']) {
        buffer += `<span class="comment_message">${ field['comment_message'] }</span>`;
    }

    return buffer;
}

export function validateIcons(field) {
    if (field['validation'] || field['required']) {
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

export function fieldIcon(field) {
    if (field['icon']) {
        if (typeof field['icon'] === 'object') {
            return Nice.svg(field['icon']);
        } else if (typeof field['icon'] === 'string') {
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

export function validateHandlers(field) {
    if (field['validation'] || field['required']) {
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

export function validateMediaHandlers(field) {
    if (field['validation'] || field['required']) {
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

export function validateSelectHandlers(field) {
    return `
        onclick="this.closest('.nice_field').classList.remove('error', 'success');"
        `;
}

export function fieldClass(field) {

    let classString = '';

    if (field['inline']) {
        classString += 'inline ';
    }

    if (field['no_min_width']) {
        classString += 'no_min_width ';
    }

    if (field['align_center']) {
        classString += 'align_center ';
    }

    if (!field['show_label']) {
        classString += 'no_label ';
    }

    if (!field['validation'] && !field['comment_message']) {
        classString += ' no_comment';
    }

    if (field['icon'] && field['field_type'] !== 'textarea') {
        classString += 'with_icon ';
    }

    classString.slice(0, -1);

    return classString;

}

export function fieldLabel(field) {
    if (field['show_label']) {
        return `<span class="label">${ field['label'] }</span>`;
    }
}