import { NiceModals } from './area.js';

export class NiceModal extends HTMLElement {

    constructor( id = null ) {
        super();
        this.classList.add('nice-modal');
        if ( id ) { this.setAttribute('id', id ); }
        else { id = window.uniqID(); this.setAttribute('id', id ); }
        this.initState();
        this.updateElem();
    }

    initState() {
        let id = this.getAttribute('id');
        this.state = NiceModals.modals[id];
    }

    updateClass() {
        let state = this.state;
        if ( state.show ) {
            this.classList.add('show');
        } else {
            if ( this.classList.contains('show') ) {
                this.classList.remove('show');
            }
        }
    }

    updateElem() {
        this.updateClass();
        this.innerHTML = this.render();
    }

    render() {
        let buffer = ``;
        buffer += this.renderHeader();
        buffer += this.renderBody();
        buffer += this.renderFooter();
        return buffer;
    }

    renderHeader() {
        let id = this.getAttribute('id');
        let state = this.state;
        return `<div class="header">
                    
                    <span class="title">
                        ${ state.icon ? Nice.svg( state.icon ) : '' }
                        ${ state.title }
                    </span>

                    <div class="control">
                        <nice-svg svg-id="minus" svg-size="tiny" svg-pointer="true" onclick="${id}.collapse()" svg-tooltip="${ t_('Collapse') }"></nice-svg>
                        <nice-svg svg-id="close" svg-size="tiny" svg-pointer="true" onclick="${id}.close()" svg-tooltip="${ t_('Close') }" ></nice-svg>
                    </div>

                </div>`;
    }

    renderBody() {
        let state = this.state;
        let content = ``;

        if (state.content && state.data) {
            content = state.content(state.data);
        } else if (state.content) {
            if (typeof state.content === 'function') {
                content = state.content();
            } else {
                content = state.content;
            }
        }

        return `
            <div class="body ${state.no_padding ? 'no_padding': ''}">
                ${ content }
            </div>`
    }

    renderFooter() {
        let state = this.state;
        if ( state.hide_footer ) {
            return ``;
        } else {
            return `<div class="footer">
                    <nice-button type="submit" icon="send" text="${state.submit_text}" onclick="${state.submit ? state.submit : '' }"></nice-button>
                </div>`
        }
    }

    collapse() {
        NiceModals.actions.collapseAllModals();
        this.updateClass();
    }

    close() {
        let id = this.getAttribute('id');
        delete NiceModals.modals[id];
        NiceModals.show = false;
        NiceModals.currentModal = '';
        this.innerHTML = ' ';
        this.remove();
        // document.querySelector('#'+id).remove();
        document.dispatchEvent( NiceModals.events.modals_updated );
    }

    show() {
        NiceModals.actions.collapseAllModals();
        this.state.show = true;
        NiceModals.show = true;
        NiceModals.currentModal = this.getAttribute('id');
        this.updateClass();
        document.dispatchEvent( NiceModals.events.modals_updated );
    }

    toggleShow() {
        let state = this.state;
        state.show ? this.collapse() : this.show();
    }

}

export function newModal( model ) {
    let id = window.uniqID();
    NiceModals.actions.collapseAllModals();
    NiceModals.modals[id] = model;
    NiceModals.modals[id].show = true;
    let modal = new NiceModal( id );
    document.querySelector('nice-modal_area').prepend( modal );
    NiceModals.show = true;
    NiceModal.currentModal = id;
    document.dispatchEvent( NiceModals.events.modals_updated );
    return modal;
}