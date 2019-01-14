<?php

Class NICE_SVG {

    public static function simple_import(){ ?>

        <script src="<?php echo plugin_dir_url( __FILE__ ) . 'nice_svg.js'; ?>" type="module"></script>
        <link rel="stylesheet" type="text/css" href="<?php echo plugin_dir_url( __FILE__ ) . 'nice_svg.css'; ?>">
        <?php
    }

}