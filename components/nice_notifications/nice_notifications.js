console.log('nice notifications loaded...');

export function InsertNotifyArea() {
    jQuery(document.body).prepend('<div class="notify_area NotifyArea"></div>');
}

export function NiceNotify( notify ) {

    var area = '.NotifyArea';

    if ( typeof notify === 'undefined' ) { notify = {}; }
    if ( typeof notify['type'] === 'undefined' ) { notify['type'] = 'info'; }
    if ( typeof notify['title'] === 'undefined' ) { notify['title'] = 'Notification'; }
    if ( typeof notify['message'] === 'undefined' ) { notify['message'] = 'Something happens ¯\\_(ツ)_/¯'; }

    jQuery(area).prepend( RenderNotify( notify ) );
    jQuery(area).find('.Notify:first-of-type').addClass('show').delay(3500).animate({
        right: -800,
        opacity: 0
    }, 1000, function () {
        jQuery(this).remove();
    });

}

export function RenderNotify( notify) {
    return `
    <div class="notify Notify ${notify.type}">
        <span class="nice_svg large"><svg><use href="#notify_${notify.type}"></use></svg></span>
        <div class="body">
            <span class="title">${notify.title}</span>
            <span class="message">${notify.message}</span>
        </div>
    </div>
    `;
}