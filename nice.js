'use strict';

import { niceField, regularField, vanillaField, mediaField, clearEditable, clearEditableInArea, pastePlain } from './components/fields/fields.js';
import { niceNotify, insertNotifyArea } from './components/notifications/notifications.js';
import { toggleCollapseSettingsMenu, collapseAllTabsBlocks, expandAllTabsBlocks, switchSettingsTab, toggleSettingBlock } from './components/settings/settings.js';
import { insertSvgSprite } from './components/svg/svg.js';
import { notFoundTemplate, binomoTempalte, defaultTempalte, insertCssVars, replaceCssVars } from './components/vars/nice_vars.js';
import { switchTabs } from './components/tabs/tabs.js'
import { toggleMetaBox } from './components/metabox/metabox.js';
import { modal, handleModal, showModal, collapseModal, closeModal, defaultTemplate } from './components/modals/modals.js';
import { addLoader, runLoader, addAndRunLoader, stopLoader, removeLoader} from './components/loader/loader.js';
import { validationTypes, delayFieldValidation, fieldValidation, HandleFieldsValidate, RunFieldsValidate, isCurrency, isDate, isHex, isImgUrl, isInt, isNotEmpty, isPhone, isUrl, isValidEmail, isValidLogin } from './components/validation/validation.js';

class Nice {

    constructor() {

        /** Fields **/
        this.field = niceField;
        this.field.templates = {};
        this.field.templates.regular = regularField;
        this.field.templates.vanilla = vanillaField;
        this.field.templates.media = mediaField;
        this.field.clearEditable = clearEditable;
        this.field.clearEditableInArea = clearEditableInArea;
        this.field.pastePlain = pastePlain;

        /** Notifications **/
        this.notify = niceNotify;
        this.insertNotifyArea = insertNotifyArea;

        /**Svg Sprite & svg elements **/
        this.insertSvgSprite = insertSvgSprite;

        /** Css Templates & vars **/
        this.insertCssVars = insertCssVars;
        this.replaceCssVars = replaceCssVars;
        this.CSSTemplates = {};
        this.CSSTemplates.default = defaultTempalte;
        this.CSSTemplates.binomo = binomoTempalte();
        this.CSSTemplates.notFound = notFoundTemplate();

        /** Settings **/
        this.settings = {};
        this.settings.toggleCollapseSettingsMenu = toggleCollapseSettingsMenu;
        this.settings.collapseAllTabsBlocks = collapseAllTabsBlocks;
        this.settings.expandAllTabsBlocks = expandAllTabsBlocks;
        this.settings.switchSettingsTab = switchSettingsTab;
        this.settings.toggleSettingBlock = toggleSettingBlock;

        /** Tabs **/
        this.switchTabs = switchTabs;

        /** MetaBox **/
        this.toggleMetaBox = toggleMetaBox;

        /** Modals **/
        this.modal = modal;
        this.handleModal = handleModal;
        this.showModal = showModal;
        this.collapseModal = collapseModal;
        this.closeModal = closeModal;
        this.modalTemplates = {};
        this.modalTemplates['default'] = defaultTemplate;

        /** Loader **/
        this.addLoader = addLoader;
        this.runLoader = runLoader;
        this.addAndRunLoader = addAndRunLoader;
        this.stopLoader = stopLoader;
        this.removeLoader = removeLoader;

        /** Validation **/
        this.validation = {};
        this.validation.types = validationTypes;
        this.validation.fieldValidation = fieldValidation;
        this.validation.delayFieldValidation = delayFieldValidation;
        this.validation.HandleFieldsValidate = HandleFieldsValidate;
        this.validation.RunFieldsValidate = RunFieldsValidate;
        this.validation.isCurrency = isCurrency;
        this.validation.isDate = isDate;
        this.validation.isHex = isHex;
        this.validation.isImgUrl = isImgUrl;
        this.validation.isInt = isInt;
        this.validation.isNotEmpty = isNotEmpty;
        this.validation.isPhone = isPhone;
        this.validation.isUrl = isUrl;
        this.validation.isValidEmail = isValidEmail;
        this.validation.isValidLogin = isValidLogin;

    }
}

jQuery(document).ready(function () {
   window.Nice = new Nice();
    console.log('Nice framework loaded and ready');
    console.log( window.Nice );
});