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
    }

    updateElem() {
        this.innerHTML = this.render();
        this.updateClass();
    }

    render() {
        let nice_settings = this.closest('nice-settings');
        let model = this.currentModel;
        let buffer = ``;

        buffer += `<div class="block_header"><span class="block_title">${ Nice.svg(model.icon) } ${model.title}</span> ${Nice.svg({'id': 'arrow_down'})}</div>`;

        console.log( model.fields);
        console.log( nice_settings.currentModel );

        model.fields.forEach( function ( field ) {
            Nice.field( nice_settings.currentModel.fields[field] );
        });

        return buffer;
    }

    updateClass(){
        let model = this.currentModel;
        if ( !model.open ) {
            this.classList.add('hidden');
        } else {
            if ( this.classList.contains('hidden') ) {
                this.classList.remove('hidden');
            }
        }
    };

}