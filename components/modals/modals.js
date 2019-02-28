export function modal( template, props ) {

    let Data;

    if ( typeof props             === 'undefined' ) { props = {}; }
    if ( typeof props['area']     === 'undefined' ) { props['area'] = '.ModalArea'; }

    if ( typeof props['modal']    === 'undefined' ) { Data = {};
    } else { Data = props['modal'] }

    console.log( Data );
    if ( !template || typeof template == 'undefined' ) { template = Nice.modalTemplates['default']; }
    let html = ejs.render( template, Data );
    jQuery( props['area'] ).html( html );
    showModal( props['area'] );
}

export function insertModalArea() {
    jQuery(document.body).prepend( modalArea );
}

export function showModal( area = '.ModalArea' ) {
    jQuery( area ).addClass('show');
}

export function collapseModal( element = null, event = null ) {
    if ( element && event ) {
        if ( element === event.target ) {
            jQuery( '.ModalArea' ).removeClass('show');
        }
    } else {
        jQuery( '.ModalArea' ).removeClass('show');
    }

}

export function closeModal() {
    jQuery('.ModalArea').removeClass('show');
    setTimeout( function () {
        jQuery('.ModalArea').html('');
    }, 400 );
}

export const defaultTemplate = `
<div class="nice_modal Modal">

    <div class="header">
        <span class="title">Here is some title</span>

        <div class="control">
            <%- Nice.svg({'size': 'small', 'click_able': true, 'id': 'minus', 'onclick': 'Nice.modal.collapse();'}) %>
            <%- Nice.svg({'size': 'small', 'click_able': true, 'id': 'close', 'class': 'close_button', 'onclick': 'Nice.modal.close();'}) %>
        </div>

    </div>

    <div class="body">

        Here is some modal content

    </div>

    <div class="footer">

        <div class="nice_submit">Submit Modal</div>

    </div>

</div>
`;

export const modalForm = `
<div class="nice_modal Modal">

    <div class="header">
        <span class="title"><%- modalTitle %></span>

        <div class="control">
            <%- Nice.svg({'size': 'small', 'click_able': true, 'id': 'minus', 'class': 'CloseModal', 'onclick': 'Nice.modal.collapse()'}) %>
            <%- Nice.svg({'size': 'small', 'click_able': true, 'id': 'close', 'class': 'CloseModal close_button', 'onclick': 'Nice.modal.close();'}) %>
        </div>

    </div>

    <div class="body">

        Here is some modal content

    </div>

    <div class="footer">

        <div class="nice_submit">Submit Modal</div>

    </div>

</div>
`;

const modalArea = `<div class="modal_area ModalArea" onmousedown="Nice.modal.collapse( this, event );"></div>`;