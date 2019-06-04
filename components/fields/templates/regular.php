<?php ?>
<span

    class="input
    <?php echo $field['field_class']; ?>"

    contenteditable="true"
    spellcheck="<?php echo $field['spellcheck']; ?>"
    data-type="<?php echo $field['type']; ?>"
    data-name="<?php echo $field['name']; ?>"
    data-validation="<?php echo $field['validation']; ?>"
    data-placeholder="<?php echo $field['placeholder']; ?>"
    data-required="<?php if ( $field['required'] ) { echo 'true'; } ?>"
    <?php if ( $field['validation'] ) { ?>
        oninput="Nice.field.delayValidate(this)"
        onfocus="Nice.field.delayValidate(this)"
        onfocusout="Nice.field.validate(this)"
    <?php } ?>

><?php echo $field['value']; ?></span>

<?php if ( $field['icon'] ) { ?>
    <span class="field_icon FieldIcon">
        <?php echo nice_svg([
            'class' => 'field_icon',
            'size' => $field['size'],
            'id' => $field['icon']
        ]); ?>
    </span>
<?php }

if ( $field['validation'] ) {
    include('validate_icons.php');
} ?>