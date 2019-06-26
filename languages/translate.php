<?php

Class NiceTranslate {

    public static function defineLanguage( $local = 'en' ) {
        $translate =  json_decode( file_get_contents( NICE_DIR . '/languages/' . $local . '.json' ), 'ARRAY_A' );
        define ( 'NICE_LANG', $translate );
    }

    public static function _t( $key, $lang = NICE_LANG ) {
        return $lang[$key];
    }

    public static function getTranslateToJS() {
        ob_start(); ?>
        <script type="text/javascript">
            /* <![CDATA[ */
            window.NiceTranslate = jQuery.parseJSON(`<?php echo json_encode( NICE_LANG ); ?>`);
            /* ]]> */
        </script>
        <?php
        return ob_get_clean();
    }

}

if ( !function_exists('_t') ) {
    function _t( $key, $lang = false ){
        if ( !$lang ) {
            return $key;
        }
        return NiceTranslate::_t( $key, $lang);
    }
}