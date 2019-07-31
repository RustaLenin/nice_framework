import { SvgMap } from './map.js';

export class NiceSvg extends HTMLElement {

    constructor() {
        super();                                                                                                        // Magic started
        this.possibleSizes = [ 'ultra_small', 'micro', 'tiny', 'small', 'medium', 'large', 'huge' ];

        let id = this.getAttribute('svg-id');
        if ( !id ) {
            this.remove();
        }
    }

    static get observedAttributes() {
        return [ 'svg-id'];
    }

    /** This function will fired, when observed attr of element will be changed **/
    attributeChangedCallback( name, oldValue, newValue ) {
        this.updateElement();
    }

    updateElement() {

        let
            newModel = {},
            attrs = {},
            defaults = defaultModel,
            self = this,
            data = this.getAttribute('data')
        ;

        if ( eval( data ) ) {
            console.log( 'eval' );
            newModel = eval( data );
        } else {
            defaults.forEach( function ( key, val ) {
                attrs[key] = self.getAttribute( 'svg-' + key );
            });
            defaults.forEach( function ( key, val ) {
                newModel[key] =  attrs[key] ? attrs[key] : val;
            });
        }

        this.currentModel = newModel;
        this.innerHTML = SvgMap[newModel.id] ? SvgMap[newModel.id] : SvgMap[defaults.id];
        this.updateClass();

    }

    updateClass() {
        let model = this.currentModel;
        /** Remove all possible classes **/
        this.classList.remove( 'click_able', 'rotate', ...this.possibleSizes );


        let self = this;
        if ( model.class ) {
            let classes = model.class.split(',');
            classes.forEach( function ( val ) {
                if ( val ) {
                    self.classList.add( val );
                }
            });
        }
        this.classList.add( model.size );

        if ( model.pointer ) {
            this.classList.add('click_able');
        }

        if ( model.rotate === 'true' ) {
            this.classList.add('rotate');
        }
    }

}

const defaultModel = {
    'id': 'check',
    'size': 'medium',
    'pointer': false,
    'rotate': false,
    'class': '',
};

/**
 * Wrap function for custom HTML element nice-svg.
 * Mostly it's used for render nice-svg from model. Like model.each( function( icon){ Nice.SVG(icon); })
 * @param newIcon {object} - Properties for nice-svg
 * @returns {string} - HTML element nice-svg
 */
export function niceSvg( newIcon = defaultModel ) {

    let icon = {};

    if ( typeof newIcon === 'string' ) {
        newIcon = {
            'id': newIcon
        }
    }

    else if ( typeof newIcon === 'boolean' ) { return ''; }
    else if ( typeof newIcon === 'undefined' ) { return ''; }
    else {
        icon = Object.assign( {}, defaultModel, newIcon );
    }

    if ( typeof icon['class'] === 'object' ) {
        let temp_string = '';
        icon['class'].forEach( function ( value ) {
            temp_string = temp_string +  value + ',';
        });
        temp_string.slice(0, -1);
        icon['class'] = temp_string;
    }
    return regularSVGTemplate( icon );

}

/**
 * Template for function niceSvg
 * @param icon {object} - Properties for nice-svg
 * @returns {string} - HTML element nice-svg
 */
export function regularSVGTemplate( icon ) {
    return `
    <nice-svg
        ${ icon['id']         ? `svg-id="${ icon['id'] }"`              : ''}
        ${ icon['class']      ? `svg-class="${ icon['class'] }"`        : '' }
        ${ icon['size']       ? `svg-size="${ icon['size'] }"`          : ''}
        ${ icon['onclick']    ? `onclick="${ icon['onclick'] }"`        : '' }
        ${ icon['click_able'] ? `svg-pointer="${ icon['click_able'] }"` : ''}
        ${ icon['rotate']     ? `svg-rotate="${ icon['rotate'] }"`      : ''}
        >
    </nice-svg>
`;
}

export function svgNode( icon ) {
    return new DOMParser().parseFromString(niceSvg(icon), 'text/html').querySelector('nice-svg');
}