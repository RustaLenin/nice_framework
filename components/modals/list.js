import { NiceModals } from './area.js';

export class modalsList extends HTMLElement {

    constructor() {
        super();
        this.initModel();
    }

    connectedCallback() {
        document.addEventListener( 'modals_updated', this.updateElem.bind(this) );
    }

    disconnectedCallback(){
        document.removeEventListener( 'modals_updated', this.updateElem.bind(this) );
    }

    initModel() {
        this.state = NiceModals.modals;
        this.updateElem();
    }

    updateElem() {
        this.innerHTML = this.render();
    }

    render() {

        let state = this.state;
        let buffer = ``;

        state.forEach( function ( id, modal ) {
            let showing_icon = modal.show ? 'minus' : 'expand' ;
            buffer += `
                <div class="collapsed_modal">
                    <span class="title">${modal.icon ? Nice.svg(modal.icon) : '' } ${ modal.title }</span>
                    <span class="controls">
                        <nice-svg svg-id="${showing_icon}" svg-size="small" onclick="${id}.toggleShow()"></nice-svg>
                        <nice-svg svg-id="close" svg-size="small" onclick="${id}.close()"></nice-svg>
                    </span>
                </div>`;
        });

        return buffer;

    }

}

export function addModalList() {
    document.body.prepend( new modalsList() );
}