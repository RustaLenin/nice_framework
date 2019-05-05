<?php

class NICE_FRAMEWORK_MENU {

    public static function construct() {

        // After plugin's page created, page suffix will writen to var 'some_page_suffix'.
        // It needs to connect scripts and styles ONLY on plugin pages!!!
        // Other Pages will have no this plugins scrips and styles and wll work FAST.

        $settings_suffix = add_menu_page(
            'Nice FrameWork',
            'Nice FrameWork',
            8,
            'nice_framework.php',
            [ 'NICE_FRAMEWORK_SETUP_PAGE', 'construct' ],
            'dashicons-palmtree',
            47, 5 );

        $suffixes = array(
            $settings_suffix,
        );

        foreach ( $suffixes as $suffix ) {
            add_action( 'admin_print_footer_scripts-' . $suffix, [ 'nice_framework', 'wp_enqueue_all' ] );
        }

        /** Settings page **/
        add_action( 'admin_print_footer_scripts-' . $settings_suffix, [ 'NICE_FRAMEWORK_SETUP_PAGE', 'js' ] );

    }

}

add_action( 'admin_menu', [ 'NICE_FRAMEWORK_MENU', 'construct' ] );