<?php

$svg_dir = dirname( __FILE__ ) . '/icons';
$files = scandir( $svg_dir );
$sprite = array();

foreach ( $files as $file ) {

    if ( !is_dir( $svg_dir. '/' . $file ) ) {
        if ( file_exists( $svg_dir. '/' . $file ) ) {
            $sprite[ substr( $file, 0, -4 ) ] = file_get_contents( $svg_dir. '/' . $file );
        }
    }

}

define( 'NiceSprite', $sprite );

if ( !function_exists( 'nice_svg' ) ) {
    function nice_svg( $icon ) {
        return NiceSvg::render( $icon );
    }
}

Class NiceSvg {

    public static function render( $icon ) {

        if ( !$icon )                     { $icon                     = array(); }

        if ( !$icon['id'] )               { $icon['id']               = 'cog'; }
        if ( !$icon['size'] )             { $icon['size']             = 'medium'; }
        if ( !$icon['click_able'] )       { $icon['click_able']       = false; }
        if ( !$icon['sprite'] )           { $icon['sprite']           = NiceSprite;}

        extract( $icon );
        ob_start();

        include('templates/regular.php');

        $html = ob_get_clean();
        return $html;

    }

}