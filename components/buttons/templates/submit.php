<?php ?>

<span class="nice_submit <?php if( $class ) { echo $class; } ?>" <?php if( $onclick ) { echo 'onclick="'. $onclick .'(this)"'; }?>>
    <?php if ( $icon ) {
        echo nice_svg(array(
            'key' => $icon,
            'size' => $size,
        ));
    }
    echo $text;
    ?>
</span>
