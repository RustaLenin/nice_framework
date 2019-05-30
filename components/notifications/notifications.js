export function insertNotifyArea() {
    jQuery(document.body).prepend('<div class="notify_area NotifyArea"></div>');
}

export function niceNotify( notify = {} ) {

    let area = '.NotifyArea';

    if (  typeof notify['type'] === 'undefined' ) {
        if( typeof notify['result'] !== 'undefined' ) {
            notify['type'] = notify['result']
        } else {
            notify['type'] = 'info';
        }

    }

    if ( typeof notify['title'] === 'undefined' ) { notify['title'] = Nice._t('Notification'); }
    if ( typeof notify['message'] === 'undefined' ) { notify['message'] = Nice._t('Something happens') + ' ¯\\_(ツ)_/¯'; }

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
        ${Nice.svg({'id': 'notify_' + notify.type, 'size': 'large'})}
        <div class="body">
            <span class="title">${notify.title}</span>
            <span class="message">${notify.message}</span>
        </div>
    </div>
    `;
}