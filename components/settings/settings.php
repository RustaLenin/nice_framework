<?php

if ( !function_exists( 'nice_settings') ) {
    function nice_settings( $settings ) {
        return NICE_SETTINGS::render( $settings );
    }
}

Class NICE_SETTINGS {

    public static function render ( $settings ) {

        if ( !$settings ) {
            return _t('No model received for settings page');
        }

        if ( !$settings['slug'] ) {
            return _t('No unique settings slug received');
        }

        if ( !$settings['title'] )  { $settings['title']  = _t('Unnamed settings page') ;}
        if ( !$settings['tabs'] )   { $settings['tabs']   = []; }
        if ( !$settings['blocks'] ) { $settings['blocks'] = []; }
        if ( !$settings['fields'] ) { $settings['fields'] = []; }

        ob_start();
        include('templates/index.php');
        $html = ob_get_clean();

        return $html;

    }

    public static function nav_element( $tab ) {

        if ( !$tab ) { $tab = []; }

        if ( !$tab['slug'] )       { $tab['slug']        = uniqid(); }
        if ( !$tab['title'] )      { $tab['title']       = _t('Another one tab'); }
        if ( !$tab['icon'] )       { $tab['icon']        = false; }
        if ( !$tab['current'] )    { $tab['current']     = false; }
        if ( !$tab['capability'] ) { $tab['capability']  = 8; }
        if ( !$tab['blocks'] )     { $tab['blocks']      = []; }
        if ( !$tab['fields'] )     { $tab['fields']      = []; }

        extract( $tab );

        ob_start();
        include('templates/nav_element.php');
        $html = ob_get_clean();

        return $html;

    }

}