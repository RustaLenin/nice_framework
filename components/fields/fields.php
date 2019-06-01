<?php

if ( !function_exists( 'nice_field' ) ) {
    function nice_field( $field ) {
        return NICE_FIELDS::render( $field );
    }
}

Class NICE_FIELDS {

    public static function render( $field ) {

        /** If no prop received **/
        if ( !$field )                     { $field                     = array(); }

        if ( !isset( $field['value'] ) )            { $field['value']            = ''; }
        if ( !isset( $field['type'] ) )             { $field['type']             = 'text'; }
        if ( !isset( $field['size'] ) )             { $field['size']             = 'medium'; }
        if ( !isset( $field['class'] ) )            { $field['class']            = ''; }
        if ( !isset( $field['required'] ) )         { $field['required']         = false; }
        if ( !isset( $field['field_class'] ) )      { $field['field_class']      = ''; }
        if ( !isset( $field['field_type'] ) )       { $field['field_type']       = 'regular'; }
        if ( !isset( $field['icon_class'] ) )       { $field['icon_class']       = ''; }
        if ( !isset( $field['spellcheck'] ) )       { $field['spellcheck']       = false; }
        if ( !isset( $field['name'] ) )             { $field['name']             = ''; }
        if ( !isset( $field['validation'] ) )       { $field['validation']       = false; }
        if ( !isset( $field['placeholder'] ) )      { $field['placeholder']      = _t('Type some text'); }
        if ( !isset( $field['label'] ) )            { $field['label']            = _t('Really nice field'); }
        if ( !isset( $field['error_message'] ) )    { $field['error_message']    = _t('Enter valid data'); }
        if ( !isset( $field['show_label'] ) )       { $field['show_label']       = true; }
        if ( !isset( $field['no_min_width'] ) )     { $field['no_min_width']     = false; }
        if ( !isset( $field['align_center'] ) )     { $field['align_center']     = false; }
        if ( !isset( $field['border_type'] ) )      { $field['border_type']      = 'regular_border'; }
        if ( !isset( $field['label_type'] ) )       { $field['label_type']       = 'above_border'; }


        /** Default values for simple fields **/
        if( $field['field_type'] === 'regular' || $field['field_type'] === 'vanilla' ) {
            if ( $field['default_value'] && !$field['value'] ) {
                $field['value'] = $field['default_value'];
            }
        }

        /** Default values for drop down lists **/
        if ( $field['field_type'] === 'select_list' ) {

            $field['type'] = 'select';

            if ( !isset( $field['select_type'] ) )    { $field['select_type']    = 'single'; }
            if ( !isset( $field['data_format'] ) )    { $field['data_format']    = 'array'; }
            if ( !isset( $field['open'] ) )           { $field['open']           = false; }
            if ( !isset( $field['checkboxes'] ) )     { $field['checkboxes']     = true; }
            if ( !isset( $field['content'] ) )        { $field['content']        = ''; }
            if ( !isset( $field['editable'] ) )       { $field['editable']       = false; }
            if ( !isset( $field['callback'] ) )       { $field['callback']       = ''; }
            if ( !isset( $field['icon'] ) )           { $field['icon']           = false; }

            if ( $field['select_type'] === 'single' ) {

                $default_select_value = '';
                $default_select_content = '';
                $default_select_icon = '';

                foreach ( $field['selections'] as $selection ) {
                    if ( $selection['default'] ) {
                        $default_select_value = $selection['value'];
                        $default_select_content = $selection['text'];
                        $default_select_icon = $selection['icon'];
                        break;
                    }
                }

                if ( !$field['value'] && $default_select_value ) {
                    $field['value'] = $default_select_value;
                }

                if ( !$field['content'] && $default_select_content ) {
                    $field['content'] = $default_select_content;
                }

                if ( !$field['icon'] && $default_select_icon ) {
                    $field['icon'] = $default_select_icon;
                }

            } else {

                if ( $field['no_min_width'] )        { $field['no_min_width']     = false; }

            }

        }


        /** Buffer template render into string **/
        ob_start();
        include('templates/base.php');
        $html = ob_get_clean();

        /** Return result **/
        return $html;

    }

}