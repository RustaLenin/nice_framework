<?php ?>

<span class="nice_svg

    <?php

    /** Set Icon size **/
    echo ' ' . $icon['size'];

    /** Add custom class **/
    if ( $icon['class'] ) { echo ' ' . $icon['class']; }

    /** Rotate icon **/
    if ( $icon['rotate'] ) { echo ' rotate'; }

    /** Add cursor pointer if clickable icon **/
    if ( $icon['click_able'] ) { echo ' click_able'; } ?>"


    <?php

    /** Set custom margins **/
    if ( $icon['margin'] ) { echo 'style="margin:' . $icon['margin'] . ';"'; }

    /** Set onclick function **/
     if ( $icon['onclick'] ) { echo 'onclick="' . $icon['onclick'] . '"'; } ?>
    >

    <?php
    /** Return svg string path from sprite **/
    echo $icon['sprite'][$icon['id']]; ?>

</span>