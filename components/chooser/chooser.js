export class chooser extends HTMLElement {


    constructor() {

        super();
        this.defaultModel = {
            'title': 'Nice title',
            'current_text': '',
            // 'current_value': '',
            'current_description': '',
            'current_key': '',
            'list': {
                'elem_1': {
                    'icon': false,
                    'text': 'Choosed element',
                    'current': true,
                    'permission': 'all',
                    'description': '123'
                },
                'elem_2': {
                    'icon': false,
                    'text': 'Regular element',
                    'current': false,
                    'permission': 'all',
                    'description': '456'
                },
                'elem_3': {
                    'icon': 'cog',
                    'text': 'Element with icon',
                    'current': false,
                    'permission': 'all',
                    'description': '789'
                }
            }
        };

        this.currentModel = {};

        let data = eval( this.getAttribute('data') );
        let listen = this.getAttribute('listen');
        this.updateElem( data );

        if ( listen ) {
            let self = this;
            document.addEventListener( listen, function () {
                self.updateView();
            });
        }
    }

    renderElem() {

        let data = this.currentModel;

        let buffer = ``;
        buffer += `<div class="chooser_title">${data['title']}</div><div class="chooser_content">`;
        buffer += this.renderList();
        buffer += `<div class="description">${data['current_description']}</div></div>`;
        return buffer;

    }

    renderList() {

        let list = this.currentModel.list;

        let buffer = `<div class="list">`;

        list.forEach( function ( key, elem ) {
            buffer += `<span 
            class="list_element${ elem['current'] ? ' current' : '' }" 
            onclick="this.closest('nice-chooser').setCurrent(this, '${key}' )">
                <span class="list_element__icon">${ Nice.svg(elem['icon'])}</span>
                <span class="list_element__text">${elem['text']}</span>
            </span>`;
        });

        buffer += `</div>`;

        return buffer;

    }

    setCurrent( currentElem, key ) {
        let list = this.currentModel.list;
        let prev_key =  this.currentModel.current_key;

        list[prev_key]['current'] = false;

        this.currentModel.current_key = key;
        list[key]['current'] = true;
        this.currentModel['current_description'] = list[key]['description'];
        this.updateView();
    }

    updateElem( newData) {
        let newModel = {};
        Object.assign( newModel, this.defaultModel, newData );
        newModel.list.forEach( function ( key, listElem ) {
           if ( listElem['current'] ) {
               newModel['current_text'] = listElem['text'];
               newModel['current_description'] = listElem['description'];
               newModel['current_key'] = key;
           }
        });
        this.currentModel = newModel;
        this.updateView();
    }

    updateView() {
        this.innerHTML = this.renderElem();
    }

}