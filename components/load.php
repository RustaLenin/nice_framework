<?php

$dir = dirname( __FILE__ );
$files = scandir( $dir );

foreach ( $files as $file ) {

    if ( is_dir( $dir . '/' . $file ) ) {
        if ( file_exists( $dir . '/' . $file . '/' . $file . '.php' ) ) {
            include_once ( $dir . '/' . $file . '/' . $file . '.php' );
        }
    }

}