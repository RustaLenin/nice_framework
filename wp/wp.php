<?php

define( 'NICE_ADM', dirname( __FILE__ ) . '/admin/'                  );
define( 'NICE_COR', dirname( __FILE__ ) . '/core/'                   );

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