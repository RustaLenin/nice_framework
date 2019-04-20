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

        if ( !isset( $button['type'] ) )      { $button['type']      = 'regular'; }
        if ( !isset( $button['size'] ) )      { $button['size']      = 'medium'; }
        if ( !isset( $button['class'] ) )     { $button['class']     = ''; }
        if ( !isset( $button['icon'] ) )      { $button['icon']      = false; }
        if ( !isset( $button['text'] ) )      { $button['text']      = 'Another one nice button'; }
        if ( !isset( $button['onclick'] ) )   { $button['onclick']   = ''; }

        ob_start();
        include('templates/regular.php' );
        $html = ob_get_clean();

        return $html;
    }

}