export function handlePickers( area = document, selectors ) {

    if ( typeof selectors === 'undefined' ) {
        selectors = {};

        selectors['date-selector'] = '.DatePicker';
    }

    handleDatePicker( area, selectors['date-selector'] );
    /** ToDo Add Color Picker and others **/

}

export function handleDatePicker( area = document, selector = '.DatePicker', callback ) {

    let fields = jQuery( area ).find( selector );
    let date = {
        minDate: new Date()
    };
    let data = Object.assign({}, date, callback);
    fields.each(function () {
        jQuery( this ).datepicker(data);
    });

}
export function handleDateBirthdayPicker( area = document, selector = '.DatePicker', callback ) {

    let fields = jQuery( area ).find( selector );
    fields.each(function () {
        jQuery( this ).datepicker(callback);
    });

}