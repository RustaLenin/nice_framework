<?php ?>

<div class="setting_block SettingBlock <?php if ( $settings['blocks'][$block_name]['collapsed'] == true ) { echo 'collapsed'; } ?>">

    <div class="header SettingBlockTitle" onclick="ToggleSettingBlock(this)">

        <span class="meta">
            <?php if ( $settings['blocks'][$block_name]['icon'] ) { ?>
                <span class="block_icon nice_svg medium"><svg><use href="#<?php echo $settings['blocks'][$block_name]['icon']; ?>"></use></svg></span>
            <?php } ?>
            <span class="title"> <?php echo $settings['blocks'][$block_name]['title']; ?> </span>
        </span>

        <span class="toggle_block_icon nice_svg medium"><svg><use href="#arrow_down"></use></svg></span>
    </div>

    <div class="content SettingBlockContainer">

        <?php

        foreach ( $settings['blocks'][$block_name]['fields'] as $field ) {
            if ( $settings['fields'][$field] ) {
                echo nice_field( $settings['fields'][$field] );
            }
        }

        if ( $settings['blocks'][$block_name]['content'] ) {
            echo $settings['blocks'][$block_name]['content'];
        }

        if ( $settings['blocks'][$block_name]['callback'] ) {
            if ( function_exists( $settings['blocks'][$block_name]['callback'] ) ) {
                $settings['blocks'][$block_name]['callback']();
            }
        } ?>

    </div>

</div>