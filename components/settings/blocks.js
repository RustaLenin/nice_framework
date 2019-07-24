export class NiceSettings_Blocks extends HTMLElement {

    constructor() {
        super();
        this.init();
        this.updateElem();
    }

    init() {
        let id = this.getAttribute('block-id');
        let nice_settings = this.closest('nice-settings');
        this.currentModel = nice_settings.currentModel.blocks[id];
        this.setAttribute('onclick', 'Nice.settings.toggleBlock(this)' );
    }

    updateElem() {
        this.innerHTML = this.render();
        this.updateClass();
    }

    render() {
        let nice_settings = this.closest('nice-settings');
        let model = this.currentModel;
        let buffer = ``;

        buffer += `
                <div class="block_header">
                    <span class="block_title">${ Nice.svg(model.icon) } ${model.title}</span> 
                    ${Nice.svg({'id': 'arrow_down', 'click_able': 'true', 'class': 'toggle_icon'})}
                </div>`;
        buffer += `<div class="block_content">`;

        model.fields.forEach( function ( field ) {
            buffer += Nice.field( nice_settings.currentModel.fields[field] );
        });

        buffer += `</div>`;

        return buffer;
    }

    updateClass(){
        let model = this.currentModel;

        if ( typeof model.open === 'undefined' ) {
            if ( this.classList.contains('hidden') ) {
                this.classList.remove('hidden');
            }
            model.open = true;
        } else {
            if ( !model.open ) {
                this.classList.add('hidden');
                model.open = false;
            } else {
                if ( this.classList.contains('hidden') ) {
                    this.classList.remove('hidden');
                }
                model.open = true;
            }
        }
    };

}

export function toggleBlock( elem ) {
    let block = elem.closest('nice-settings_block');
    block.classList.toggle('hidden');
    block.currentModel.open = !block.currentModel.open;
}

export function expandAll( elem ) {
    let nice_settings = elem.closest('nice-settings');
    let blocks = nice_settings.querySelectorAll('nice-settings_block');
    blocks.forEach( function ( block ) {
        block.classList.remove('hidden');
        block.currentModel.open = true;
    });
}

export function collapseAll( elem ) {
    let nice_settings = elem.closest('nice-settings');
    let blocks = nice_settings.querySelectorAll('nice-settings_block');
    blocks.forEach( function ( block ) {
        block.classList.add('hidden');
        block.currentModel.open = false;
    });
}