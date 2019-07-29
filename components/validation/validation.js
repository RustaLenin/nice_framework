import {debounce} from '../logic_patterns/logic.js'

export const delayFieldValidation = debounce(fieldValidation, 2400);
export const delayFieldRequired = debounce(fieldRequired, 2400);

export const validationTypes = {
    'email': /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    'login': /^[-a-zA-Z0-9 ]+$/,
    'latin': /^[a-zA-Z0-9 ]+$/,
    'title': /^[a-zA-Z0-9 \.\-\"\']+$/,
    'currency': /^[A-Z]{3,6}$/,
    'int': /^[0-9]*$/,
    'ddmmyyyy': /^([0-3][0-9])[\.\-\\\/]([0-1][0-9])[\.\-\\\/]([0-9]{2,4})$/,
    'mmddyyyy': /^([0-1][0-9])[\.\-\\\/]([0-3][0-9])[\.\-\\\/]([0-9]{2,4})$/,
    'hex': /^(#)[0-9a-fA-F]{6,8}$/,
    'url': /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{1,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
    'img_url': /^(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))$/,
    'phone': /^[-0-9()+]*$/,
    'time': /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/,
};

export function isCurrency(val) {
    return Nice.validation.types['currency'].test(val);
}
export function isTime(val) {
    return Nice.validation.types['time'].test(val);
}

export function isImgUrl(val) {
    return Nice.validation.types['img_url'].test(val);
}

export function isUrl(val) {
    return Nice.validation.types['url'].test(val);
}

export function isHex(val) {
    return Nice.validation.types['hex'].test(val);
}

export function isDate(val) {

    let isDmy = Nice.validation.types['ddmmyyyy'].test(val);
    let isMdy = Nice.validation.types['mmddyyyy'].test(val);

    if (isDmy || isMdy) {

        let first_part = parseInt(val.substring(0, 2));
        let second_part = parseInt(val.substring(3, 5));


        if (isDmy) {

            return (first_part < 32 && second_part < 13)

        }

        if (isMdy) {
            return (first_part < 13 && second_part < 32)
        }


    } else {
        return false
    }
}

export function isInt(val) {
    if (val.length > 0) {
        return Nice.validation.types['int'].test(val);
    } else {
        return false
    }

}

export function isPhone(val) {
    if (val.length > 0) {
        return Nice.validation.types['phone'].test(val);
    } else {
        return false
    }
}

export function isValidEmail(val) {
    return Nice.validation.types['email'].test(val);
}

export function isValidLogin(val) {

    if (val.length > 1) {
        return Nice.validation.types['login'].test(val);
    } else {
        return false;
    }

}

export function isValidLatin(val) {

    if (val.length > 1) {
        return Nice.validation.types['latin'].test(val);
    } else {
        return false;
    }

}

export function isValidTitle(val) {

    if (val.length > 1) {
        return Nice.validation.types['title'].test(val);
    } else {
        return false;
    }

}

export function isNotEmpty(val) {

    if (typeof val === 'undefined') {
        return false
    } else {
        return val.length > 1;
    }

}


export function maxCount(val, elem) {
    let count = parseInt(elem.getAttribute('data-valid_count'), 10);
    let value = parseInt(val, 10);
    if (value <= count) {
        return true;
    }

}

export function fieldValidation(input) {

    let container = input.closest('.NiceField');
    container.classList.remove('success', 'error');
    let validation = input.getAttribute('data-validation');
    let error_text = input.getAttribute('data-error-text');

    if (validation) {
        let value;
        if (dom.isInput(input)) {
            value = input.value;
        } else {
            value = input.innerHTML;
        }

        if (value === '') {

        } else {
            let fn = Nice.validation[validation];

            if (typeof fn !== 'function') {
                container.classList.add('error');
                if (container.closest('.error_message')) {
                    container.closest('.error_message').innerText = Nice._t('Unknown validation method');
                }
            } else {

                if (fn(value, input)) {
                    container.classList.add('success');
                } else {
                    container.classList.add('error');
                    if (container.querySelector('.error_message')) {
                        container.querySelector('.error_message').innerText = error_text;
                    }
                }

            }
        }
    }
}

export function fieldRequired(input) {

    let container = input.closest('.NiceField');
    let required = input.getAttribute('data-required');
    let type = input.getAttribute('data-type');
    if(required === 'true'){
        let value = '';
        if (dom.isInput(input)) {
            value = input.value;
        } else {
            value = input.innerHTML;
        }
        if (type === 'select' ) {
            let nothing = input.getAttribute('data-nothing');
            if (nothing === 'true' ) {
                container.classList.add('error');
                if (container.querySelector('.error_message')) {
                    container.querySelector('.error_message').innerText = 'Выберите элемент';
                }
            }
        }

        if (value === '') {
            container.classList.add('error');
            if (container.querySelector('.error_message')) {
                container.querySelector('.error_message').innerText = 'Введите данные';
            }
        }
    }

}

export function loopFieldValidation(elem) {
    console.log(elem)
    let el = document.querySelector(elem);
    let list = el.querySelectorAll('.input');
    list.forEach(
        function (currentValue) {
            let validation = currentValue.getAttribute('data-validation');
            if (validation && validation !== 'false') {
                fieldValidation(currentValue)
            }
        }
    );


}

export function loopFieldRequired(elem) {

    let el = document.querySelector(elem);
    let list = el.querySelectorAll('.input');
    list.forEach(
        function (currentValue) {
            let validation = currentValue.getAttribute('data-required');
            if (validation === 'true') {
                fieldRequired(currentValue)
            }
        }
    );


}

export function isValidForm(elem) {

    let el = document.querySelector(elem);
    let list = el.querySelectorAll('.NiceField');
    let check = true;
    list.forEach(
        function (currentValue) {
            let check_el = currentValue.classList.contains('error');
            if (check_el) {
                check = false;
            }
        }
    );
    console.log(check)
    return check;
}

// Old version of function writed in jQuery with object props
// export function fieldValidation( Validate ) {
//     console.log('test');
//
//     let container = Validate.field.parents('.NiceField');
//     container.removeClass('error success');
//
//     let value;
//     if ( Validate.field.is( 'input') ) {
//         value = Validate.field.val();
//     } else {
//         value = Validate.field.html();
//     }
//
//     let fn = Nice.validation[Validate['type']];
//
//     if ( typeof  fn !== 'function' ) {
//         console.log('No such validation function');
//     } else {
//
//         let ValidateResult = fn( value );
//
//         if ( ValidateResult ) {
//             container.addClass('success');
//         } else {
//             container.addClass('error');
//         }
//
//     }
//
// }

export function HandleFieldsValidate(selector) {

    let inputs = jQuery(selector).find('.input');

    inputs.each(function () {

        let ThisField = jQuery(this);
        let ValidType = ThisField.attr('data-validation');

        if (ValidType && ValidType !== 'false') {

            ThisField.on('input', function () {
                ThisField.parents('.NiceField').removeClass('error');
                delayValidateField({
                    'field': ThisField,
                    'type': ValidType
                });
            });

            ThisField.on('change', function () {
                ThisField.parents('.NiceField').removeClass('error');
                delayValidateField({
                    'field': ThisField,
                    'type': ValidType
                });
            });

            ThisField.on('DOMSubtreeModified', function () {
                delayValidateField({
                    'field': ThisField,
                    'type': ValidType
                });
            });

            ThisField.on('focusin', function () {
                delayValidateField({
                    'field': ThisField,
                    'type': ValidType
                });
            });

            ThisField.on('focusout', function () {
                vField({
                    'field': ThisField,
                    'type': ValidType
                });
                setTimeout(function () {
                    ThisField.parents('.NiceField').removeClass('error');
                }, 1000)
            });

            ThisField.on('paste', function () {
                vField({
                    'field': ThisField,
                    'type': ValidType
                });
                setTimeout(function () {
                    ThisField.parents('.NiceField').removeClass('error');
                }, 1000)
            });

        }
    });

}

export function RunFieldsValidate(selector) {

    let input = jQuery(selector).find('.input');

    input.each(function () {

        let ThisField = jQuery(this);
        let ValidType = ThisField.attr('data-validation');

        if (ValidType && ValidType !== 'false') {

            vField({
                'field': ThisField,
                'type': ValidType
            });
        }
    });

}