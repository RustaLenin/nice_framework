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

export function get( url ) {
    return new Promise( function( resolve, reject ) {

        let request = new XMLHttpRequest();
        request.open('GET', url );

        request.onload = function() {                                                                                   // This is called even on 404 etc
            if ( request.status === 200 ) {                                                                             // so check the status
                resolve( request );                                                                                     // Resolve the promise with the response text
            }
            else {                                                                                                      // Otherwise reject with the status text
                resolve(  request );                                                                             // which will hopefully be a meaningful error
            }
        };

        request.onerror = function() {                                                                                  // Handle network errors
            resolve( request );
        };

        request.send();                                                                                                 // Make the request
    });
}