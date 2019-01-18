'use strict';

console.log('nice_settings.js loaded...');

export function ToggleCollapseSettingsMenu( elem ) {
    jQuery(elem).parent('.SettingsNavigation').toggleClass('collapsed');
}

export function SwitchSettingsTab( elem ) {

    let Tab = jQuery(elem);

    let TabName = Tab.attr('data-tab');                                     // Get name of tab on which we will switch
    if ( !TabName ) {
        return                                                                    // If no name in data attribute - stop working
    }

    let TabArea = Tab.parents('.SettingsContainer');                              // Get area of tab on which we will switch
    if ( !TabArea ) {
        TabArea = document                                                        // If no such area, try to find elements in document
    }

    TabArea.find('.TabsContent').removeClass('current');                          // Remove active class from all tabs content wrappers
    TabArea.find('.MenuTab').removeClass('current');                              // Remove active class from all tabs buttons
    Tab.addClass('current');                                                      // Add active class to clicked tab
    TabArea.find( '.TabsContent' + '[data-tab='+TabName+']').addClass('current'); // Add active class to needed tab

}

export function ToggleSettingBlock( elem ) {
    let Block = jQuery( elem );
    Block.parents('.SettingBlock').toggleClass('collapsed');
}

export function ExpandAllTabsBlocks( elem ) {

    let SettingsArea = jQuery(elem).parents('.SettingsContainer');
    if ( !SettingsArea ) {
        SettingsArea = document
    }

    SettingsArea.find('.SettingBlock').removeClass('collapsed');

}

export function CollapseAllTabsBlocks( elem ) {

    let SettingsArea = jQuery(elem).parents('.SettingsContainer');
    if ( !SettingsArea ) {
        SettingsArea = document
    }

    SettingsArea.find('.SettingBlock').addClass('collapsed');

}