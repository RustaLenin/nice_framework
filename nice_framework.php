<?php

/*
Plugin Name: Nice FrameWork
Plugin URI: https://github.com/RustaLenin/nice_framework
Description: Simple framework PHP + JS
Version: 0.1
Author: IT Forge
Text Domain: nice_framework
Domain Path: /languages
Author URI: https://it-forge.tech/
Copyright 2019 IT Forge LTD ( email: dev@it-forge.tech )

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation; either version 2 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA

*/

define( 'NICE_DIR', dirname( __FILE__ )                              );
define( 'NICE_COM', dirname( __FILE__ ) . '/components/'             );
define( 'NICE_WP', dirname( __FILE__  ) . '/wp/'                     );

/** Self Using **/
require_once( NICE_DIR . '/sugar/response.php');

/** Components **/
require_once( NICE_COM . 'load.php');

if ( class_exists('WP_Query') ) {
    include( NICE_DIR . '/wp/wp.php' );
}

Class NICE_FRAMEWORK {

    public static function enqueue_all( $url_to) {

        if ( !$url_to ) { $url_to = $_SERVER['SERVER_NAME']; }

        ?>
        <link rel="stylesheet" href="<?php echo $url_to; ?>nice_framework/nice.css">
        <script type="module" src="<?php echo $url_to; ?>nice_framework/nice.js"></script>
        <?php
    }

    public static function wp_enqueue_all() {

        if ( class_exists('WP_Query') ) {
            wp_enqueue_style('nice_framework', plugin_dir_url( __FILE__ ) . 'nice.css' ); ?>
            <script type="module" src="<?php echo plugin_dir_url( __FILE__) . 'nice.js';?>"></script>
            <?php
        }

    }

}