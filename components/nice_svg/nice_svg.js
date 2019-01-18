console.log('nice svg loaded...');

import { Sprite } from './sprite/sprite';

export function InsertSprite() {
    jQuery(document.body).prepend( Sprite );
}