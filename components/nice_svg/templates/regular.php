<?php ?>

<span class="nice_svg <?php echo $size; if ( $click_able ) { echo ' click_able';}?>"
    <?php if ( $onclick ) { echo 'onclick="' . $onclick .'(this)"'; } ?>
    >
    <?php echo $sprite[$id]; ?>
</span>