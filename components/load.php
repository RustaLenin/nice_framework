<?php

$files = scandir(NICE_COM );

foreach ( $files as $file ) {

    if ( is_dir( NICE_COM . $file ) ) {
        if ( file_exists( NICE_COM . $file . '/' . $file . '.php' ) ) {
            include_once ( NICE_COM . $file . '/' . $file . '.php' );
        }
    }

}