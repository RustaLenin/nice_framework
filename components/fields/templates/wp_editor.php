<?php ?>

<nice-wp_editor
    editor-id="<?php if ( $field['id'] ) { echo $field['id']; }  ?>"
    name="<?php if ( $field['name'] ) { echo $field['name']; }  ?>"
>
    <?php if ( $field['value'] ) { echo $field['value']; } ?>
</nice-wp_editor>
