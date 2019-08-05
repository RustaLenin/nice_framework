export const NiceModals =  {
    'show': false,
    'modals': {

    },
    'events': {
        'modals_updated': new Event('modals_updated')
    },
    'currentModal': '',
    'actions': {
        collapseAllModals
    }
};

export class modalArea extends HTMLElement {

    constructor() {
        super();
        this.initModel();
        this.innerHTML = this.render();
    }

    connectedCallback() {
        document.addEventListener( 'modals_updated', this.updateElem.bind(this) );
    }

    disconnectedCallback(){
        document.removeEventListener( 'modals_updated', this.updateElem.bind(this) );
    }

    initModel(){
        this.state = NiceModals;
        this.updateElem();
    }

    updateElem() {
        this.updateClass();
    }

    render() {

        let state = this.state;
        this.updateClass();

        let buffer = ``;

        state.modals.forEach( function ( key, val ) {
            buffer += `<nice-modal id="${key}"></nice-modal>`;
        });

        return buffer;

    }

    updateClass() {
        let model = this.state;
        if ( model.show ) {
            this.classList.add('show');
        } else {
            if ( this.classList.contains('show') ) {
                this.classList.remove('show')
            }
        }
    }

    show() {
        this.state.show = true;
        this.classList.add('show');
        return 'Modal area showing';
    }

    hide() {
        this.state.show = false;
        this.classList.remove('show');
        return 'Modal area hiding';
    }

}

export function addModalArea() {
    document.body.prepend( new modalArea() );
}

function collapseAllModals() {
    NiceModals.show = false;
    NiceModals.currentModal = '';
    NiceModals.modals.forEach( function ( modal, model ) {
        model.show = false;
        if( document.querySelector('#'+modal).classList.contains('show') ) {
            document.querySelector('#'+modal).classList.remove('show');
        }
    });
    document.dispatchEvent( NiceModals.events.modals_updated );
}