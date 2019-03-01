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