<?php ?>

<div class="setting_block SettingBlock <?php if ( $settings['blocks'][$block_name]['collapsed'] == true ) { echo 'collapsed'; } ?>">

    <div class="header SettingBlockTitle" onclick="Nice.settings.toggleSettingBlock(this)">

        <span class="meta">
            <?php if ( $settings['blocks'][$block_name]['icon'] ) {
                echo nice_svg([
                    'id' => $settings['blocks'][$block_name]['icon'],
                    'size' => 'medium',
                    'class' => 'block_icon'
                ]);
            } ?>
            <span class="title"> <?php echo $settings['blocks'][$block_name]['title']; ?> </span>
        </span>

        <?php echo nice_svg([
            'id' => 'arrow_down',
            'size' => 'medium',
            'class' => 'toggle_block_icon'
        ]); ?>

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