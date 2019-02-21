<?php ?>
<div class="nice_settings SettingsContainer">

    <div class="settings_header">

        <div class="settings_title">
            <?php echo $settings['title']; ?>
        </div>

        <div class="settings_buttons">

            <div class="nice_button regular small ExpandAllTabsBlocks" onclick="ExpandAllTabsBlocks(this)">
                <span class="nice_svg tiny"><svg><use href="#double_arrow_down"></use></svg></span>
                <span class="text">Expand All</span>
            </div>

            <div class="nice_button regular small CollapseAllTabsBloocks" onclick="CollapseAllTabsBlocks(this)">
                <span class="nice_svg tiny"><svg><use href="#double_arrow_down"></use></svg></span>
                <span class="text">Collapse All</span>
            </div>

            <div class="submit_button accent small UpdateSettings">
                <span class="nice_svg small"><svg><use href="#check"></use></svg></span>
                <span class="text">Save Settings</span>
            </div>

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

            <div class="menu_toggle" onclick="ToggleCollapseSettingsMenu(this)">
                <span class="nice_svg medium">
                    <svg><use href="#arrow_down"></use></svg>
                </span>
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