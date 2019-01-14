<?php ?>

<div
    class="nice_checkbox NiceCheckbox <?php echo $field['class'] . ' ' . $field['size'];
    if ( $field['checked'] ) { echo ' checked'; } ?>"
    data-name="<?php echo $field['name']; ?>"
    data-value="<?php if ( $field['checked'] ) { echo 'true'; } ?>"
    data-required="<?php echo $field['require']; ?>"
>
    <span class="nice_svg <?php echo $field['size']; ?>"><svg><use href="check"></use></svg></span>
</div>