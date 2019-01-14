<?php

/*
Plugin Name: Nice FrameWork
Plugin URI: https://github.com/RustaLenin/nice_framework
Description: Simple framework for WP
Version: 0.1
Author: IT Forge
Text Domain: nice_framework
Domain Path: /languages
Author URI: https://it-forge.tech/
Copyright 2018 IT Forge LTD ( email: dev@it-forge.tech )

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
define( 'NICE_ADM', dirname( __FILE__ ) . '/admin/'                  );
define( 'NICE_COR', dirname( __FILE__ ) . '/core/'                   );
define( 'NICE_COM', dirname( __FILE__ ) . '/components/'             );
define( 'NICE_ASS', dirname( __FILE__ ) . '/assets/'                 );

/**
 * Dependencies
 **/

require_once( ABSPATH . 'wp-includes/pluggable.php'      ); // Cause many wp functions won't work without it!!! It's very important!!! And it must go first of.

// Other depending's may be useful for add page

require_once( ABSPATH . 'wp-admin/includes/image.php'    );
require_once( ABSPATH . 'wp-admin/includes/file.php'     );
require_once( ABSPATH . 'wp-admin/includes/media.php'    );
require_once( ABSPATH . 'wp-admin/includes/template.php' );


/**Pages **/
require_once( NICE_ADM . 'menu.php');
require_once( NICE_COR . 'setup/setup_page.php');

/** Components **/
require_once( NICE_COM . 'load.php');