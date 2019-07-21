import { isJson } from '../../sugar/js.js';
import { niceButton } from '../buttons/button.js';

export class NiceSettings extends HTMLElement {



    constructor() {
        super();
        this.defaultModel = {
            'title': 'Nice Settings',
            'button_expand': {
                'text': Nice._t('Expand All'),
                'icon': 'double_arrow_down',
                'size': 'small',
                'onclick': '',
                'type': 'regular'
            },
            'button_collapse': {
                'text': Nice._t('Collapse All'),
                'icon': {
                    'id': 'double_arrow_down',
                    'rotate': true
                },
                'size': 'small',
                'onclick': ''
            },
            'button_submit': {
                'text': Nice._t('Save Settings'),
                'icon': 'check',
                'size': 'small',
                'onclick': '',
            },
            'menu': {},
            'blocks': {},
            'fields': {}
        };

        this.currentModel = {};
        this.init();
        this.innerHTML = this.render();
    }

    render() {

        let buffer = ``;
        buffer += this.renderHeader();
        buffer += this.renderMenu();
        buffer += this.renderContent();

        return buffer;

    }

    init(){

        let dataString = this.getAttribute('data');
        let data =  isJson( dataString ) ? JSON.parse( dataString ) : eval( dataString );
        let newModel = {};
        Object.assign( newModel, this.defaultModel, data );
        this.currentModel = newModel;

    }

    renderHeader() {
        let model = this.currentModel;
        return `
    <div class="settings_header">

        <div class="settings_title">
            ${ model.title }
        </div>

        <div class="settings_buttons">
            
            ${ niceButton( model.button_expand ) }
            
            ${ niceButton( model.button_collapse ) } 
            
            ${ niceButton( model.button_submit ) }         

        </div>

    </div>`;
    }

    renderMenu() {
        let model = this.currentModel;
        return ``;
    }

    renderContent() {
        let model = this.currentModel;
        return ``;
    }

}



export function toggleCollapseSettingsMenu( elem ) {
    jQuery(elem).parent('.SettingsNavigation').toggleClass('collapsed');
}

export function toggleSettingBlock( elem ) {
    let Block = jQuery( elem );
    Block.parents('.SettingBlock').toggleClass('collapsed');
}

export function expandAllTabsBlocks( elem ) {

    let SettingsArea = jQuery(elem).parents('.SettingsContainer');
    if ( !SettingsArea ) {
        SettingsArea = document
    }

    SettingsArea.find('.SettingBlock').removeClass('collapsed');

}

export function collapseAllTabsBlocks( elem ) {

    let SettingsArea = jQuery(elem).parents('.SettingsContainer');
    if ( !SettingsArea ) {
        SettingsArea = document
    }

    SettingsArea.find('.SettingBlock').addClass('collapsed');

}

export function updateSettings( elem ) {

    let settingsBlock = jQuery(elem).parents('.SettingsContainer');
    let data = Nice.form.collectData( '.input', settingsBlock);
    console.log( data );
}