<?php

Class NiceTranslate {

    public static function defineLanguage( $lang = 'en' ) {
        $translate =  json_decode( file_get_contents( NICE_DIR . '/languages/' . $lang . '.json' ), 'ARRAY_A ' );
        define ( 'NICE_LANG', $translate );
    }

    public static function et( $key, $lang = NICE_LANG ) {
        echo $lang[$key];
    }

    public static function _t( $key, $lang = NICE_LANG ) {
        return $lang[$key];
    }

}

if ( !function_exists('et') ) {
    function et($key){
        NiceTranslate::et($key);
    }
}

if ( !function_exists('_t') ) {
    function _t($key){
        return NiceTranslate::_t($key);
    }
}