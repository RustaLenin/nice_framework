import { debounce } from '../logic_patterns/logic.js'

export const delayFieldValidation = debounce( fieldValidation, 1200 );

export const validationTypes = {
    'email':    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    'login':    /^[-a-zA-Z0-9]+$/,
    'currency': /^[A-Z]{3,6}$/,
    'int':      /^[0-9]*$/,
    'ddmmyyyy': /^([0-3][0-9])[\.\-\\\/]([0-1][0-9])[\.\-\\\/]([0-9]{2,4})$/,
    'mmddyyyy': /^([0-1][0-9])[\.\-\\\/]([0-3][0-9])[\.\-\\\/]([0-9]{2,4})$/,
    'hex':      /^(#)[0-9a-fA-F]{6,8}$/,
    'url':      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{1,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
    'img_url':  /^(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))$/,
    'phone':    /^[-0-9()+]*$/
};

export function isCurrency( val ) {
    return Nice.validation.types['currency'].test( val );
}

export function isImgUrl( val ) {
    return Nice.validation.types['img_url'].test( val );
}

export function isUrl( val ) {
    return Nice.validation.types['url'].test( val );
}

export function isHex( val ) {
    return Nice.validation.types['hex'].test( val );
}

export function isDate( val ) {

    let isDmy = Nice.validation.types['ddmmyyyy'].test( val );
    let isMdy = Nice.validation.types['mmddyyyy'].test( val );

    if ( isDmy || isMdy ) {

        let first_part = parseInt( val.substring( 0, 2 ) );
        let second_part = parseInt( val.substring( 3, 5 ) );


        if ( isDmy ) {

            return ( first_part < 32 && second_part < 13 )

        }

        if ( isMdy ) {
            return ( first_part < 13 && second_part < 32 )
        }


    } else {
        return false
    }
}

export function isInt( val ) {
    if ( val.length > 0 ) {
        return Nice.validation.types['int'].test( val );
    } else {
        return false
    }

}

export function isPhone( val ) {
    if ( val.length > 0 ) {
        return Nice.validation.types['phone'].test( val );
    } else {
        return false
    }
}

export function isValidEmail( val ) {
    return Nice.validation.types['email'].test( val );
}

export function isValidLogin( val ) {

    if ( val.length > 1 ) {
        return Nice.validation.types['login'].test( val );
    } else {
        return false;
    }

}

export function isNotEmpty( val ) {

    if ( typeof val === 'undefined' ) {
        return false
    } else {
        return val.length > 1;
    }

}

export function fieldValidation( Validate ) {

    let container = Validate.field.parents('.NiceField');
    container.removeClass('error success');

    let value;
    if ( Validate.field.is( 'input') ) {
        value = Validate.field.val();
    } else {
        value = Validate.field.html();
    }

    let fn = Nice.validation[Validate['type']];

    if ( typeof  fn !== 'function' ) {
        console.log('No such validation function');
    } else {

        let ValidateResult = fn( value );

        if ( ValidateResult ) {
            container.addClass('success');
        } else {
            container.addClass('error');
        }

    }

}

export function HandleFieldsValidate( selector ) {

    let inputs = jQuery( selector ).find('.input');

    inputs.each( function () {

        let ThisField = jQuery( this );
        let ValidType = ThisField .attr('data-validation');

        if ( ValidType && ValidType !== 'false' ) {

            ThisField.on( 'input', function () {
                ThisField.parents('.NiceField').removeClass('error');
                delayValidateField({
                    'field': ThisField,
                    'type': ValidType
                });
            });

            ThisField.on( 'change', function () {
                ThisField.parents('.NiceField').removeClass('error');
                delayValidateField({
                    'field': ThisField,
                    'type': ValidType
                });
            });

            ThisField.on( 'DOMSubtreeModified', function () {
                delayValidateField({
                    'field': ThisField,
                    'type': ValidType
                });
            });

            ThisField.on( 'focusin', function () {
                delayValidateField({
                    'field': ThisField,
                    'type': ValidType
                });
            });

            ThisField.on( 'focusout', function () {
                vField({
                    'field': ThisField,
                    'type': ValidType
                });
                setTimeout( function () {
                    ThisField.parents('.NiceField').removeClass('error');
                }, 1000 )
            });

            ThisField.on( 'paste', function () {
                vField({
                    'field': ThisField,
                    'type': ValidType
                });
                setTimeout( function () {
                    ThisField.parents('.NiceField').removeClass('error');
                }, 1000 )
            });

        }
    });

}

export function RunFieldsValidate( selector ) {

    let input = jQuery( selector ).find('.input');

    input.each( function () {

        let ThisField = jQuery( this );
        let ValidType = ThisField .attr('data-validation');

        if ( ValidType && ValidType !== 'false' ) {

            vField({
                'field': ThisField,
                'type': ValidType
            });
        }
    });

}