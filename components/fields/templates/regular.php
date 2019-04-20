<?php ?>

<div class="nice_field NiceField <?php echo $field['class']; ?> <?php echo $field['size']; ?>">

    <?php if ($field['show_label'] ) { ?>
        <span class="label"><?php echo $field['label']; ?></span>
    <?php } ?>

    <div class="area">
            <span
                class="input <?php echo $field['field_class']; ?>  <?php if ( $field['icon'] ) { echo 'with_icon';}?>"
                contenteditable="true"
                spellcheck="<?php echo $field['spellcheck']; ?>"
                data-type="<?php echo $field['type']; ?>"
                data-name="<?php echo $field['name']; ?>"
                data-validation="<?php echo $field['validation']; ?>"
                data-placeholder="<?php echo $field['placeholder']; ?>"
                data-required="<?php echo $field['required']; ?>"
            ><?php echo $field['value']; ?></span>

        <?php if ( $field['icon'] ) { ?>
            <span class="field_icon FieldIcon">
                <?php echo nice_svg([
                    'class' => 'field_icon ' . $field['icon_class'],
                    'size' => $field['size'],
                    'id' => $field['icon']
                ]); ?>
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
