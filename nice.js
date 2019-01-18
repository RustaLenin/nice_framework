'use strict';

// import { NiceField } from './components/nice_fields/nice_fields';
import { NiceNotify, InsertNotifyArea } from './components/nice_notifications/nice_notifications';
import { ToggleCollapseSettingsMenu, CollapseAllTabsBlocks, ExpandAllTabsBlocks, SwitchSettingsTab, ToggleSettingBlock } from './components/nice_settings/nice_settings';
import { InsertSprite } from './components/nice_svg/nice_svg';

console.log('nice_framework loaded...');

function init() {
    InsertSprite();
    InsertNotifyArea();
}

jQuery(document).ready(function () {
   init();
});