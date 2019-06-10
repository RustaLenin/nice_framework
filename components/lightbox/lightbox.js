export class lightBox extends HTMLElement {

    constructor() {
        super();

        this.setAttribute('onclick', 'lightbox.closeSelf(event)');

        this.innerHTML = `
            <nice-svg svg-id="close" svg-class="close_lightbox" svg-pointer="true" svg-size="medium" onclick="lightbox.close();"></nice-svg>
            <img class="preview_image" src="">`
    }

    connectedCallback() {
        window.lightbox = this;
    }

    disconnectedCallback() {
        delete window.lightbox;
    }

    open(){
        this.classList.add('open');
        return '';
    }

    close(){
        if ( this.classList.contains('open') ) {
            this.classList.remove('open');
        }
        return '';
    }

    closeSelf( e ) {
        if ( e.target === this ) {
            this.close();
        }
    }

    clear(){
        this.querySelector('.preview_image').setAttribute( 'src', '' );
        return '';
    }

    view( url ){
        if ( !this.classList.contains('open') ) {
            this.open();
        }
        this.querySelector('.preview_image').setAttribute( 'src', url );
        return '';
    }

}

export function addLightBox() {
    document.body.prepend( new lightBox() );
}