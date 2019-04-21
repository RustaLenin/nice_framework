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



(function() {

    window.isEqual = function(a, b) {
        var p, t;
        for (p in a) {
            if (typeof b[p] === 'undefined') {
                return false;
            }
            if (b[p] && !a[p]) {
                return false;
            }
            t = typeof a[p];
            if (t === 'object' && !isEqual(a[p], b[p])) {
                return false;
            }
            if (t === 'function' && (typeof b[p] === 'undefined' || a[p].toString() !== b[p].toString())) {
                return false;
            }
            if (a[p] !== b[p]) {
                return false;
            }
        }
        for (p in b) {
            if (typeof a[p] === 'undefined') {
                return false;
            }
        }
        return true;
    };

}).call(this);
