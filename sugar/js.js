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

export function ajaxPost( data = {}, silent = true, url = undefined ) {

    /** Look Description about url in head **/
    if ( typeof url === 'undefined' )    {
        if ( typeof ajaxurl !== 'undefined' ) {
            url = ajaxurl['url'] ? ajaxurl['url'] : ajaxurl;
        } else {
            url = location.protocol + '//' + location.hostname;
        }
    }

    let requestData;

    if ( typeof data === 'object') {
        requestData = objectToUrlParamsRecursive( data );
    }

    console.log('Sending to ' + url + ' \nthis data: \n' + requestData );

    return fetch( url, {
        method: 'POST',
        // mode: '*same-origin',
        // credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        // referrer: '*client',
        body: requestData
    }).then( function ( response ) {
        console.log( response );
        return response.json();
    }).then( function ( json ) {
        console.log( json );
        if ( !silent ) {
            Nice.notify( json );
        }
        return json;
    })

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

    result = + pr + seed(parseInt(new Date().getTime() / 1000, 10), 8)
        + seed(Math.floor(Math.random() * 0x75bcd15) + 1, 5);

    if (en) { result += (Math.random() * 10).toFixed(8).toString(); }

    return 'id' + result;
}

export function objectToUrlParamsRecursive( obj, url_params = false, namespace = false ) {

    let urlParams = url_params ? url_params : '';
    let DataKey;

    obj.forEach( function ( key, val ) {

        DataKey = namespace ? namespace + '[' + key + ']' : key;

        if( typeof val === 'object' && !( val instanceof File ) ) {
            urlParams = objectToUrlParamsRecursive( val, urlParams, DataKey );
        } else {
            if ( urlParams === '' ) {
                urlParams = urlParams + DataKey + '=' + val.toString();
            } else {
                urlParams = urlParams + '&' + DataKey + '=' + val.toString();
            }

        }

    });

    return urlParams;

}

export function isJson( str ) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

export function fadeAndDelete( elem ) {
    elem.style = 'transition: 0.4s !important; visibility: hidden; opacity: 0;';
    setTimeout( function () {
        elem.remove();
    }, 400);

}