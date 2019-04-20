import { Sprite } from './sprite/sprite.js';
import { SvgMap } from './sprite/map.js';

export function insertSvgSprite() {
    jQuery(document.body).prepend( Sprite );
}

export const map = SvgMap;

export function niceSvg( icon ) {

    if ( !icon )                     { icon                     = {}; }

    if ( !icon['id'] )               { icon['id']               = 'cog'; }
    if ( !icon['size'] )             { icon['size']             = 'medium'; }
    if ( !icon['click_able'] )       { icon['click_able']       = false; }
    if ( !icon['sprite'] )           { icon['sprite']           = Nice.svg.map;}

    return ejs.render( Nice.svg.regular, {'icon': icon } );

}

export const regularSVGTemplate = `
    <span 
    class="nice_svg <%- ' ' + icon['size']; %> <% if ( icon['class'] ) { %><%- ' ' + icon['class']; %><% } %> <% if ( icon['click_able'] ) { %><%- ' click_able'; %><% } %>"
    <% if ( icon['onclick'] ) { %><%- ' onclick="' + icon['onclick'] + '"'; %><% } %>
    >
        <%- icon['sprite'][icon['id']]; %>
    </span>
`;