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
>

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
