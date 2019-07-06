'use strict';

console.log('Nice initializing...');
let initial_time = new Date();

/** PolyFill and JS boost **/
import { forEach, get, ajaxPost, uniqID, objectToUrlParamsRecursive } from './sugar/js.js';

/** Nice **/
import { niceField, clearEditable, clearEditableInArea, pastePlain, searchList, WPMediaForFields, updateMediaField } from './components/fields/fields.js';
import { niceNotify, insertNotifyArea } from './components/notifications/notifications.js';
import { toggleCollapseSettingsMenu, collapseAllTabsBlocks, expandAllTabsBlocks, toggleSettingBlock, updateSettings } from './components/settings/settings.js';
import { niceSvg, NiceSvg, regularSVGTemplate } from './components/svg/svg.js';
import { NiceWPEditor } from './components/fields/wp_editor.js';
import { SvgMap } from './components/svg/map.js';
import { addLightBox, lightBox } from './components/lightbox/lightbox.js';
import { chooser } from './components/chooser/chooser.js';
import { notFoundTemplate, defaultTempalte, insertCssVars, replaceCssVars } from './components/vars/nice_vars.js';
import { switchTabs } from './components/tabs/tabs.js'
import { toggleMetaBox } from './components/metabox/metabox.js';
import { modal, showModal, collapseModal, closeModal, defaultTemplate, exampleTemplate, insertModalArea } from './components/modals/modals.js';
import { addLoader, runLoader, addAndRunLoader, stopLoader, removeLoader} from './components/loader/loader.js';
import { validationTypes, delayFieldValidation, fieldValidation, loopFieldValidation, HandleFieldsValidate, RunFieldsValidate, isCurrency, isDate, isHex, isImgUrl, isInt, isNotEmpty, isPhone, isUrl, isValidEmail, isValidLogin, isValidLatin, isValidForm } from './components/validation/validation.js';
import { renderForm, collectData, collectValidData, getFieldValue, collectFlatData } from './components/form/form.js';
import { toggleSelector, chooseThis } from './components/fields/selectors.js';
import { handlePickers, handleDatePicker } from './components/pickers/pickers.js';
import { update_jQuery } from './jquery/plugins.js';
import { colorMethods } from './components/logic_patterns/color_methods.js';
import { _t, switchLocale } from './languages/translate.js';
import { en } from './languages/js/en.js';
import { ru } from './languages/js/ru.js';

/** dom-api **/
import {isInput} from './sugar/dom-api.js';

class Nice {

    constructor( args = {
        'locale': 'en'
    }) {

        console.log('Nice Construction started...');

        /** JS wrappers **/
        this.get = get;
        this.ajaxPost = ajaxPost;
        this.objectToUrlParamsRecursive = objectToUrlParamsRecursive;

        /** Inserts **/
        this.insert = {};
        this.insert.modalArea = insertModalArea;
        this.insert.notifyArea = insertNotifyArea;
        this.insert.cssVars = insertCssVars;

        /** Fields **/
        this.field = niceField;
        this.field.templates = {};
        this.field.clearEditable = clearEditable;
        this.field.clearEditableInArea = clearEditableInArea;
        this.field.pastePlain = pastePlain;
        this.field.toggleSelector = toggleSelector;
        this.field.chooseThis = chooseThis;
        this.field.searchList = searchList;
        this.field.validate = fieldValidation;
        this.field.loopFieldValidation = loopFieldValidation;
        this.field.delayValidate = delayFieldValidation;
        this.field.updateMediaField = updateMediaField;

        /** Validation **/
        this.validation = {};
        this.validation.types = validationTypes;
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
        this.validation.isValidLatin = isValidLatin;
        this.validation.isValidForm = isValidForm;

        /** Form **/
        this.form = renderForm;
        this.form.collectData = collectData;
        this.form.collectValiddata = collectValidData;
        this.form.getFieldValue = getFieldValue;
        this.form.collectFlatData = collectFlatData;

        /** Notifications **/
        this.notify = niceNotify;

        /**Svg Sprite & svg elements **/
        this.svg = niceSvg;
        this.svg.regular = regularSVGTemplate;
        this.svg.map = SvgMap;

        /** Css Templates & vars **/
        this.replaceCssVars = replaceCssVars;
        this.CSSTemplates = {};
        this.CSSTemplates.default = defaultTempalte;
        this.CSSTemplates.notFound = notFoundTemplate();

        /** Settings **/
        this.settings = {};
        this.settings.toggleCollapseSettingsMenu = toggleCollapseSettingsMenu;
        this.settings.collapseAllTabsBlocks = collapseAllTabsBlocks;
        this.settings.expandAllTabsBlocks = expandAllTabsBlocks;
        this.settings.toggleSettingBlock = toggleSettingBlock;
        this.settings.updateSettings = updateSettings;

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

        /** Pickers **/
        this.pickers = {};
        this.pickers.handle = handlePickers;
        this.pickers.handleData = handleDatePicker;
        this.pickers.media = WPMediaForFields;

        /** colorMethods **/
        this.colorMethods = colorMethods;

        /** Local's **/
        this._t = _t;
        this.locals = {};
        this.locals.en = en;
        this.locals.ru = ru;
        this.currentLocale = eval(args['locale']);
        this.switchLocale = switchLocale;

        update_jQuery();

        let end_time = new Date();
        let res_time = end_time - initial_time;
        console.log( _t('Nice Construction ended in ') + res_time + 'ms' );
    }
}

forEach();
window.Nice = new Nice();
window.dom = {};
window.dom.isInput = isInput;
window.uniqID = uniqID;
customElements.define('nice-svg', NiceSvg );
customElements.define('nice-wp_editor', NiceWPEditor );
customElements.define('nice-lightbox', lightBox );
customElements.define('nice-chooser', chooser );
addLightBox();
console.log( _t('Nice added in document') );
console.log( window.Nice );
