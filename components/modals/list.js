export class modalsList extends HTMLElement {

    currentModel = {};

    constructor() {
        super();
        this.initModel();
        let self = this;
        document.addEventListener( 'modals_updated', function () {
            self.updateElem();
        });
    }

    initModel(){
        this.currentModel = nice_modals.modals;
        this.updateElem();
    }

    updateElem() {
        this.innerHTML = this.render();
    }

    render() {

        let model = this.currentModel;

        let buffer = ``;
        model.forEach( function ( key, val ) {
            let showing_icon = val.show ? 'minus' : 'expand' ;
            buffer += `
                <div class="collapsed_modal">
                    <span class="title">${val.icon ? Nice.svg(val.icon) : '' } ${ val.title }</span>
                    <span class="controls">
                        ${ Nice.svg({'id': showing_icon, 'onclick': `toggleModal('${key}')`, 'size': 'small'}) }
                        ${ Nice.svg({'id': 'close', 'onclick': `removeModal('${key}')`, 'size': 'small'}) }
                    </span>
                </div>`;
        });

        return buffer;

    }

}

export function addModalList() {
    document.body.prepend( new modalsList() );
}