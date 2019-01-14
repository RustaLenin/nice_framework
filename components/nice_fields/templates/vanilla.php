<?php ?>

<div class="nice_field NiceField <?php echo $field['class']; ?> <?php echo $field['size']; ?>">

    <span class="label"><?php echo $field['label']; ?></span>
    <div class="area">
        <input
            class="input <?php echo $field['field_class']; ?>  <?php if ( $field['icon'] ) { echo 'with_icon';}?>"
            spellcheck="<?php echo $field['spellcheck']; ?>"
            type="<?php echo $field['type']; ?>"
            name="<?php echo $field['name']; ?>"
            data-validation="<?php echo $field['validation']; ?>"
            placeholder="<?php echo $field['placeholder']; ?>"
            data-required="<?php echo $field['required']; ?>"
            value="<?php echo $field['value']; ?>"
        >
        <?php if ( $field['icon'] ) { ?>
            <span class="nice_svg <?php echo $field['icon_class']; ?> <?php echo $field['size']; ?>">
                <svg><use href="#<?php echo $field['icon']; ?>"></use></svg>
            </span>
        <?php }
        if ( $field['validation'] != 'false' ) { ?>
            <span class="success_icon"><svg><use href="#check"></use></svg></span>
            <span class="error_icon"><svg><use href="#close"></use></svg></span>
        <?php } ?>
    </div>
    <?php if ( $field['validation'] != 'false' ) { ?>
        <span class="error_message"><?php echo $field['error_message']; ?></span>
    <?php } ?>

</div>
