<?php

define( 'NICE_ADM', NICE_WP . '/admin/'                  );
define( 'NICE_COR', NICE_WP . '/core/'                   );
define( 'WP_ABS',   NICE_WP . '/abstract/'               );

/**
 * Dependencies
 **/

require_once( ABSPATH . 'wp-includes/pluggable.php'      ); // Cause many wp functions won't work without it!!! It's very important!!! And it must go first of.

// Other depending's may be useful for add page

require_once( ABSPATH . 'wp-admin/includes/image.php'    );
require_once( ABSPATH . 'wp-admin/includes/file.php'     );
require_once( ABSPATH . 'wp-admin/includes/media.php'    );
require_once( ABSPATH . 'wp-admin/includes/template.php' );

/** Abstractions **/
require_once( WP_ABS . 'custom_post.php' );

/**Pages **/
require_once( NICE_ADM . 'menu.php');
require_once( NICE_COR . 'setup/setup_page.php');