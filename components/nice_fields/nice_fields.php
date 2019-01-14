<?php

if ( !function_exists( 'nice_field' ) ) {
    function nice_field( $field ) {
        return NICE_FIELDS::render( $field );
    }
}

Class NICE_FIELDS {

    public static function wp_enqueue() {
        wp_enqueue_script( 'nice_fields', plugin_dir_url( __FILE__ ) . 'nice_fields.js' );
        wp_enqueue_style('nice_fields', plugin_dir_url( __FILE__ ) . 'nice_fields.css' );
    }

    public static function simple_import( $attr ){ ?>
        <script src="<?php echo plugin_dir_url( __FILE__ ) . 'nice_fields.js'; ?>" type="text/javascript"
            <?php if ( $attr == 'async' || $attr == 'defer') { echo $attr; } ?>></script>
        <link rel="stylesheet" type="text/css" href="<?php echo plugin_dir_url( __FILE__ ) . 'nice_fields.css'; ?>">
        <?php
    }

    public static function render( $field ) {

        if ( !$field )                     { $field                     = array(); }

        if ( !$field['value'] )            { $field['value']            = ''; }
        if ( !$field['type'] )             { $field['type']             = 'text'; }
        if ( !$field['size'] )             { $field['size']             = 'medium'; }
        if ( !$field['class'] )            { $field['class']            = ''; }
        if ( !$field['required'] )         { $field['required']         = 'false'; }
        if ( !$field['field_class'] )      { $field['field_class']      = ''; }
        if ( !$field['field_type'] )       { $field['field_type']       = 'regular'; }
        if ( !$field['icon_class'] )       { $field['icon_class']       = ''; }
        if ( !$field['spellcheck'] )       { $field['spellcheck']       = 'false'; }
        if ( !$field['name'] )             { $field['name']             = ''; }
        if ( !$field['validation'] )       { $field['validation']       = 'false'; }
        if ( !$field['placeholder'] )      { $field['placeholder']      = 'Type some text'; }
        if ( !$field['label'] )            { $field['label']            = 'Really nice field'; }
        if ( !$field['error_message'] )    { $field['error_message']    = 'Enter valid data'; }

        ob_start();

        include('templates/' . $field['field_type'] . '.php');

        $html = ob_get_clean();
        return $html;

    }

}