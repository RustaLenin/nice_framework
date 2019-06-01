<?php ?>

<div class="head_wrapper" onclick="Nice.field.toggleSelector( this )">

    <span
        class="input <?php echo $field['field_class']; ?>"
        <?php if ( $field['editable'] ) { echo 'contenteditable="true"'; } else { echo 'contenteditable="false"'; } ?>
        spellcheck="<?php echo $field['spellcheck']; ?>"
        data-type="select"
        data-name="<?php echo $field['name']; ?>"
        data-value="<?php echo $field['value']; ?>"
        data-validation="<?php echo $field['validation']; ?>"
        data-placeholder="<?php echo $field['placeholder']; ?>"
        data-required="<?php echo $field['required']; ?>"
        data-callback="<?php echo $field['callback']; ?>"
        data-select_type="<?php echo $field['select_type']; ?>"
        data-data_format="<?php echo $field['data_format']; ?>"
        <?php if ( $field['editable'] ) { ?> oninput="Nice.field.searchList(this)" <?php } ?>

    ><?php if ( $field['content'] ) { echo $field['content']; } else if ( $field['label'] ) { echo $field['label']; } ?></span>

    <span class="selector_arrow SelectorArrow">
        <?php echo nice_svg( [ 'id' => 'arrow_down', 'size' => 'micro' ] ); ?>
    </span>
    <?php if ($field['icon']) { ?>
    <span class="field_icon FieldIcon">
        <?php echo nice_svg( $field['icon'] ); ?>
    </span>
    <?php } ?>
</div>

<div class="selections_list SelectionsList <?php echo $field['select_type']; ?>">

    <?php
    foreach( $field['selections'] as $key => $selector ) { ?>

        <div
            class="selection_list__element
            <?php if ( $field['select_type'] === 'single' ) { if ( $field['value'] === $selector['value'] ) { echo ' checked'; } }
            else if ( $field['select_type'] === 'multiple' ) { if ( $selector['checked'] ) { echo ' checked'; } }?>"
            onclick="Nice.field.chooseThis(this)"
            data-value="<?php echo $selector['value']; ?>"
            <?php if ( $selector['name'] ) { ?> data-name="<?php echo $selector['name']; ?>" <?php } ?>
            <?php if ( $selector['color'] ) { echo 'style="border-left:3px solid ' . $selector['color'] . '"';} ?>
        >
            <span class="selection_list__element_icon">
                <?php echo nice_svg( $selector['icon'] );?>
            </span>

            <span class="selection_list__element_text"><?php echo $selector['text']; ?></span>

            <?php if ( $field['checkboxes'] ) { ?>
                <span class="selection_list__element_check">
                    <?php echo nice_svg([ 'size' => $field['size'], 'id' => 'check' ]); ?>
                </span>
            <?php } ?>

        </div>

    <?php } ?>

</div>
