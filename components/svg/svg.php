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

        if ( !isset ( $icon['id'] ) )               { $icon['id']               = 'cog'; }
        if ( !isset ( $icon['size'] ) )             { $icon['size']             = 'medium'; }
        if ( !isset ( $icon['click_able'] ) )       { $icon['click_able']       = false; }
        if ( !isset ( $icon['sprite'] ) )           { $icon['sprite']           = NiceSprite;}
        if ( !isset ( $icon['rotate'] ) )           { $icon['rotate']           = false;}

        ob_start();
        include('templates/regular.php');
        $html = ob_get_clean();

        return $html;

    }

}