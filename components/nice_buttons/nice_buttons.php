<?php

Class NICE_BUTTONS {

    public static function wp_enqueue() {
        wp_enqueue_style('nice_buttons', plugin_dir_url( __FILE__ ) . 'nice_buttons.css' );
    }

    public static function simple_import(){ ?>
        <link rel="stylesheet" type="text/css" href="<?php echo plugin_dir_url( __FILE__ ) . 'nice_buttons.css'; ?>">
        <?php
    }

}