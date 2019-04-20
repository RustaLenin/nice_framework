<?php ?>
<div class="nice_settings SettingsContainer">

    <div class="settings_header">

        <div class="settings_title">
            <?php echo $settings['title']; ?>
        </div>

        <div class="settings_buttons">

            <?php

            echo nice_button([
                'size'    => 'small',
                'text'    => 'Expand All',
                'icon'    => [
                    'id'   => 'double_arrow_down',
                    'size' => 'small',
                ],
                'onclick' => 'Nice.settings.expandAllTabsBlocks(this)'
            ]);

            echo nice_button([
                'size'    => 'small',
                'text'    => 'Collapse All',
                'icon'    => [
                    'id'     => 'double_arrow_down',
                    'size'   => 'small',
                    'rotate' => true
                ],
                'onclick' => 'Nice.settings.collapseAllTabsBlocks(this)'
            ]);

            echo nice_button([
                'type'    => 'submit',
                'size'    => 'small',
                'text'    => 'Save Settings',
                'icon'    => [
                    'id' => 'check',
                    'size' => 'small'
                ],
                'onclick' => 'Nice.settings.updateSettings(this)'
            ]);

            ?>

        </div>

    </div>

    <div class="settings_body">

        <div class="settings_navigation SettingsNavigation">

            <div class="tabs_head">
                <?php
                foreach ( $settings['tabs'] as $tab_name => $tab_content ) {
                    echo NICE_SETTINGS::nav_element( $tab_content );
                } ?>
            </div>

            <div class="menu_toggle" onclick="Nice.settings.toggleCollapseSettingsMenu(this)">
                <?php echo nice_svg([
                    'id' => 'arrow_down',
                    'size' => 'medium'
                ]); ?>
                <span class="text">Collapse</span>
            </div>

        </div>

        <div class="settings_content">

            <?php
            foreach ( $settings['tabs'] as $tab_name => $tab_content ) {

                include('tab.php');

            } ?>

        </div>

    </div>

</div>