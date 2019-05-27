import {Sprite} from './sprite/sprite.js';
import {SvgMap} from './sprite/map.js';

export function insertSvgSprite() {
    jQuery(document.body).prepend(Sprite);
}

export const map = SvgMap;

export function niceSvg(icon) {
    if (!icon) {
        icon = {};
    }

    if (!icon['id']) {
        icon['id'] = 'cog';
    }
    if (!icon['size']) {
        icon['size'] = 'medium';
    }
    if (!icon['click_able']) {
        icon['click_able'] = false;
    }
    if (!icon['sprite']) {
        icon['sprite'] = Nice.svg.map;
    }

    return ejs.render(Nice.svg.regular, {'icon': icon});

}

export class NiceSvg extends HTMLElement {
    constructor(){
        super();
        let svg_id = this.getAttribute('svg-id');
        let svg_class = this.getAttribute('svg-class');
        let svg_size = this.getAttribute('svg-size');
        let svg_click = this.getAttribute('svg-click');
        let svg_pointer = this.getAttribute('svg-pointer');
        if (!svg_id) {
            svg_id = 'cog';
        }
        if (!svg_size) {
            svg_size = 'medium';
        }
        if (svg_click) {
            this.setAttribute("onclick", svg_click);
        }
        this.className = `nice_svg ${svg_size} ${svg_class ? svg_class : ''} ${svg_pointer ? 'click_able' : ''}`;
        this.innerHTML = `${Nice.svg.map[svg_id]}`;
    }
}


export const regularSVGTemplate = `
    <span 
    class="nice_svg <%- ' ' + icon['size']; %> <% if ( icon['class'] ) { %><%- ' ' + icon['class']; %><% } %> <% if ( icon['click_able'] ) { %><%- ' click_able'; %><% } %>"
    <% if ( icon['onclick'] ) { %><%- ' onclick="' + icon['onclick'] + '"'; %><% } %>
    >
        <%- icon['sprite'][icon['id']]; %>
    </span>
`;