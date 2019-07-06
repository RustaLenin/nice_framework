export function validateHandlers( field ) {
    if ( field['validation'] ) {
        return `
        oninput="Nice.field.delayValidate(this); this.closest('.nice_field').classList.remove('error', 'success');"
        onfocus="Nice.field.delayValidate(this); this.closest('.nice_field').classList.remove('error', 'success');"
        onfocusout="Nice.field.validate(this)"
        onpaste="Nice.field.pastePlain(event); Nice.field.validate(this);"
        `;
    } else {
        return 'onpaste="Nice.field.pastePlain(event);"';
    }
}

export function fieldIcon( field ) {
    if ( field['icon'] ) {
        if ( typeof field['icon'] === 'object' ) {
            return  Nice.svg( field['icon'] );
        } else if (  typeof field['icon'] === 'string' ) {
            return Nice.svg({
                'id': field['icon'],
                'class': field['icon_class'],
                'size': field['size']
            });
        } else {
            return ``;
        }
    } else {
        return ``;
    }
}

export function validateIcons( field ) {
    if ( field['validation'] !== 'false' ) {
        return `
            ${ Nice.svg({
            'id': 'check',
            'class': 'success_icon'
        })}
            ${ Nice.svg({
            'id': 'close',
            'class': 'error_icon'
        })}
        `;
    } else {
        return ``;
    }
}