<?php ?>

<span
    class="input textarea
    <?php echo $field['field_class']; ?>"
    contenteditable="true"
    spellcheck="<?php echo $field['spellcheck']; ?>"
    data-type="text"
    data-name="<?php echo $field['name']; ?>"
    data-placeholder="<?php echo $field['placeholder']; ?>"
    data-required="<?php if ( $field['required'] ) { echo 'true'; } ?>"
    onpaste="Nice.field.pastePlain(event);"

><?php echo $field['value']; ?></span>
