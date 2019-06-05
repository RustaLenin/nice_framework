<?php ?>

<input
    class="input <?php echo $field['field_class']; ?>"
    spellcheck="<?php echo $field['spellcheck']; ?>"
    type="<?php echo $field['type']; ?>"
    name="<?php echo $field['name']; ?>"
    data-validation="<?php echo $field['validation']; ?>"
    placeholder="<?php echo $field['placeholder']; ?>"
    data-required="<?php echo $field['required']; ?>"
    value="<?php echo $field['value']; ?>"
    <?php if ( $field['validation'] ) { ?>
        oninput="Nice.field.delayValidate(this); this.closest('.nice_field').classList.remove('error', 'success');"
        onfocus="Nice.field.delayValidate(this); this.closest('.nice_field').classList.remove('error', 'success');"
        onfocusout="Nice.field.validate(this)"
        onpaste="Nice.field.validate(this)"
    <?php } ?>
    <?php if ($field['data_type'] === 'date' ) { ?>
        onchange="Nice.field.validate(this)"
    <?php } ?>
>

<?php echo nice_svg( $field['icon']);

if ( $field['validation'] ) {
    include('validate_icons.php');
} ?>
