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

    <?php
        echo nice_svg([
            'id' => 'add_image',
            'class' => ['media_icon', 'MediaFieldButton', 'field_icon', 'FieldIcon'],
            'size' => $field['size'],
            'click_able' => true,
            'onclick' => 'Nice.pickers.media( this, event );'
        ]);

if ( $field['validation'] ) {
    include('validate_icons.php');
} ?>