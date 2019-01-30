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
    handleModal( props['area'] );
}

export function handleModal( area ) {

    if ( typeof area === 'undefined' ) {
        area = '.ModalArea';
    }

    jQuery( area ).on('click', '.collapseModal', function () {
        collapseModal( area );
    });

    jQuery( area ).on('click', '.closeModal', function () {
        closeModal( area );
    });

    jQuery( area ).on('mousedown', function (e) {
        if ( e.target === this ) {
            collapseModal( area );
        }
    });

    jQuery(document).on( 'keyup', function (e) {
        if ( e.key === 'Escape' ) {
            collapseModal( area );
        }
    });

}

export function showModal( area = '.ModalArea' ) {
    jQuery( area ).addClass('show');
}

export function collapseModal( area = '.ModalArea') {
    jQuery( area ).removeClass('show');
}

export function closeModal( area = '.ModalArea' ) {
    jQuery( area ).removeClass('show');
    setTimeout( function () {
        jQuery(area).html('');
    }, 400);
}

export const defaultTemplate = `
    <div class="modal Modal">

    <div class="header">
        <span class="title">Here is some title</span>

        <div class="control">
            <span class="nice_svg small CollapseModal click_able"><svg><use href="#minus"></use></svg></span>
            <span class="nice_svg small CloseModal close_button click_able"><svg><use href="#close"></use></svg></span>
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