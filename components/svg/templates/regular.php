<?php ?>

<span class="nice_svg
    <?php echo ' ' . $icon['size'];
    if ( $icon['class'] ) { echo ' ' . $icon['class']; }
    if ( $icon['click_able'] ) { echo ' click_able'; } ?>"
    <?php if ( $icon['margin'] ) { echo 'style="margin:' . $icon['margin'] . ';"'; }
     if ( $icon['onclick'] ) { echo 'onclick="' . $icon['onclick'] . '"'; } ?>
    >
    <?php echo $icon['sprite'][$icon['id']]; ?>
</span>