<?php ?>

<div class="head_wrapper" onclick="Nice.field.toggleSelector( this )">

    <span
        class="input <?php echo $field['field_class']; ?>"
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
        data-can_be_empty="<?php if ( $field['can_be_empty'] ) { echo 'true'; } else { echo 'false'; } ?>"

        <?php if ( $field['editable'] ) { ?>
            contenteditable="true"
            oninput="Nice.field.searchList(this)"
            onpaste="Nice.field.pastePlain(event);"
        <?php } else { ?>
            contenteditable="false"
        <?php } ?>

    ><?php if ( $field['content'] ) { echo $field['content']; } else if ( $field['label'] ) { echo $field['label']; } ?></span>

    <?php
    echo nice_svg( [ 'id' => 'arrow_down', 'size' => 'micro', 'class' => ['selector_arrow', 'SelectorArrow'] ] );
    echo nice_svg( $field['icon'] );
    ?>

</div>

<div class="selections_list SelectionsList <?php echo $field['select_type']; ?>">

    <?php
    foreach( $field['selections'] as $key => $selector ) { ?>

        <div
            class="selection_list__element
            <?php if ( $field['select_type'] === 'single' ) { if ( $field['value'] === $selector['value'] ) { echo ' checked'; } }
            else if ( $field['select_type'] === 'multiple' ) { if ( $selector['checked'] ) { echo ' checked'; } }
            if ( $selector['blocked'] ) { echo ' blocked'; }?>"
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
