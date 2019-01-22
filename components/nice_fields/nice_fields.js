export function niceField( field ) {

    if ( !field )                     { field                     = {} }

    if ( !field['value'] )            { field['value']            = ''; }
    if ( !field['type'] )             { field['type']             = 'text'; }
    if ( !field['size'] )             { field['size']             = 'medium'; }
    if ( !field['class'] )            { field['class']            = ''; }
    if ( !field['required'] )         { field['required']         = 'false'; }
    if ( !field['field_class'] )      { field['field_class']      = ''; }
    if ( !field['field_type'] )       { field['field_type']       = 'regular'; }
    if ( !field['icon_class'] )       { field['icon_class']       = ''; }
    if ( !field['spellcheck'] )       { field['spellcheck']       = 'false'; }
    if ( !field['name'] )             { field['name']             = ''; }
    if ( !field['validation'] )       { field['validation']       = 'false'; }
    if ( !field['placeholder'] )      { field['placeholder']      = 'Type some text'; }
    if ( !field['label'] )            { field['label']            = 'Really nice field'; }
    if ( !field['error_message'] )    { field['error_message']    = 'Enter valid data'; }

    return  ejs.render( Nice.field.templates.field['field_type'], { 'field': field } )

}

export function regularField() {
    return `<div class="nice_field NiceField <%- field['class']; %> <%- field['size']; %>">

                <span class="label"><%- field['label']; %></span>
                <div class="area">
                    <span
                            class="input <%- field['field_class']; %>  <% if ( field['icon'] ) { %>with_icon<% } %>"
                            contenteditable="true"
                            spellcheck="<%- field['spellcheck']; %>"
                            data-type="<%- field['type']; %>"
                            data-name="<%- field['name']; %>"
                            data-validation="<%- field['validation']; %>"
                            data-placeholder="<%- field['placeholder']; %>"
                            data-required="<%- field['required']; %>"
                    ><%- field['value']; %></span>
                    <% if ( field['icon'] ) { %>
                        <span class="nice_svg <%- field['icon_class']; %> <%- field['size']; %>">
                        <svg><use href="#<%- field['icon']; %>"></use></svg>
                    </span>
                    <% } if ( field['validation'] != 'false' ) { %>
                        <span class="success_icon"><svg><use href="#check"></use></svg></span>
                        <span class="error_icon"><svg><use href="#close"></use></svg></span>
                    <% } %>
                </div>
                <% if ( field['validation'] !== 'false' ) { %>
                    <span class="error_message"><%- field['error_message']; %></span>
                <% } %>
            
            </div>`;
}

export function vanillaField() {
    return `<div class="nice_field NiceField <%- field['class']; %> <%- field['size']; %>">

                <span class="label"><%- field['label']; %></span>
                <div class="area">
                    <input
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
                        <span class="nice_svg <%- field['icon_class']; %> <%- field['size']; %>">
                        <svg><use href="#<%- field['icon']; %>"></use></svg>
                    </span>
                    <% } if ( field['validation'] !== 'false' ) { %>
                        <span class="success_icon"><svg><use href="#check"></use></svg></span>
                        <span class="error_icon"><svg><use href="#close"></use></svg></span>
                    <% } %>
                </div>
                <% if ( field['validation'] !== 'false' ) { %>
                    <span class="error_message"><%- field['error_message']; %></span>
                <% } %>
            
            </div>`;
}

export function mediaField() {
    return `<div class="nice_field NiceField <%- field['class']; %> <%- field['size']; %>">

                <span class="label"><%- field['label']; %></span>
                <div class="area">
                    <span
                            class="input MediaField <%- field['field_class']; %> with_icon"
                            contenteditable="true"
                            spellcheck="<%- field['spellcheck']; %>"
                            data-type="<%- field['type']; %>"
                            data-name="<%- field['name']; %>"
                            data-validation="<%- field['validation']; %>"
                            data-placeholder="<%- field['placeholder']; %>"
                            data-required="<%- field['required']; %>"
                    ><%- field['value']; %></span>
                    <span class="media_icon click_able MediaFieldButton nice_svg <%- field['icon_class']; %> <%- field['size']; %>">
                        <svg><use href="#add_image"></use></svg>
                    </span>
                    <% if ( field['validation'] != 'false' ) { %>
                        <span class="success_icon"><svg><use href="#check"></use></svg></span>
                        <span class="error_icon"><svg><use href="#close"></use></svg></span>
                    <% } %>
                </div>
                <% if ( field['validation'] !== 'false' ) { %>
                    <span class="error_message"><%- field['error_message']; %></span>
                <% } %>
            
            </div>`;
}