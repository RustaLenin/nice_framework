<?php ?>

<div class="nice_field NiceField
    <?php
    echo ' ' . $field['class'];
    echo ' ' . $field['size'];
    echo ' ' . $field['border_type'];
    echo ' ' . $field['label_type'];
    if ( $field['inline'] ){ echo ' inline'; }
    if ( $field['no_min_width'] ){ echo ' no_min_width'; }
    if ( $field['align_center'] ){ echo ' align_center'; }
    if ( !$field['show_label'] ) { echo ' no_label'; }
    $field['nothing'] = true;
    if ( $field['value'] ) { $field['nothing'] = false; }
    if ( !$field['validation'] && !$field['comment_message'] ) { echo ' no_comment';}
    if ( $field['icon'] && $field['field_type'] !== 'textarea' ) { echo ' with_icon';    }
    if ( $field['textarea'] ) { echo ' textarea';}
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
        <?php if (  $field['success_message'] ) { ?> <span class="success_message"><?php echo $field['success_message']; ?></span><?php } ?>
    <?php } ?>
    <?php if (  $field['comment_message'] ) { ?> <span class="comment_message"><?php echo $field['comment_message']; ?></span><?php } ?>

</div>