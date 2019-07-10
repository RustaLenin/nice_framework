export class NiceModal extends HTMLElement {

    defaultModel = {
        'title': 'Title',
        'icon': false,
        'submit_text': 'Submit',
        'content': emptyContent,
        'onsubmit': ''
    };

    currentModel = {};

    constructor( id, template ) {
        super();
        this.setAttribute('id', id );
        this.setAttribute('template', template );
        this.initModel( id );
    }

    initModel( id ){
        let new_model = {};
        Object.assign( new_model, this.defaultModel, nice_modals.modals[id]  );
        nice_modals.modals[id] = new_model;
        this.currentModel = nice_modals.modals[id];
        this.currentModel.id = id;
        this.updateElem();
    }

    updateElem() {
        this.innerHTML = this.render();
    }

    updateClass() {
        let model = this.currentModel;
        if ( model.show ) {
            this.classList.add('show');
        } else {
            if ( this.classList.contains('show') ) {
                this.classList.remove('show');
            }
        }
    }

    render() {
        this.updateClass();
        let buffer = ``;
        buffer += this.renderHeader();
        buffer += this.renderBody();
        buffer += this.renderFooter();
        return buffer;
    }

    renderHeader() {
        let model = this.currentModel;
        return `<div class="header">
                    
                    <span class="title">
                        ${ Nice.svg( model.icon )}
                        ${ model.title }
                    </span>

                    <div class="control">
                        <nice-svg svg-id="minus" svg-size="tiny" svg-pointer="true" onclick="toggleModal('${model.id}');"></nice-svg>
                        <nice-svg svg-id="close" svg-size="tiny" svg-pointer="true" onclick="removeModal('${model.id}')"></nice-svg>
                    </div>

                </div>`;
    }

    renderBody() {
        let model = this.currentModel;
        return `
            <div class="body">
                ${ model.content() }
            </div>`
    }

    renderFooter() {
        let model = this.currentModel;
        return `<div class="footer">
                    <div class="nice_button submit" onclick="${model.onsubmit}">${model.submit_text}</div>
                </div>`
    }

    close() {
        removeModal( this.currentModel.id );
    }

}

function emptyContent() {

}

export function newModal( template, templates = nice_modals.templates ) {
    if ( templates[template] ){
        let uniqID = window.uniqID();
        nice_modals.modals[uniqID] = Object.assign( {}, templates[template] );
        nice_modals.show = true;
        nice_modals.modals[uniqID]['show'] = true;
        document.querySelector('nice-modal_area').prepend( new NiceModal( uniqID, template ) );
        document.dispatchEvent( nice_modals.event );
        return 'Modal Open';
    } else {
        return 'No such modal';
    }
}

export function removeModal( id ) {
    delete nice_modals.modals[id];
    document.querySelector('#'+id).remove();
    nice_modals.show = false;
    document.dispatchEvent( nice_modals.event );
}

export function toggleModal( id ) {
    console.log(nice_modals.modals[id]['show']);
    if ( nice_modals.modals[id]['show'] ) {
        nice_modals.modals[id]['show'] = false;
    } else {
        nice_modals.modals[id]['show'] = true;
    }
    console.log(nice_modals.modals[id]['show']);
    document.querySelector('#'+id).updateClass();
    nice_modals.show = !nice_modals.show;
    document.dispatchEvent( nice_modals.event );
}