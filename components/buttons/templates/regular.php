<?php ?>

<span class="nice_button
    <?php

    /** Class name for styles **/
    echo ' ' . $button['type'];

    /** Special class for personal customization **/
    if( $button['class'] ) { echo ' ' . $button['class']; }

    /** Size of the button **/
    echo ' ' . $button['size']; ?>"

    <?php if( $button['onclick'] ) { echo 'onclick="'. $button['onclick'] .'"'; }?>>

    <?php if ( $button['icon'] ) {
        ?>
        <nice-svg svg-id="<?php echo $button['icon']; ?>"></nice-svg>
    <?php
    }
    echo $button['text'];
    ?>
</span>
