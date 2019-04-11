<?php ?>

<span class="nice_svg
    <?php echo ' ' . $size;
    if ( $class ) { echo ' ' . $class; }
    if ( $click_able ) { echo ' click_able'; } ?>"
    <?php if ( $onclick ) { echo 'onclick="' . $onclick . '"'; } ?>
    >
    <?php echo $sprite[$id]; ?>
</span>