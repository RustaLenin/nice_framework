<?php

if ( !function_exists( 'nice_settings') ) {
    function nice_settings( $settings ) {
        return NICE_SETTINGS::render( $settings );
    }
}

Class NICE_SETTINGS {

    public static function wp_enqueue() {
        wp_enqueue_script( 'nice_settings', plugin_dir_url( __FILE__ ) . 'nice_settings.js' );
        wp_enqueue_style('nice_settings', plugin_dir_url( __FILE__ ) . 'nice_settings.css' );
    }

    public static function simple_import( $attr ){ ?>

        <script src="<?php echo plugin_dir_url( __FILE__ ) . 'nice_settings.js'; ?>" type="text/javascript"
            <?php if ( $attr == 'async' || $attr == 'defer') { echo $attr; } ?>></script>
        <link rel="stylesheet" type="text/css" href="<?php echo plugin_dir_url( __FILE__ ) . 'nice_settings.css'; ?>">
        <?php
    }

    public static function render ( $settings ) {

        if ( !$settings ) {
            return 'No model received for settings page';
        }

        if ( !$settings['slug'] ) {
            return 'No unique settings slug received';
        }

        if ( !$settings['title'] )  { $settings['title']  = 'Unnamed settings page' ;}
        if ( !$settings['tabs'] )   { $settings['tabs']   = array(); }
        if ( !$settings['blocks'] ) { $settings['blocks'] = array(); }
        if ( !$settings['fields'] ) { $settings['fields'] = array();}

        ob_start();
        include('templates/index.php');
        $html = ob_get_clean();

        return $html;

    }

    public static function nav_element( $tab ) {

        if ( !$tab ) { $tab = array(); }

        if ( !$tab['slug'] )       { $tab['slug']        = uniqid(); }
        if ( !$tab['title'] )      { $tab['title']       = 'Another one tab'; }
        if ( !$tab['icon'] )       { $tab['icon']        = false; }
        if ( !$tab['current'] )    { $tab['current']     = false; }
        if ( !$tab['capability'] ) { $tab['capability']  = 8; }
        if ( !$tab['blocks'] )     { $tab['blocks']      = array(); }
        if ( !$tab['fields'] )     { $tab['fields']      = array(); }

        extract( $tab );

        ob_start();
        include('templates/nav_element.php');
        $html = ob_get_clean();

        return $html;

    }

}