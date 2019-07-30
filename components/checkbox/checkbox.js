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

    render(){
        let buffer = `<span class="box"><nice-svg svg-id="check"></nice-svg></span>`;
        if ( this.currentModel.description ) {
            buffer += `<span class="checkbox_description">${this.currentModel.description}</span>`
        }
        return buffer;
    }

    updateElem(){

        let defaults = this.defaultModel;
        let attrs = {
            'checked': this.getAttribute('checked'),
            'description': this.getAttribute('description'),
            'name': this.getAttribute('name'),
            'callback': this.getAttribute('callback'),
            'size': this.getAttribute('size')
        };
        let newModel = {};
        newModel['checked'] = attrs['checked'] ? attrs['checked'] : defaults['checked'];
        newModel['description'] = attrs['description'] ? attrs['description'] : defaults['description'];
        newModel['name'] = attrs['name'] ? attrs['name'] : defaults['name'];
        newModel['callback'] = attrs['callback'] ? attrs['callback'] : defaults['callback'];
        newModel['size'] = attrs['size'] ? attrs['size'] : defaults['size'];

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