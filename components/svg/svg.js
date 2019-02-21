console.log('nice svg loaded...');

import { Sprite } from './sprite/sprite.js';

export function insertSvgSprite() {
    jQuery(document.body).prepend( Sprite );
}