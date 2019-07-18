import { isJson } from '../../sugar/js.js';

export function defaultModel() {
    return {
        'text': 'Nice button',
        'type': 'regular',
        'icon': false,
        'size': 'medium',
        'onclick': ''
    };
}

export class NiceButton extends HTMLElement {

    defaultModel = defaultModel;

    currentModel = {};

    constructor(){
        super();
        this.init();
        this.updateClass();
        this.innerHTML = this.render();
    }

    init() {

        let newModel = {};

        let dataString = this.getAttribute('data');
        let data =  isJson( dataString ) ? JSON.parse( dataString ) : eval( dataString );

        if ( data ) {
            Object.assign( newModel, this.defaultModel(), data );
            this.currentModel = newModel;
        } else {
            let defaultModel = this.defaultModel();
            newModel.size = this.getAttribute('size') ? this.getAttribute('size') : defaultModel.size;
            newModel.type = this.getAttribute('type') ? this.getAttribute('type') : defaultModel.type;
            newModel.text = this.getAttribute('text') ? this.getAttribute('text') : defaultModel.text;
            newModel.icon = this.getAttribute('icon') ? this.getAttribute('icon') : defaultModel.icon;
            this.currentModel = newModel;
        }

        if ( this.currentModel.onclick ) {
            this.setAttribute('onclick', this.currentModel.onclick);
        }

    }

    render() {
        let model = this.currentModel;
        let buffer = ``;

        if ( model.icon ) {
            buffer += Nice.svg( model.icon );
        }
        buffer += `<span class="text">${model.text}</span>`;

        return buffer;
    }

    updateClass() {
        let model = this.currentModel;
        this.classList.add( model.size );
        this.classList.add( model.type )
    }

}

export function niceButton( data ) {

    let button = Object.assign( defaultModel(), data );

    return `<nice-button
        size="${button.size}"
        type="${button.type}"
        text="${button.text}"
        icon="${button.icon}"
        onclick="${button.onclick}"
    ></nice-button>`;
}