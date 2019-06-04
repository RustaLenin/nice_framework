/**
 * Class what provide an API for new custom element <nice-svg>
 **/
export class NiceSvg extends HTMLElement {

    /** Which attributes will fire changed event **/
    static observedAttributes = [ 'svg-id', 'svg-size', 'svg-pointer', 'svg-rotate' ];

    /** What sizes are supported for element **/
    possibleSizes = [ 'ultra_small', 'micro', 'tiny', 'small', 'medium', 'large', 'huge' ];

    /** List of methods to update element based on attr names **/
    updateAttrMethods = {
        'svg-id': this.updateIcon,
        'svg-size': this.updateSize,
        'svg-pointer': this.updatePointer,
        'svg-rotate': this.updateRotate,
    };

    /**
     * Function used by browser while parse <nice-svg> element in document
     **/
    constructor() {
        super();                                                                                                         // Magic started

        let self = this;

        /** Get props from element **/
        let svg_id = self.getAttribute('svg-id');
        let svg_class = self.getAttribute('svg-class');
        let svg_size = self.getAttribute('svg-size');
        let svg_pointer = self.getAttribute('svg-pointer');
        let svg_rotate = self.getAttribute('svg-rotate');

        /** Set default values if no props received **/
        if (!svg_id) {
            svg_id = 'cog';
        }
        if (!svg_size) {
            svg_size = 'medium';
        }

        /** Construct element based on the properties **/
        self.classList.add( svg_size );

        if ( svg_class ) {
            let classes = svg_class.split(',');
            classes.forEach( function ( val ) {
                if ( val ) {
                    self.classList.add( val );
                }
            });
        }

        if ( svg_pointer === 'true' ) {
            self.classList.add('click_able');
        }

        if ( svg_rotate === 'true' ) {
            self.classList.add('rotate');
        }

        self.updateIcon( '', svg_id, self );
    }

    /**
     * Function what update nice-svg element inner SVG icon
     * @param oldID {string} - id key of the icon from the SVGMap used before Changes
     * @param newID {string} -  new id key of the icon from the SVGMap we need to set
     * @param self {object} - instance of nice-svg element we are updating
     */
    updateIcon( oldID, newID, self ) {
        if ( Nice.svg.map[newID] ) {
            self.innerHTML = `${Nice.svg.map[newID]}`;
            if ( self.classList.contains('hidden') ) {
                self.classList.remove('hidden');
            }
        } else {
            self.classList.add('hidden');
            setTimeout( function () {
                self.innerHTML = ``;
            }, 400 );
        }
    }

    /**
     * Function what update nice-svg element size
     * @param oldSize {string} - Old element size we need to remove
     * @param newSize {string} - New element size we need to set up
     * @param self {object} - instance of nice-svg element we are updating
     */
    updateSize( oldSize, newSize, self ) {
        if ( self.possibleSizes.includes(newSize) ) {
            self.classList.remove(oldSize);
            self.classList.add(newSize);
        }
    }

    /**
     * Function what update nice-svg element cursor pointer property
     * @param oldVal {string} - Old element property of cursor pointer we need to remove
     * @param newVal {string} - New element property of cursor pointer we need to set
     * @param self {object} - instance of nice-svg element we are updating
     */
    updatePointer( oldVal, newVal, self ) {
        if ( newVal === 'false' ) {
            self.classList.remove('click_able');
        } else if ( newVal === 'true') {
            self.classList.add('click_able');
        }
    }

    /**
     * Function what update nice-svg element svg rotation property
     * @param oldVal {string} - New element property of svg rotation we need to remove
     * @param newVal {string} - New element property of svg rotation we need to set
     * @param self {object} - instance of nice-svg element we are updating
     */
    updateRotate( oldVal, newVal, self ) {
        if ( newVal === 'false' ) {
            self.classList.remove('rotate');
        } else if ( newVal === 'true') {
            self.classList.add('rotate');
        }
    }

    /** This function will fired, when observed attr of element will be changed **/
    attributeChangedCallback( name, oldValue, newValue ) {

        // console.log('nice-svg attr ' + name + ' changed from ' + oldValue + ' to ' + newValue );
        this.updateAttrMethods[name]( oldValue, newValue, this );

    }

}

/**
 * Wrap function for custom HTML element nice-svg.
 * Mostly it's used for render nice-svg from model. Like model.each( function( icon){ Nice.SVG(icon); })
 * @param icon {object} - Properties for nice-svg
 * @returns {string} - HTML element nice-svg
 */
export function niceSvg( icon = {} ) {

    if ( typeof icon === 'string' ) {
        icon = {
            'id': icon
        }
    }

    else if ( typeof icon === 'boolean' ) {
        return '';
    }
    else if ( typeof icon === 'undefined' ) {
        return '';
    }

    if (!icon['id']) {
        icon['id'] = 'cog';
    }

    if (!icon['class']) {
        icon['class'] = '';
    }

    if ( typeof icon['class'] === 'object' ) {
        let temp_string;
        icon['class'].forEach( function ( key, value ) {
            temp_string += value + ',';
        });
        temp_string.slice(0, -1);
        icon['class'] = temp_string;
    }

    if ( typeof icon['size'] === 'undefined' || !icon['size'] ) {
        icon['size'] = 'medium';
    }
    if (!icon['click_able']) {
        icon['click_able'] = false;
    }
    if (!icon['rotate']) {
        icon['rotate'] = false;
    }
    if (!icon['onclick']) {
        icon['onclick'] = '';
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
        svg-id="${ icon['id'] }"
        svg-class="${ icon['class'] }"
        svg-size="${ icon['size'] }"
        onclick="${ icon['onclick'] }"
        svg-pointer="${ icon['click_able'] }"
        svg-rotate="${ icon['rotate'] }">
    </nice-svg>
`;
}