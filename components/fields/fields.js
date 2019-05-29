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
        field['placeholder'] = 'Type some text'
    }
    if (!(field['label'])) {
        field['label'] = 'Really nice field'
    }
    if (!(field['error_message'])) {
        field['error_message'] = 'Enter valid data'
    }
    if (!(field['show_label'])) {
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
    return ejs.render(baseField(), {'field': field})

}

export function baseField() {
    return `<div class="nice_field NiceField <%- field['class']; %> <%- field['size']; %> <%- field['border_type']; %> <%- field['label_type']; %>  <% if ( field['no_min_width'] ) { %>no_min_width<% } %> <% if ( field['align_center'] ) { %>align_center<% } %> <% if ( field['icon'] ) { %>with_icon<% } %>">
                <span class="label"><%- field['label']; %></span>
                <div class="area NiceFieldArea">
                <%-  ejs.render( Nice.field.templates[field['field_type']](), { 'field': field }) %>
                </div>
                <% if ( field['validation'] !== 'false' ) { %>
                <span class="error_message"><%- field['error_message']; %></span>
                <% } %>
            </div>`;
}

export function regularField() {
    return `     <span  class="input <%- field['field_class']; %>"
                            contenteditable="true"
                            spellcheck="<%- field['spellcheck']; %>"
                            data-type="<%- field['type']; %>"
                            data-name="<%- field['name']; %>"
                            data-validation="<%- field['validation']; %>"
                            data-placeholder="<%- field['placeholder']; %>"
                            data-required="<%- field['required']; %>"
                            onpaste="Nice.field.pastePlain(e);"
                    ><%- field['value']; %></span>
                    <% if ( field['icon'] ) { %>
                    <nice-svg svg-id="<%- field['icon']; %>" svg-class=" <%- field['icon_class']; %>" svg-size="<%- field['size']; %>"></nice-svg> 
                    <% } if ( field['validation'] != 'false' ) { %>
                        <span class="success_icon"><svg><use href="#check"></use></svg></span>
                        <span class="error_icon"><svg><use href="#close"></use></svg></span>
                    <% } %>`;
}

export function vanillaField() {
    return `<input
                            class="input <%- field['field_class']; %>  <% if ( field['icon'] ) { %>with_icon<% } %>"
                            spellcheck="<%- field['spellcheck']; %>"
                            type="<%- field['type']; %>"
                            name="<%- field['name']; %>"
                            data-validation="<%- field['validation']; %>"
                            placeholder="<%- field['placeholder']; %>"
                            data-required="<%- field['required']; %>"
                            value="<%- field['value']; %>"
                    >
                    <% if ( field['icon'] ) { %>
                  <span class="field_icon FieldIcon">
                      <nice-svg svg-id="<%- field['icon']; %>" svg-class="<%- field['icon_class']; %>" svg-size="<%- field['size']; %>"></nice-svg> 
                   </span>
                    <% } if ( field['validation'] !== 'false' ) { %>
                        <span class="success_icon"><svg><use href="#check"></use></svg></span>
                        <span class="error_icon"><svg><use href="#close"></use></svg></span>
                    <% } %>
        `;
}

export function selectField() {
    return `
<div class="head_wrapper" onclick="Nice.field.toggleSelector( this )">

    <span
            class="input <%- field['field_class'] %>"
            <% if (field['editable']) {
                contenteditable = "true"
            } else {
                contenteditable = "false"
            } %>
            spellcheck="<%- field['spellcheck'] %>"
            data-type="select"
            data-name="<%- field['name'] %>"
            data-value="<%- field['value'] %>"
            data-validation="<%- field['validation'] %>"
            data-placeholder="<%- field['placeholder'] %>"
            data-required="<%- field['required'] %>"
            data-callback="<%- field['callback'] %>"
            data-select_type="<%- field['select_type'] %>"
            data-data_format="<%- field['data_format'] %>"
    <% if ( field['editable'] ) { %>
            oninput="Nice.field.searchList(this)"
            <% } %>

    >
        <% if ( field['content'] ) { %>
            <%- field['content'] %>
        <% }  else if(field['label']) { %>
            <%- field['label'] %>
        <% } %>
    </span>

    <span class="selector_arrow SelectorArrow">
        <%- Nice.svg({'id': 'arrow_down', 'size': 'micro'}); %>
    </span>

    <span class="field_icon FieldIcon">
        <%- Nice.svg(field['icon']); %>
    </span>

</div>

<div class="selections_list SelectionsList <%- field['select_type'] %>">

    <% jQuery.each(field['selections'], function (i, element) { %>

        <div
                class="selection_list__element <% if (field['value'] === element['value']) {
                    ' checked'
                } %>"
                onclick="Nice.field.chooseThis(this)"
                data-value="<%- element['value'] %>"
        <% if ( element['name'] ) { %>
                data-name="<%- element['name'] %>"
                <% } %>
        <% if ( element['color'] ) { %>
                style="border-left:3px solid <% element['color'] %> "
                <% } %>
        >
            <span class="selection_list__element_icon">
                <%- Nice.svg(element['icon']); %>
            </span>

            <span class="selection_list__element_text"><%- element['text'] %></span>

            <% if ( field['checkboxes'] ) { %>
                <span class="selection_list__element_check">
                    <%- Nice.svg( { 'id': 'check', 'size': field['size'] } ); %>
                </span>
            <% } %>

        </div>

    <% }); %>

</div>
`;
}

export function mediaField() {
    return `<span
                            class="input MediaField <%- field['field_class']; %> with_icon"
                            contenteditable="true"
                            spellcheck="<%- field['spellcheck']; %>"
                            data-type="<%- field['type']; %>"
                            data-name="<%- field['name']; %>"
                            data-validation="<%- field['validation']; %>"
                            data-placeholder="<%- field['placeholder']; %>"
                            data-required="<%- field['required']; %>"
                    ><%- field['value']; %></span>
                    <nice-svg svg-id="add_image" svg-class="media_icon click_able MediaFieldButton <%- field['icon_class']; %>" svg-size="<%- field['size']; %>"></nice-svg> 
                    <% if ( field['validation'] != 'false' ) { %>
                        <span class="success_icon"><svg><use href="#check"></use></svg></span>
                        <span class="error_icon"><svg><use href="#close"></use></svg></span>
                    <% } %>
        `;
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
    let plain_text = (e.originalEvent || e).clipboardData.getData('text/plain');
    if (typeof plain_text !== 'undefined') {
        document.execCommand('insertText', false, plain_text);
    }
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