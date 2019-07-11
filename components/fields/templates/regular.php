<?php ?>
<span

    class="input
    <?php echo $field['field_class']; ?>"

    contenteditable="<?php echo $field['editable'] ? 'true': 'false'; ?>"
    spellcheck="<?php echo $field['spellcheck']; ?>"
    data-type="<?php echo $field['type']; ?>"
    data-name="<?php echo $field['name']; ?>"
    data-validation="<?php echo $field['validation']; ?>"
    data-placeholder="<?php echo $field['placeholder']; ?>"
    data-required="<?php if ( $field['required'] ) { echo 'true'; } ?>"
    <?php if ( $field['validation'] ) { ?>
        oninput="Nice.field.delayValidate(this); this.closest('.nice_field').classList.remove('error', 'success');"
        onfocus="Nice.field.delayValidate(this); this.closest('.nice_field').classList.remove('error', 'success');"
        onfocusout="Nice.field.validate(this); "
        onpaste="Nice.field.pastePlain(event); Nice.field.validate(this);"
    <?php } else { ?>
        onpaste="Nice.field.pastePlain(event);"
    <?php } ?>

><?php echo $field['value']; ?></span>

<?php echo nice_svg( $field['icon'] );

if ( $field['validation'] ) {
    include('validate_icons.php');
} ?>