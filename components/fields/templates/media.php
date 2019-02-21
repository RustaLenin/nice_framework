<?php ?>

<div class="nice_field NiceField <?php echo $field['class']; ?> <?php echo $field['size']; ?>">

    <span class="label"><?php echo $field['label']; ?></span>
    <div class="area">
        <span
            class="input MediaField <?php echo $field['field_class']; ?>  <?php if ( $field['icon'] ) { echo 'with_icon';}?>"
            contenteditable="true"
            spellcheck="<?php echo $field['spellcheck']; ?>"
            data-type="<?php echo $field['type']; ?>"
            data-name="<?php echo $field['name']; ?>"
            data-validation="<?php echo $field['validation']; ?>"
            data-placeholder="<?php echo $field['placeholder']; ?>"
            data-required="<?php echo $field['required']; ?>"
        ><?php echo $field['value']; ?></span>
        <span class="media_icon click_able MediaFieldButton nice_svg <?php echo $field['size']; ?>">
            <svg><use href="#add_image"></use></svg>
        </span>
        <?php
        if ( $field['validation'] != 'false' ) { ?>
            <span class="success_icon"><svg><use href="#check"></use></svg></span>
            <span class="error_icon"><svg><use href="#close"></use></svg></span>
        <?php } ?>
    </div>
    <?php if ( $field['validation'] != 'false' ) { ?>
        <span class="error_message"><?php echo $field['error_message']; ?></span>
    <?php } ?>

</div>