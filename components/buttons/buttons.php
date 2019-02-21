<?php

if ( !function_exists('nice_submit') ) {
    function nice_button( $button ) {
        return NiceButton::render( $button );
    }
}

Class NiceButton {

    public static function render( $button = null ) {

        $html = null;

        if ( !$button ) { $button = array(); }

        if ( !$button['type'] )  { $button['type']  = 'regular'; }
        if ( !$button['size'] )  { $button['size']  = 'medium'; }
        if ( !$button['class'] ) { $button['class'] = ''; }
        if ( !$button['icon'] )  { $button['icon']  = false; }
        if ( !$button['text'] )  { $button['text']  = 'Another one nice button'; }

        extract($button);
        ob_start();
        include('templates/' . $button['type'] . '.php' );
        $html = ob_get_clean();

        return $html;
    }

}