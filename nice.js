'use strict';

import { niceField, regularField, vanillaField, mediaField } from './components/nice_fields/nice_fields.js';
import { niceNotify, insertNotifyArea } from './components/nice_notifications/nice_notifications.js';
import { toggleCollapseSettingsMenu, collapseAllTabsBlocks, expandAllTabsBlocks, switchSettingsTab, toggleSettingBlock } from './components/nice_settings/nice_settings.js';
import { insertSvgSprite } from './components/nice_svg/nice_svg.js';
import { notFoundTemplate, binomoTempalte, defaultTempalte, insertCssVars, replaceCssVars } from './components/nice_vars/nice_vars.js';

class Nice {

    constructor( modules = null ) {

        if ( !modules ) {
            modules = {
                'fields':   true,
                'notify':   true,
                'svg':      true,
                'settings': true,
                'css_vars': true
            };
        }

        if ( modules['fields'] ) {
            /** Fields **/
            this.field = niceField;
            this.field.templates = {};
            this.field.templates.regular = regularField;
            this.field.templates.vanilla = vanillaField;
            this.field.templates.media = mediaField;
        }

        if ( modules['notify'] ) {
            /** Notifications **/
            this.notify = niceNotify;
            this.insertNotifyArea = insertNotifyArea;
        }

        if ( modules['svg'] ) {
            /**Svg Sprite & svg elements **/
            this.insertSvgSprite = insertSvgSprite;
        }

        if ( modules['css_vars'] ) {
            /** Css Templates & vars **/
            this.insertCssVars = insertCssVars;
            this.replaceCssVars = replaceCssVars;
            this.CSSTemplates = {};
            this.CSSTemplates.default = defaultTempalte;
            this.CSSTemplates.binomo = binomoTempalte();
            this.CSSTemplates.notFound = notFoundTemplate();
        }

        if ( modules['settings'] ) {
            /** Settings **/
            this.settings = {};
            this.settings.toggleCollapseSettingsMenu = toggleCollapseSettingsMenu;
            this.settings.collapseAllTabsBlocks = collapseAllTabsBlocks;
            this.settings.expandAllTabsBlocks = expandAllTabsBlocks;
            this.settings.switchSettingsTab = switchSettingsTab;
            this.settings.toggleSettingBlock = toggleSettingBlock;
        }

    }
}

jQuery(document).ready(function () {
   window.Nice = new Nice();
    console.log('Nice framework loaded and ready');
    console.log( window.Nice );
});