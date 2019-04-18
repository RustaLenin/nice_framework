<?php ?>

<div class="nice_field NiceField select <?php echo $field['class']; ?> <?php echo $field['size']; ?>
<?php if ( $field['no_min_width'] ){ echo ' no_min_width';} ?>" >

    <?php if ($field['show_label'] ) { ?>
        <span class="label"><?php echo $field['label']; ?></span>
    <?php } ?>

    <div class="area NiceFieldArea" >

        <div class="head_wrapper" onclick="Nice.field.toggleSelector( this )">
            <span
                class="input <?php echo $field['field_class']; ?>  <?php if ( $field['icon'] ) { echo 'with_icon';}?>"
                contenteditable="false"
                spellcheck="<?php echo $field['spellcheck']; ?>"
                data-type="select"
                data-name="<?php echo $field['name']; ?>"
                data-value="<?php echo $field['value']; ?>"
                data-validation="<?php echo $field['validation']; ?>"
                data-placeholder="<?php echo $field['placeholder']; ?>"
                data-required="<?php echo $field['required']; ?>"
                data-callback="<?php echo $field['callback']; ?>"
                data-select_type="<?php echo $field['select_type']; ?>"
            ><?php if ( $field['content'] ) { echo $field['content']; } else if ( $field['label'] ) { echo $field['label']; } ?></span>

            <span class="selector_arrow SelectorArrow">
                <?php echo nice_svg( [ 'id' => 'arrow_down', 'size' => $field['size'] ] ) ;?>
            </span>

            <span class="field_icon FieldIcon">
                <?php if ( $field['icon'] ) { echo nice_svg([ 'class' => $field['icon_class'], 'size' => $field['size'], 'id' => $field['icon'] ]); } ?>
            </span>
        </div>

        <div class="selections_list SelectionsList <?php echo $field['select_type']; ?>">

            <?php
            foreach( $field['selections'] as $selector ) { ?>

                <div
                    class="selection_list__element <?php if ( $field['value'] === $selector['value'] ) {echo ' checked'; }?>"
                    onclick="Nice.field.chooseThis(this)"
                    data-value="<?php echo $selector['value']; ?>"
                    <?php if ( $selector['color'] ) { echo 'style="border-left:3px solid ' . $selector['color'] . '"';} ?>
                >
                    <span class="selection_list__element_icon">
                        <?php if ( $selector['icon'] ) {
                            echo nice_svg([ 'size' => $field['size'], 'id' => $selector['icon'], 'margin' => '0 8px 0 0' ]);
                        } ?>
                    </span>

                    <span class="selection_list__element_text">
                        <?php echo $selector['text']; ?>
                    </span>

                    <?php if ( $field['checkboxes'] ) { ?>
                        <span class="selection_list__element_check">
                            <?php echo nice_svg([ 'size' => $field['size'], 'id' => 'check' ]); ?>
                        </span>
                    <?php } ?>

                </div>

            <?php } ?>

        </div>

    </div>

</div>

