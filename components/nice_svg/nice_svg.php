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

define( 'NICE_SPRITE', $sprite );

if ( !function_exists( 'nice_svg' ) ) {
    function nice_svg( $icon ) {
        return NICE_SVG::render( $icon );
    }
}

Class NICE_SVG {

    public static function render( $icon ) {

        if ( !$icon )                     { $icon                     = array(); }

        if ( !$icon['key'] )              { $icon['key']              = 'cog'; }
        if ( !$icon['size'] )             { $icon['size']             = 'medium'; }

        extract( $icon );
        ob_start();

        include('templates/regular.php');

        $html = ob_get_clean();
        return $html;

    }

}