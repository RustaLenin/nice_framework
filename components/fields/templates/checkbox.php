<?php ?>

<div
    class="nice_checkbox NiceCheckbox <?php echo $field['class'] . ' ' . $field['size'];
    if ( $field['checked'] ) { echo ' checked'; } ?>"
    data-name="<?php echo $field['name']; ?>"
    data-value="<?php if ( $field['checked'] ) { echo 'true'; } ?>"
    data-required="<?php echo $field['require']; ?>"
>

    <nice-svg svg-id="check" svg-size="<?php echo $field['size']; ?>"></nice-svg>
</div>