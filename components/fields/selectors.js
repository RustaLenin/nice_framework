import { svgNode } from '../svg/svg.js';

export function toggleSelector( element = null ) {
    let area = element.closest('.NiceFieldArea');
    area.classList.toggle('open');
}

export function chooseThis( elem = null ) {

    if ( elem.classList.contains('blocked') ) {
        Nice.notify({'type': 'warning', 'message': Nice._t('This element is blocked')});
        return false;
    } else {
        /** Get values and html from clicked list element **/
        let value = elem.getAttribute('data-value');
        let title = elem.querySelector('.selection_list__element_text').textContent;

        let icon = false;
        if ( elem.querySelector('.selection_list__element_icon').querySelector('nice-svg') ) {
            icon = elem.querySelector('.selection_list__element_icon').querySelector('nice-svg').cloneNode();
            if ( icon ) {
                icon.classList.add('field_icon');
            }
        }

        let checked = elem.classList.contains('checked');

        /** Find parent html elements: area & input itself **/
        let area  = elem.closest('.NiceFieldArea');
        let input = area.querySelector('.input');
        input.setAttribute('data-nothing', 'false' );
        let select_type = input.getAttribute('data-select_type');

        if ( select_type === 'single' ) {

            /** Remove checked from all element except clicked **/
            let list_elems = area.querySelectorAll('.selection_list__element');
            list_elems.forEach( function ( l_elem ) {
                l_elem.classList.remove('checked');
            });
            if ( !checked ) {
                elem.classList.add('checked');
            }


            /** Insert value and html **/
            if ( !checked ) {
                input.textContent =  title;
                input.setAttribute('data-value', value );
                if ( icon ) {
                    if ( area.querySelector('.field_icon') ) {
                        area.querySelector('.field_icon').replaceWith(icon);
                    } else {
                        area.prepend(icon);
                    }
                    if ( !elem.closest('.nice_field').classList.contains('with_icon') ) {
                        elem.closest('.nice_field').classList.add('with_icon');
                    }
                }
            } else {

                if ( input.getAttribute('data-can_be_empty') !== 'false' ) {
                    input.textContent = Nice._t('Nothing selected');
                    input.setAttribute('data-nothing', 'true' );
                    input.setAttribute('data-value', '' );
                    if ( area.querySelector('.FieldIcon') ) {
                        if ( area.querySelector('.field_icon') ) {
                            area.querySelector('.field_icon').remove();
                        }
                        let new_icon = svgNode({'id': 'notify_warning', 'class': 'field_icon'});
                        new_icon.classList.add('field_icon');
                        area.prepend( new_icon );
                        if ( !elem.closest('.nice_field').classList.contains('with_icon') ) {
                            elem.closest('.nice_field').classList.add('with_icon');
                        }
                    }
                } else {
                    Nice.notify({'type': 'warning', 'message': Nice._t('All ready selected') });
                }

            }

            area.classList.remove('open');

        } else {
            elem.classList.toggle('checked');
            let new_field_content = '';
            let count = countChecked( elem );
            if ( elem.classList.contains('checked') ) {
                new_field_content= elem.querySelector('.selection_list__element_text').textContent;
                if ( count > 1 ) {
                    count -= 1;
                    new_field_content += Nice._t(' and + ') + count;
                }
            } else {
                new_field_content = getTextOfFirstCheckedElem( elem );
                if ( count > 1 ) {
                    count -= 1;
                    new_field_content += Nice._t(' and + ') + count;
                } else if( count === 0){
                    input.setAttribute('data-nothing', 'true' );
                }
            }
            input.textContent = new_field_content;

        }

        /** Run callback **/
        let callback = input.getAttribute('data-callback');
        if ( callback ) {
            eval( callback );
        }
    }
}

export function countChecked( elem ) {
    let list_cont = elem.closest('.SelectionsList ');
    let list_elements =  list_cont.querySelectorAll('.selection_list__element');
    let count = 0;
    list_elements.forEach( function ( list_elem ) {
        if ( list_elem.classList.contains('checked') ) {
            count++;
        }
    });
    return count;
}

export function getTextOfFirstCheckedElem( elem ) {
    let list_cont = elem.closest('.SelectionsList ');
    let list_elements =  list_cont.querySelectorAll('.selection_list__element');
    let checked_text = '';
    let count = 0;
    list_elements.forEach( function ( list_elem ) {
       if ( list_elem.classList.contains('checked') ) {
           count++;
           if ( count === 1 ) {
               checked_text = list_elem.querySelector('.selection_list__element_text').textContent;
           }
       }
    });
    if ( checked_text === '' ) {
        checked_text = Nice._t('Nothing selected');
    }
    return checked_text;
}