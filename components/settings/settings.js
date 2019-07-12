export class NiceSettings extends HTMLElement {

    defaultModel = {
        'title': 'Nice Settings',
    };

    currentModel = {};

    constructor() {
        super();
        this.innerHTML = this.render();
    }

    render() {

        let buffer = ``;
        buffer += this.renderHeader();
        buffer += this.renderMenu();
        buffer += this.renderContent();

        return buffer;

    }

    renderHeader() {
        let model = this.currentModel;
        return `
    <div class="settings_header">

        <div class="settings_title">
            ${ model.title }
        </div>

        <div class="settings_buttons">

            <span class="nice_button small" onclick="Nice.settings.expandAllTabsBlocks(this)">
                ${Nice.svg({'id': 'double_arrow_down', 'size': 'small'})} 
                ${_t('Expand All')}
            </span>
            
            <span class="nice_button small" onclick="Nice.settings.collapseAllTabsBlocks(this)">
                ${Nice.svg({'id': 'double_arrow_down', 'size': 'small', 'rotate': true })} 
                ${_t('Collapse All')}
            </span>

            <span class="nice_button small submit" onclick="Nice.settings.updateSettings(this)">
                ${Nice.svg({'id': 'double_arrow_down', 'size': 'small', 'rotate': true })} 
                ${_t('Save Settings')}
            </span>

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