<?php ?>

    <span
        class="input MediaField <?php echo $field['field_class']; ?>"
        contenteditable="true"
        spellcheck="<?php echo $field['spellcheck']; ?>"
        data-type="<?php echo $field['type']; ?>"
        data-name="<?php echo $field['name']; ?>"
        data-validation="<?php echo $field['validation']; ?>"
        data-placeholder="<?php echo $field['placeholder']; ?>"
        data-required="<?php echo $field['required']; ?>"
    ><?php echo $field['value']; ?></span>

    <span class="field_icon FieldIcon">
        <?php
        echo nice_svg([
            'class' => 'media_icon MediaFieldButton',
            'size' => $field['size'],
            'id' => 'add_image',
            'click_able' => true,
        ]);
        ?>
    </span>

<?php if ( $field['validation'] != 'false' ) { ?>
    <span class="success_icon"><svg><use href="#check"></use></svg></span>
    <span class="error_icon"><svg><use href="#close"></use></svg></span>
<?php } ?>