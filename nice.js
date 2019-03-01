'use strict';

import { niceField, regularField, vanillaField, mediaField, clearEditable, clearEditableInArea, pastePlain } from './components/fields/fields.js';
import { niceNotify, insertNotifyArea } from './components/notifications/notifications.js';
import { toggleCollapseSettingsMenu, collapseAllTabsBlocks, expandAllTabsBlocks, switchSettingsTab, toggleSettingBlock } from './components/settings/settings.js';
import { insertSvgSprite, niceSvg, regularSVGTemplate, map } from './components/svg/svg.js';
import { notFoundTemplate, binomoTempalte, defaultTempalte, insertCssVars, replaceCssVars } from './components/vars/nice_vars.js';
import { switchTabs } from './components/tabs/tabs.js'
import { toggleMetaBox } from './components/metabox/metabox.js';
import { modal, showModal, collapseModal, closeModal, defaultTemplate, exampleTemplate, insertModalArea } from './components/modals/modals.js';
import { addLoader, runLoader, addAndRunLoader, stopLoader, removeLoader} from './components/loader/loader.js';
import { validationTypes, delayFieldValidation, fieldValidation, HandleFieldsValidate, RunFieldsValidate, isCurrency, isDate, isHex, isImgUrl, isInt, isNotEmpty, isPhone, isUrl, isValidEmail, isValidLogin } from './components/validation/validation.js';
import { renderForm } from './components/form/form.js';

class Nice {

    constructor() {

        /** Inserts **/
        this.insert = {};
        this.insert.modalArea = insertModalArea;
        this.insert.svgSprite = insertSvgSprite;
        this.insert.notifyArea = insertNotifyArea;
        this.insert.cssVars = insertCssVars;

        /** Fields **/
        this.field = niceField;
        this.field.templates = {};
        this.field.templates.regular = regularField;
        this.field.templates.vanilla = vanillaField;
        this.field.templates.media = mediaField;
        this.field.clearEditable = clearEditable;
        this.field.clearEditableInArea = clearEditableInArea;
        this.field.pastePlain = pastePlain;

        /** Form **/
        this.form = renderForm;

        /** Notifications **/
        this.notify = niceNotify;

        /**Svg Sprite & svg elements **/
        this.svg = niceSvg;
        this.svg.regular = regularSVGTemplate;
        this.svg.map = map;


        /** Css Templates & vars **/
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
        this.showModal = showModal;
        this.modal.collapse = collapseModal;
        this.modal.close = closeModal;
        this.modalTemplates = {};
        this.modalTemplates['example'] = exampleTemplate;
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