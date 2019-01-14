<?php

Class NICE_NOTIFICATIONS {

    public static function wp_enqueue(){
        wp_enqueue_script( 'nice_notifications', plugin_dir_url( __FILE__ ) . 'nice_notifications.js' );
    }

    public static function simple_import( $attr ){ ?>
        <script src="<?php echo plugin_dir_url( __FILE__ ) . 'nice_notifications.js'; ?>" type="text/javascript"
        <?php if ( $attr == 'async' || $attr == 'defer') { echo $attr; } ?>></script>
    <?php
    }

}