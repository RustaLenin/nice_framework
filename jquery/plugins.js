export function update_jQuery() {
    /**
     * toggleAttr() new jQuery Function for toggling elements attributes
     * @param {string} attr  - Attribute name
     * @param {string} value - Attribute value
     **/
    jQuery.fn.toggleAttr = function( attr, value ) {
        return this.each( function() {
            let $this = jQuery(this);
            $this.attr(attr) === value ? $this.attr( attr, '' ) : $this.attr( attr, value );
        });
    };
}