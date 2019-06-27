/**
 * Object.prototype.forEach() polyfill
 * https://gomakethings.com/looping-through-objects-with-es6/
 * @author Chris Ferdinandi
 * @license MIT
 */
export function forEach() {
    if (!Object.prototype.forEach) {
        Object.defineProperty(Object.prototype, 'forEach', {
            value: function (callback, thisArg) {
                if (this == null) {
                    throw new TypeError('Not an object');
                }
                thisArg = thisArg || window;
                for ( var key in this) {
                    if (this.hasOwnProperty(key)) {
                        callback.call(thisArg, key, this[key], this);
                    }
                }
            }
        });
    }
}

export function ajaxPost( data = {}, url, header = 'application/x-www-form-urlencoded' ) {
    return new Promise( function( resolve, reject ) {

        let request = new XMLHttpRequest();
        request.open( 'POST', url, true );
        request.setRequestHeader( 'Content-Type', header );

        request.onload = function() {                                                                                   // This is called even on 404 etc
            resolve(  request );
        };

        request.onerror = function() {                                                                                  // Handle network errors
            resolve( request );
        };

        request.send( data );                                                                                                 // Make the request
    });
}

export function get( url ) {
    return new Promise( function( resolve, reject ) {

        let request = new XMLHttpRequest();
        request.open('GET', url );

        request.onload = function() {                                                                                   // This is called even on 404 etc
            resolve(  request );
        };

        request.onerror = function() {                                                                                  // Handle network errors
            resolve( request );
        };

        request.send();                                                                                                 // Make the request
    });
}

export function uniqID( pr = '', en = false ) {

    let result;

    function seed( s, w ){
        s = parseInt(s, 10).toString(16);
        return w < s.length ? s.slice(s.length - w) :
            (w > s.length) ? new Array(1 + (w - s.length)).join('0') + s : s;
    }

    result = pr + seed(parseInt(new Date().getTime() / 1000, 10), 8)
        + seed(Math.floor(Math.random() * 0x75bcd15) + 1, 5);

    if (en) { result += (Math.random() * 10).toFixed(8).toString(); }

    return result;
}