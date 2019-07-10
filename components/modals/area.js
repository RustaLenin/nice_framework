export class modalArea extends HTMLElement {

    currentModel = {
        'show': false,
        'modals': {

        },
        'templates': {
            'test_modal': {},
        }
    };

    constructor() {
        super();
        this.initModel();
        let self = this;
        document.addEventListener( 'modals_updated', function () {
            self.updateElem();
        });
        this.innerHTML = this.render();
    }

    initModel(){
        let model = this.currentModel;
        window.nice_modals = model;
        model.event = new Event('modals_updated');
        this.updateElem();
    }

    updateElem() {
        this.updateClass();
    }

    render() {

        let model = this.currentModel;
        this.updateClass();

        let buffer = ``;

        model.modals.forEach( function ( key, val ) {
            buffer += `<nice-modal id="${key}"></nice-modal>`;
        });

        return buffer;

    }

    updateClass() {
        let model = this.currentModel;
        if ( model.show ) {
            this.classList.add('show');
        } else {
            if ( this.classList.contains('show') ) {
                this.classList.remove('show')
            }
        }
    }

    show() {
        this.currentModel.show = true;
        this.classList.add('show');
        return 'Modal area showing';
    }

    hide() {
        this.currentModel.show = false;
        this.classList.remove('show');
        return 'Modal area hiding';
    }

}

export function addModalArea() {
    document.body.prepend( new modalArea() );
}