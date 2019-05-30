import { en } from './js/en.js';
import { ru } from './js/ru.js';

export function _t( key, locale ) {
    if ( typeof Nice === 'undefined' ) {
        return en[key];
    }
    else {
        return Nice.currentLocale[key];
    }
}

export function switchLocale( locale ) {
    if ( typeof Nice === 'undefined' ) {
        console.log( _t('Nice not ready yet') );
    }
    else {
        if ( typeof eval(locale) === 'undefined' ) {
            console.log( _t('No such locale yet, need a translation') );
        } else {
            Nice.currentLocale = eval(locale);
            console.log( _t('Nice current locale switched to ') + locale );
        }
    }
}