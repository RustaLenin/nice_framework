import { UISprite } from './sprites/ui.js';

console.log('nice svg loaded...');

jQuery(document).ready(function () {
    jQuery(document.body).prepend( UISprite );
});