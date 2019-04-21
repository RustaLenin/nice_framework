<?php ?>

    <div class="tabs_content TabsContent <?php if ( $tab_content['current'] ) { echo 'current'; } ?>"
         data-tab="<?php echo $tab_name; ?>">

        <?php foreach ( $tab_content['blocks'] as $block_name ) {
            if ( $settings['blocks'][$block_name] ) {
                include('block.php');
            }
        }

        if ( !empty( $tab_content['fields'] ) ) { ?>
            <div class="custom_content">
            <?php foreach ( $tab_content['fields'] as $field ) {
                if ( $settings['fields'][$field] ) {
                    echo nice_field( $settings['fields'][$field] );
                }
            } ?>
            </div>
            <?php
        }

        if ( $tab_content['content'] ) { ?>
            <div class="custom_content">
                <?php echo $tab_content['content']; ?>
            </div>

        <?php }

        if ( $tab_content['callback'] ) {
            if ( function_exists( $tab_content['callback'] ) ) { ?>
                <div class="custom_content">
                    <?php echo $tab_content['callback']( $tab_content['callback_args'] ); ?>
                </div>
                <?php
            }
        }

        ?>

    </div>

<?php
