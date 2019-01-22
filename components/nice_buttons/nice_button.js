export function niceButton( button ) {

    if ( !button ) { button = array(); }

    if ( !button['type'] )  { button['type']  = 'regular'; }
    if ( !button['size'] )  { button['size']  = 'medium'; }
    if ( !button['class'] ) { button['class'] = ''; }
    if ( !button['icon'] )  { button['icon']  = false; }
    if ( !button['text'] )  { button['text']  = 'Another one nice button'; }

    return  ejs.render( Nice.buttons.templates.button['type'], { 'button': button } )

}

export function regularButton() {
    return ``;
}

export function submitButton() {
    return ``;
}