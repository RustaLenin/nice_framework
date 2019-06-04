<?php ?>

<div class="nice_field NiceField
    <?php
    echo ' ' . $field['class'];
    echo ' ' . $field['size'];
    echo ' ' . $field['border_type'];
    echo ' ' . $field['label_type'];
    if ( $field['no_min_width'] ){ echo ' no_min_width'; }
    if ( $field['align_center'] ){ echo ' align_center'; }
    if ( $field['icon'] )        { echo ' with_icon';    }
    else if ( $field['field_type'] === 'media' ) { echo ' with_icon'; }
    ?>
">

    <?php if ($field['show_label'] ) { ?>
        <span class="label"><?php echo $field['label']; ?></span>
    <?php } ?>

    <div class="area NiceFieldArea">

        <?php

        if ( file_exists( dirname(__FILE__ ) . '/' . $field['field_type'] . '.php' ) ) {
            include(  dirname(__FILE__ ) . '/' . $field['field_type'] . '.php' );
        } else {
            echo _t('No such type of nice fields');
        }

        ?>

    </div>

    <?php if ( $field['validation'] ) { ?>
        <span class="error_message"><?php echo $field['error_message']; ?></span>
    <?php } ?>

</div>