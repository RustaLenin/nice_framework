<?php ?>

<div class="nice_field NiceField <?php echo $field['class']; ?> <?php echo $field['size']; ?>">

    <span class="label"><?php echo $field['label']; ?></span>

    <div class="area NiceFieldArea" onclick="Nice.fields.selectors.toggleSelector(this)">
        <span
            class="input <?php echo $field['field_class']; ?>  <?php if ( $field['icon'] ) { echo 'with_icon';}?>"
            contenteditable="false"
            spellcheck="<?php echo $field['spellcheck']; ?>"
            data-type="<?php echo $field['type']; ?>"
            data-name="<?php echo $field['name']; ?>"
            data-value="<?php echo $field['value'];?>"
            data-validation="<?php echo $field['validation']; ?>"
            data-placeholder="<?php echo $field['placeholder']; ?>"
            data-required="<?php echo $field['required']; ?>"
        ><?php echo $field['content']; ?></span>

        <?php if ( $field['icon'] ) {
            echo nice_svg([ 'class' => $field['icon_class'], 'size' => $field['size'], 'id' => $field['icon'] ]);
        } ?>

        <div class="selections_list SelectionsList">

            <?php
            foreach( $field['selections'] as $selector ) { ?>

                <div
                    class="selection_list__element"
                    onclick="Nice.fields.selectors.chooseThis(this)"
                    data-value="<?php echo $selector['name']; ?>"
                    <?php if ( $selector['color'] ) { echo 'style="border-left:3px solid' . $selector['color'] . '"';} ?>
                >
                    <?php if ( $selector['icon'] ) {
                        echo nice_svg([ 'size' => $field['size'], 'id' => $selector['icon'] ]);
                    } ?>
                    <span class="selection_list__element_text">
                        <?php echo $selector['text']; ?>
                    </span>
                </div>

            <?php } ?>

        </div>

    </div>

</div>

