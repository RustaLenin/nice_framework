<?php ?>


    <span
            class="input MediaField <?php echo $field['field_class']; ?>"
            contenteditable="true"
            spellcheck="<?php echo $field['spellcheck']; ?>"
            data-type="<?php echo $field['type']; ?>"
            data-name="<?php echo $field['name']; ?>"
            data-validation="<?php echo $field['validation']; ?>"
            data-placeholder="<?php echo $field['placeholder']; ?>"
            data-required="<?php echo $field['required'] ? $field['required']: 'false'; ?>"
        <?php if ($field['validation'] || $field['required']) { ?>
            oninput="Nice.field.delayValidate(this); this.closest('.nice_field').classList.remove('error', 'success'); Nice.field.updateMediaField(this);"
            onfocus="Nice.field.delayValidate(this); this.closest('.nice_field').classList.remove('error', 'success'); Nice.field.updateMediaField(this);"
            onfocusout="Nice.field.validate(this); Nice.field.updateMediaField(this);"
            onpaste="Nice.field.pastePlain(event); Nice.field.updateMediaField(this);"
        <?php } else { ?>
            onpaste="Nice.field.pastePlain(event); Nice.field.updateMediaField(this);"
        <?php } ?>
    ><?php echo $field['value']; ?></span>

    <span class="preview_box preview_el <?php if ($field['value']) {
        echo 'preview';
    } ?>"
          onclick="lightbox.view( this.querySelector('.preview_img').getAttribute('src') );">
        <nice-svg svg-id="blind" class="preview_box__icon"></nice-svg>
        <img class="preview_img" src="<?php echo $field['value']; ?>">
    </span>
    <span class="preview_box" onclick="Nice.pickers.media( this, event );">
        <nice-svg svg-id="<?php if ($field['value']) {
            echo 'edit';
        } else { echo 'add_image'; }?>" svg-size="<?php echo $field['size']; ?>"  class="add_icon_box" ></nice-svg>
        </span>

<?php
if ($field['validation']) {
    include('validate_icons.php');
} ?>