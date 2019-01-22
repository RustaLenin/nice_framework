<?php ?>

<span class="nice_svg <?php echo $size; ?>" <?php if ( $onclick ) { echo 'onclick="' . $onclick .'(this)"'; } ?> >
    <?php echo $sprite[$key]; ?>
</span>