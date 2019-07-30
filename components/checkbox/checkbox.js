export class NiceCheckbox extends HTMLElement {

    constructor() {
        super();

        this.defaultModel = {
            'checked': 'false',
            'description': false,
            'name': 'nice-checkbox',
            'callback': null,
            'size': 'medium',
        };
        this.updateElem();
        this.setAttribute('onclick', 'this.toggleCheckbox()');
        this.classList.add('input');

    }

    static get observedAttributes() {
        return [ 'checked', 'description', 'name', 'callback', 'size', 'data' ];
    }

    attributeChangedCallback( name, oldValue, newValue ) {
        this.updateElem();
    }

    updateElem(){

        let
            defaults = this.defaultModel,
            attrs = {},
            newModel = {},
            self = this,
            data = this.getAttribute('data')
        ;
        if ( eval( data ) ) {
            newModel = Object.assign( {}, defaults, eval(data) );
        } else {
            /** Get all attributes from element **/
            defaults.forEach( function ( key, val ) {
                attrs[key] = self.getAttribute( key );
            });
            /** Combine new Model with data from attributes, or defaults **/
            defaults.forEach( function ( key, val ) {
                newModel[key] = attrs[key] ? attrs[key] : val;
            });
        }

        if ( typeof newModel['checked'] === 'string' ) {
            if ( newModel['checked'] === 'true' ) {
                newModel['checked'] = true;
            } else {
                newModel['checked'] = false;
            }
        }

        this.currentModel = newModel;
        this.innerHTML = this.render();
        this.updateClass();
    }

    render(){
        let buffer = `<span class="box"><nice-svg svg-id="check"></nice-svg></span>`;
        if ( this.currentModel.description ) {
            buffer += `<span class="checkbox_description">${ this.currentModel.description }</span>`
        }
        return buffer;
    }

    updateClass(){
        let model = this.currentModel;
        if ( model.isChecked ) {
            this.classList.add('checked');
        } else {
            if ( this.classList.contains('checked') ) {
                this.classList.remove('checked');
            }
        }
        this.classList.remove('tiny', 'small', 'medium', 'large', 'huge');
        this.classList.add( model.size );
    }

    isChecked() {
        return this.currentModel.checked;
    }

    name() {
        return this.currentModel.name;
    }

    toggleCheckbox() {
        this.classList.toggle('checked');
        this.currentModel.checked = !this.currentModel.checked;
        if ( this.currentModel.callback ) {
            eval( this.currentModel.callback );
        }
    }

}