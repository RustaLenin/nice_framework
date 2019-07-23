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
                'icon': 'double_arrow_down',
                'size': 'small',
                'onclick': '',
                'icon_rotate': true,
            },
            'button_submit': {
                'text': Nice._t('Save Settings'),
                'icon': 'check',
                'size': 'small',
                'onclick': '',
                'type': 'submit',
            },
            'sidebar_collapsed': false,
            'tabs': {
                'main_settings': {
                    'icon': 'cog',
                    'text': 'Main Settings',
                    'blocks': ['address', 'mail_default'],
                    'fields': [],
                },
                'mail_settings': {
                    'icon': 'email',
                    'text': 'Mails',
                    'blocks': ['address'],
                    'fields': [],
                }
            },
            'blocks': {
                'address': {
                    'icon': false,
                    'title': 'Address',
                    'fields': ['commission']
                },
                'mail_default': {
                    'icon': 'email',
                    'title': 'Default mails settings',
                    'fields': []
                }
            },
            'fields': {
                'commission': {
                    'type': 'regular',
                    'placeholder': '20',
                    'label': 'Commission',
                    'comment_message': 'In percents'
                }
            }
        };

        this.currentModel = {};
        this.init();
        this.updateElem();
    }

    updateElem() {
        this.innerHTML = this.render();
        this.checkCurrentTab();
    }

    checkCurrentTab() {
        let model = this.currentModel;
        let currentExist = false;
        model.tabs.forEach( function ( name, tab ) {
            if ( tab.current ) {
                currentExist = true;
            }
        });
        if ( !currentExist ) {
            let firstTab = this.querySelector('.menu_element');
            firstTab.classList.add('current');
            this.currentModel.tabs[firstTab.getAttribute('data-id')].current = true;
            this.querySelector('.settings_tab').classList.add('current');
        }
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
        let buffer = `<div class="settings_body"><div class="settings_sidebar${ model.sidebar_collapsed ? ' collapsed': ''}"><div class="settings_menu">`;

        model.tabs.forEach( function ( name, tab ) {
            buffer +=
                `<span data-id="${ name }" class="menu_element${ tab.current ? ' current' : ''}" onclick="Nice.settings.switchTab( this )">
                    ${ tab.icon ? Nice.svg( tab.icon ) : '' }
                    <span class="element_text">${ tab.text }</span>
                </span>`;
        });
        buffer += `</div>`;

        buffer += `<div class="menu_element" onclick="Nice.settings.collapseSidebar(this)">${ Nice.svg({'id': 'arrow_left'}) }<span class="element_text">Collapse menu</span></div></div>`;
        return buffer;
    }

    renderContent() {
        let model = this.currentModel;
        let buffer = `<div class="settings_content">`;

        model.tabs.forEach(function (name, tab) {
            buffer += `<div data-id="${name}" class="settings_tab${ tab.current ? ' current' : ''}">`;
                tab.blocks.forEach( function ( block ) {
                   buffer += `<nice-settings_block block-id="${block}"></nice-settings_block>`
                });
            buffer += `</div>`;
        });

        buffer += '</div></div>';
        return buffer;
    }

}


export function switchTab( elem ) {

    if ( !elem.classList.contains('current') ) {
        let id = elem.getAttribute('data-id');
        let nice_settings = elem.closest('nice-settings');
        let menu_elements = nice_settings.querySelectorAll('.menu_element');
        menu_elements.forEach(function ( element ) {
            element.classList.remove('current');
        });
        elem.classList.add('current');
        let content_element = nice_settings.querySelectorAll('.settings_tab');
        content_element.forEach( function ( element ) {
            element.classList.remove('current');
        });
        nice_settings.querySelector(`.settings_tab[data-id="${id}"]`).classList.add('current');
    }
}

export function collapseSidebar( elem ) {
    let sidebar = elem.closest('.settings_sidebar');
    sidebar.classList.toggle('collapsed');
    let nice_settings = elem.closest('nice-settings');
    nice_settings.currentModel.sidebar_collapsed = !nice_settings.currentModel.sidebar_collapsed;
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