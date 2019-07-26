import { isJson } from '../../sugar/js.js';

export function defaultModel() {
    return {
        'text': 'Nice button',
        'type': 'regular',
        'icon': false,
        'size': 'medium',
        'onclick': '',
        'icon_rotate': ''
    };
}

export class NiceButton extends HTMLElement {

    constructor(){
        super();
        this.currentModel = {};
        this.defaultModel = defaultModel;
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
            newModel.icon_rotate = this.getAttribute('icon_rotate') ? this.getAttribute('icon_rotate') : defaultModel.icon_rotate;
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
        this.classList.add( model.type );
        if ( model.icon_rotate ) {
            this.classList.add('icon_rotate');
        }
    }

    isLoading() {
        return this.classList.contains('loading');
    }

    setLoading() {
        let model = this.currentModel;
        this.classList.add('loading');
        if ( model.icon ) {
            model.preloadingIcon = this.querySelector('nice-svg').getAttribute('svg-id');
            this.querySelector('nice-svg').setAttribute('svg-id', 'loader');
            this.querySelector('nice-svg').classList.add('spin');
        }
        model.preloadingText = this.querySelector('.text').innerHTML;
        this.querySelector('.text').innerHTML = Nice._t('Loading');
    }

    removeLoading() {
        let model = this.currentModel;
        this.classList.remove('loading');
        if ( model.preloadingIcon ) {
            model.preloadingIcon = this.querySelector('nice-svg').setAttribute('svg-id', model.preloadingIcon );
            this.querySelector('nice-svg').classList.remove('spin');
        }
        this.querySelector('.text').innerHTML = model.preloadingText;
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
        ${ button.icon_rotate ? `icon_rotate="true"` : ''}
    ></nice-button>`;
}