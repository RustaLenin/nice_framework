export function insertNotifyArea() {
    jQuery(document.body).prepend('<div class="notify_area NotifyArea"></div>');
}

export function niceNotify( notify ) {

    let area = '.NotifyArea';

    if ( typeof notify === 'undefined' ) { notify = {}; }
    if ( typeof notify['type'] === 'undefined' && notify['result'] === 'undefined' ) { notify['type'] = 'info'; }
    if ( typeof notify['type'] === 'undefined' && notify['result'] ) { notify['type'] = notify['result']; }
    if ( typeof notify['title'] === 'undefined' ) { notify['title'] = 'Notification'; }
    if ( typeof notify['message'] === 'undefined' ) { notify['message'] = 'Something happens ¯\\_(ツ)_/¯'; }

    jQuery(area).prepend( renderNotify( notify ) );
    jQuery(area).find('.Notify:first-of-type').addClass('show').delay(3500).animate({
        right: -800,
        opacity: 0
    }, 1000, function () {
        jQuery(this).remove();
    });

}

export function renderNotify( notify) {
    return `
    <div class="notify Notify ${notify.type}">
        <span class="nice_svg large">${Nice.svg({'id': 'notify_' + notify.type})}</span>
        <div class="body">
            <span class="title">${notify.type}</span>
            <span class="message">${notify.message}</span>
        </div>
    </div>
    `;
}