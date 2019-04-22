export const colorMethods = {
    // Helpers and sanitize
    'rgbNumStrToDec': rgbNumStrToDec,
    'sanitizeHex': sanitizeHex,
    'decompositionRgb': decompositionRgb,
    'compositeRgb': compositeRgb,
    'decompositionRgba': decompositionRgba,
    'compositeRgba': compositeRgba,
    'compositeHsv': compositeHsv,
    'decompositionCmyk': decompositionCmyk,
    'compositeCmyk': compositeCmyk,

    // Rgb Methods
    'hexToRgb': hexToRgb,
    'binToRgb': binToRgb,
    'decToRgb': decToRgb,
    'rgbaToRgb': rgbaToRgb,
    'hsvToRgb': hsvToRgb,
    'cmykToRgb': cmykToRgb,

    // Rgba methods
    'rgbToRgba': rgbToRgba,
    'hexToRgba': hexToRgba,
    'decToRgba': decToRgba,
    'binToRgba': binToRgba,
    'hsvToRgba': hsvToRgba,
    'cmykToRgba': cmykToRgba,

    // Hex methods
    'rgbToHex': rgbToHex,
    'rgbaToHex': rgbaToHex,
    'decToHex': decToHex,
    'binToHex': binToHex,
    'hsvToHex': hsvToHex,
    'cmykToHex': cmykToHex,

    // Dec Methods
    'hexToDec': hexToDec,
    'binToDec': binToDec,
    'rgbToDec': rgbToDec,
    'rgbaToDec': rgbaToDec,
    'hsvToDec': hsvToDec,
    'cmykToDec': cmykToDec,

    // Bin Methods
    'decToBin': decToBin,
    'hexToBin': hexToBin,
    'rgbToBin': rgbToBin,
    'rgbaToBin': rgbaToBin,
    'hsvToBin': hsvToBin,
    'cmykToBin': cmykToBin,

    // Hsv methods
    'rgbToHsv': rgbToHsv,
    'rgbaToHsv': rgbaToHsv,
    'hexToHsv': hexToHsv,
    'binToHsv': binToHsv,
    'decToHsv': decToHsv,
    'cmykToHsv': cmykToHsv,

    // Cmyk methods
    'rgbToCmyk': rgbToCmyk,
    'rgbaToCmyk': rgbaToCmyk,
    'hsvToCmyk': hsvToCmyk,
    'hexToCmyk': hexToCmyk,
    'decToCmyk': decToCmyk,
    'binToCmyk': binToCmyk,

    //test
    'test': test
};

/** Helpers and sanitize **/

/**
 * Calling in the decomposition Rgb method to convert string numbers into integer decimal numbers
 * @param numString {string} - usually it is string with number getting after RegExp an rgb string from 'rgb( 255, 127, 42)' to 255, 127, 42
 * @returns {number} - integer decimal number in diapason from 0 to 255
 */
function rgbNumStrToDec( numString ) {
    return Math.floor( Math.max( 0, Math.min( 255, parseInt( numString, 10 ) ) ) );
}

/**
 * Remove all non Hexadecimal symbols from string, and return 0 - length hex string
 * @param rawHex {string}
 * @param length {number} - length of returned hex, usually 6 or 8. 8 for default
 * @returns {string}
 */
function sanitizeHex( rawHex, length = 8 ) {
    let hex = rawHex.toLowerCase().replace(/[^a-f0-9]/g, '');
    if ( hex.length > 8 ) { hex = hex.substring( 0, length ); }
    return hex.padStart( 6, '0').padEnd( length, '0');
}

/**
 * Transform color string rgb into object
 * @param rgbStr { string | object } - like 'rgb( 255, 127, 42 )'
 * @returns { {r: number, g: number, b: number} } - rgbObject like { r: 255, g: 127, b: 42 }
 */
function decompositionRgb( rgbStr ) {

    if( typeof rgbStr === 'object' ) {
        return rgbStr;
    }

    let rgbRegex = /^rgb\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*\)$/;

    let raw = rgbRegex.exec(rgbStr);

    return {
        r: rgbNumStrToDec( raw[1] ),
        g: rgbNumStrToDec( raw[3] ),
        b: rgbNumStrToDec( raw[5] )
    };

}

/**
 * Transform color string rgba to object
 * @param rgbaStr { string | object } - like 'rgba( 255, 127, 42, 255 )'
 * @returns { {r: number, g: number, b: number, a: number} } - rgbaObject like { r: 255, g: 127, b: 42, a: 255 }
 */
function decompositionRgba( rgbaStr ) {

    if( typeof rgbaStr === 'object' ) {
        return rgbaStr;
    }

    let rgbaRegex = /^rgba\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*\)$/;

    let raw = rgbaRegex.exec(rgbaStr);

    return {
        r: rgbNumStrToDec( raw[1] ),
        g: rgbNumStrToDec( raw[3] ),
        b: rgbNumStrToDec( raw[5] ),
        a: rgbNumStrToDec( raw[7] ),
    };

}

/**
 * Transform rgb color object into string.
 * @param rgbObj { string | object } - like { r: 255, g: 127, b: 42 }
 * @returns {string} - like 'rgb( 255, 127, 42 )'
 */
function compositeRgb( rgbObj ) {
    if ( typeof rgbObj === 'string' ) { return rgbObj; }
    return 'rgb( ' + rgbObj.r + ', ' + rgbObj.g + ', ' + rgbObj.b + ' )';
}

/**
 * Transform rgb color object into string.
 * @param rgbaObj { string | object } - like { r: 255, g: 127, b: 42, a: 255 }
 * @returns {string} - like 'rgba( 255, 127, 42, 255 )'
 */
function compositeRgba( rgbaObj ) {
    if ( typeof rgbaObj === 'string' ) { return rgbaObj; }
    return 'rgba( ' + rgbaObj.r + ', ' + rgbaObj.g + ', ' + rgbaObj.b + ', ' + rgbaObj.a + ' )';
}

/**
 * Transform HsvObj to HsvStr
 * @param hsvObj { {h: number, s: number, v: number } | string } - like {h: 23.943661971830988, s: 0.8352941176470589, v: 1}
 * @returns { string } - like hsv( 23.943661971830988, 0.8352941176470589, 1 )
 */
function compositeHsv( hsvObj ) {
    if ( typeof hsvObj === 'string' ) { return hsvObj; }
    return 'hsv( ' + hsvObj.h + ', ' + hsvObj.s + ', ' + hsvObj.v + ' )';
}

/**
 * Transform color string rgba to object
 * @param cmykStr { string | object } - like 'cmyk( 0, 50, 84, 0 )'
 * @returns { { c: number, m: number, y: number, k: number } | string } - like { c: 0, m: 50.19607843137255, y: 83.52941176470588, k: 0 }
 */
function decompositionCmyk( cmykStr ) {

    if( typeof cmykStr === 'object' ) {
        return cmykStr;
    }

    let cmykRegex = /^rgba\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*\)$/;

    let raw = cmykRegex.exec(cmykStr);

    return {
        c: rgbNumStrToDec( raw[1] ),
        m: rgbNumStrToDec( raw[3] ),
        y: rgbNumStrToDec( raw[5] ),
        k: rgbNumStrToDec( raw[7] ),
    };

}

/**
 * Transform CmykObj to CmykStr
 * @param CmykObj { { c: number, m: number, y: number, k: number } | string } - like { c: 0, m: 50.19607843137255, y: 83.52941176470588, k: 0 }
 * @returns { string } - like 'cmyk( 0, 50, 84, 0 )'
 */
function compositeCmyk( CmykObj ) {
    if ( typeof CmykObj === 'string' ) { return CmykObj; }
    return 'cmyk( ' + CmykObj.c + ', ' + CmykObj.m + ', ' + CmykObj.y + ', ' + CmykObj.k + ' )';
}

/** RGB Methods **/

/**
 * Transform hex string into rgb string or object
 * @param hex {string} - like 'ff7f2a'
 * @param type {string} - string or object
 * @returns {string | {r: number, g: number, b: number } } - string like 'rgb( 255, 127, 42 )' or object { r: 255, g: 127, b: 42 }
 */
function hexToRgb( hex, type = 'object' ) {
    hex = sanitizeHex( hex, 6 );
    let rgb = {
        r: parseInt( hex.substring(0, 2), 16 ),
        g: parseInt( hex.substring(2, 4), 16 ),
        b: parseInt( hex.substring(4, 6), 16 )
    };

    if( type === 'string' ) {
        rgb = compositeRgb( rgb );
    }

    return rgb;
}

/**
 * Transform bin color to rgb object. Through hex.
 * @param bin {string} - like '111111110111111100101010'
 * @param type {string} - object or string
 * @returns { string | {r: number, g: number, b: number } } - object like { r: 255, g: 127, b: 42 } or  string like 'rgb( 255, 127, 42 )'
 */
function binToRgb ( bin, type = 'object' ) {
    return hexToRgb( binToHex( bin ), type );
}

/**
 * Transform decimal color to rgb object or string
 * @param dec {number}
 * @param type {string}
 * @returns { string | {r: number, g: number, b: number } }
 */
function decToRgb( dec, type = 'object' ) {
    return hexToRgb( decToHex( dec ), type );
}

/**
 * Transform rgba object or string into rgb object or string
 * @param rgba { {r: number, g: number, b: number, a: number } | string } - object like { r: 255, g: 127, b: 42, a: 255 } or string like 'rgba( 255, 127, 42, 255 )'
 * @param type { string } - object or string
 * @returns { {r: number, g: number, b: number } | string } - object like { r: 255, g: 127, b: 42 } or string like 'rgb( 255, 127, 42 )'
 */
function rgbaToRgb( rgba, type = 'object' ) {
    if ( typeof rgba === 'string' ) {
        rgba = decompositionRgba( rgba );
    }
    delete rgba.a;

    if ( type === 'string' ) {
        rgba = compositeRgb( rgba );
    }
    return rgba;
}

/**
 * Transform Hsv object to rgb object or string.
 * @param hsv { {h: number, s: number, v: number} } - like {h: 23.943661971830988, s: 0.8352941176470589, v: 1}
 * @param type { string } - 'string' or 'object'
 * @returns { {r: number, g: number, b: number } | string } - like 'rgb( 255, 127, 42 )' or {r: 255, g: 127, b: 42}
 */
function hsvToRgb( hsv, type = 'object' ) {

    let
        rgb = {r: 0, g: 0, b: 0 },
        h = hsv.h,
        s = hsv.s * 100,
        v = hsv.v * 100
    ;

    if (s === 0) {
        if ( v === 0 ) { rgb.r = rgb.g = rgb.b = 0; }
        else { rgb.r = rgb.g = rgb.b = ( v * 255 / 100) | 0; }
    }

    else {

        if (h === 360) h = 0;
        h /= 60;
        s = s / 100;
        v = v / 100;

        let i = h | 0,
            f = h - i,
            p = v * (1 - s),
            q = v * (1 - (s * f)),
            t = v * (1 - (s * (1 - f)))
        ;

        switch (i) {
            case 0:
                rgb.r = v;
                rgb.g = t;
                rgb.b = p;
                break;
            case 1:
                rgb.r = q;
                rgb.g = v;
                rgb.b = p;
                break;
            case 2:
                rgb.r = p;
                rgb.g = v;
                rgb.b = t;
                break;
            case 3:
                rgb.r = p;
                rgb.g = q;
                rgb.b = v;
                break;
            case 4:
                rgb.r = t;
                rgb.g = p;
                rgb.b = v;
                break;
            case 5:
                rgb.r = v;
                rgb.g = p;
                rgb.b = q;
                break;
        }
        rgb.r = Math.round( (rgb.r * 255) ) | 0;
        rgb.g = Math.round( (rgb.g * 255) ) | 0;
        rgb.b = Math.round( (rgb.b * 255) ) | 0;
    }

    if ( type === 'string' ) {
        rgb = compositeRgb( rgb );
    }

    return rgb;
}

/**
 * Transform Cmyk object or string into rgb object or string
 * @param cmyk { {c: number, m: number, y: number, k: number} | string } - like { c: 0, m: 50.19607843137255, y: 83.52941176470588, k: 0 }
 * @param type {string} - 'string' or 'object'
 * @return { {r: number, g: number, b: number } | string } - like { r: 255, g: 127, b: 42 }
 */
function cmykToRgb( cmyk, type = 'object' ) {

    if ( typeof cmyk === 'string' ) {
        cmyk = decompositionCmyk( cmyk );
    }

    let
        rgb = {},
        c = cmyk.c / 100,
        m = cmyk.m / 100,
        y = cmyk.y / 100,
        k = cmyk.k / 100
    ;

    rgb.r = Math.round( ( 1 - Math.min( 1, c * ( 1 - k ) + k ) ) * 255 );
    rgb.g = Math.round( ( 1 - Math.min( 1, m * ( 1 - k ) + k ) ) * 255 );
    rgb.b = Math.round( ( 1 - Math.min( 1, y * ( 1 - k ) + k ) ) * 255 );

    if ( type === 'string' ) {
        rgb = compositeRgb( rgb );
    }

    return rgb;

}

/** RGBA Methods **/

/**
 * Transform rgb object or string into rgba string or object
 * @param rgb { string | {r: number, g: number, b: number } } - string like 'rgb( 255, 127, 42 )' or object { r: 255, g: 127, b: 42 }
 * @param a {number} - alpha channel adding to the rgb, 255 for default
 * @param type {string} - 'string' or 'object'
 * @returns { string | {r: number, g: number, b: number, a: number } } - string like 'rgba( 255, 127, 42, 255 )' or object { r: 255, g: 127, b: 42, a: 255 }
 */
function rgbToRgba( rgb, a = 255, type = 'object') {
    if ( typeof rgb === 'string' ) {
        rgb = decompositionRgb( rgb )
    }

    rgb['a'] = a;
    if ( type === 'string' ) {
        rgb = compositeRgba( rgb );
    }
    return rgb;
}

/**
 *
 * @param hsv { {h: number, s: number, v: number} | string } - like {h: 23.943661971830988, s: 0.8352941176470589, v: 1}
 * @param a {number} - alpha channel adding to the rgb, 255 for default
 * @param type {string} - string or object
 * @returns { string | {r: number, g: number, b: number, a: number } } - string like 'rgba( 255, 127, 42, 255 )' or object { r: 255, g: 127, b: 42, a: 255 }
 */
function hsvToRgba( hsv, a = 255, type = 'object' ) {
    return rgbToRgba( hsvToRgb( hsv ), a, type );
}

/**
 * Transform hex string into rgba string or object
 * @param hex {string} - like ff7f2aff
 * @param type {string} - 'string' or 'object'
 * @returns { {r: number, g: number, b: number, a: number} | string } - like 'rgba( 255, 127, 42, 255 )' or object { r: 255, g: 127, b: 42, a: 255 }
 */
function hexToRgba( hex, type = 'object' ) {
    hex = sanitizeHex( hex, 8 );
    let rgba = {
        r: parseInt( hex.substring(0, 2), 16 ),
        g: parseInt( hex.substring(2, 4), 16 ),
        b: parseInt( hex.substring(4, 6), 16 ),
        a: parseInt( hex.substring(6, 8), 16 ),
    };

    if( type === 'string' ) {
        rgba = compositeRgba( rgba );
    }

    return rgba
}

/**
 * Transform decimal number into rgba string or object
 * @param dec {number} - like 4286524159
 * @param type {string} - 'string' or 'object'
 * @returns { {r: number, g: number, b: number, a: number} | string } - like 'rgba( 255, 127, 42, 255 )' or object { r: 255, g: 127, b: 42, a: 255 }
 */
function decToRgba( dec, type = 'object' ) {
    let rgba = hexToRgba( decToHex( dec ) );
    if( type === 'string' ) {
        rgba = compositeRgba( rgba );
    }
    return rgba;
}

/**
 * Transform binary string to rgba object or string
 * @param bin {string} - like '11111111011111110010101011111111'
 * @param type{string} - 'string' or 'object'
 * @returns { {r: number, g: number, b: number, a: number} | string } - like {r: 255, g: 127, b: 42, a: 255}
 */
function binToRgba( bin, type = 'object') {
    let rgba = hexToRgba( binToHex(bin) );
    if( type === 'string' ) {
        rgba = compositeRgba( rgba );
    }
    return rgba;
}

/**
 * Transform cmyk object or string to rgba object or string. Throw rgb.
 * @param cmyk { {c: number, m: number, y: number, k: number} | string } - like { c: 0, m: 50.19607843137255, y: 83.52941176470588, k: 0 }
 * @param a {number} - alpha channel adding to the rgb, 255 for default
 * @param type {string} - string or object
 * @returns { {r: number, g: number, b: number, a: number} | string } - like {r: 255, g: 127, b: 42, a: 255}
 */
function cmykToRgba( cmyk, a = 255, type = 'object') {
    return rgbToRgba( cmykToRgb( cmyk ), a, type );
}

/** Hex Methods **/

/**
 * Transform decimal number to Hexadecimal string
 * @param dec { number } like 16744234
 * @returns {string} - like 'ff7f2a'
 */
function decToHex( dec ) {
    return dec.toString(16).toLowerCase().padStart( 2, '0' );
}

/**
 * Transform binary string to Hexadecimal string. Throw decimal.
 * @param bin {string} - like '111111110111111100101010'
 * @returns {string} - hex like 'ff7f2a'
 */
function binToHex( bin ) {
    return decToHex( binToDec(bin) );
}

/**
 * Transform rgb color object or string into Hexadecimal string
 * @param rgb { {r: number, g: number, b: number} | string } like 'rgb( 255, 127, 42 )' or {r: 255, g: 127, b: 42}
 * @returns { string } like 'ff7f2a'
 */
function rgbToHex( rgb ) {

    if ( typeof rgb === 'string' ) {
        rgb = decompositionRgb( rgb );
    }

    return decToHex(rgb.r) + decToHex(rgb.g) + decToHex(rgb.b)
}

/**
 * Transform rgba object or string into Hexadecimal string.
 * @param rgba { {r: number, g: number, b: number, a: number} | string } - like { r: 255, g: 127, b: 42, a: 255 } or string like 'rgba( 255, 127, 42, 255 )'
 * @returns {string} - like 'ff7f2aff'
 */
function rgbaToHex( rgba ) {
    if ( typeof rgba === 'string' ) {
        rgba = decompositionRgba( rgba );
    }
    return decToHex(rgba.r) + decToHex(rgba.g) + decToHex(rgba.b) + decToHex(rgba.a);
}

/**
 * Transform hsv object to hex string. Throw rgb.
 * @param hsv { {h: number, s: number, v: number} } - like {h: 23.943661971830988, s: 0.8352941176470589, v: 1}
 * @returns {string} - like 'ff7f2aff'
 */
function hsvToHex( hsv) {
    return rgbToHex( hsvToRgb( hsv) );
}

/**
 * Transform cmyk object or string into hex string. Throw rgb.
 * @param cmyk { {c: number, m: number, y: number, k: number} | string } - like { c: 0, m: 50.19607843137255, y: 83.52941176470588, k: 0 }
 * @returns {string} - like 'ff7f2aff'
 */
function cmykToHex( cmyk ) {
    return rgbToHex( cmykToRgb( cmyk ) );
}

/** Dec Methods **/

/**
 * Transform hex string into decimal number
 * @param hex {string} - like 'ff7f2a'
 * @returns {number} - like 16744234
 */
function hexToDec( hex ) {
    return parseInt( sanitizeHex( hex, 6 ), 16 );
}

/**
 * Transform binary string to decimal number.
 * @param bin {string} - like '111111110111111100101010'
 * @returns {number} - like 16744234
 */
function binToDec( bin ) {
    return parseInt( bin , 2 );
}

/**
 * Transform rgb object or string into decimal number. Throw hex.
 * @param rgb { string | {r: number, g: number, b: number} } - object like { r: 255, g: 127, b: 42 } or string like 'rgb( 255, 127, 42 )'
 * @returns {number} - like 16744234
 */
function rgbToDec( rgb ) {
    if ( typeof rgb === 'string' ) {
        rgb = decompositionRgb( rgb )
    }
    return hexToDec( rgbToHex( rgb ) );
}

/**
 * Transform rgba object or string into decimal number. Throw hex.
 * @param rgba { {r: number, g: number, b: number, a: number} | string } - object like { r: 255, g: 127, b: 42, a: 255 } or string like 'rgba( 255, 127, 42, 255 )'
 * @returns {number} - like 4286524159
 */
function rgbaToDec( rgba ) {
    if ( typeof rgba === 'string' ) {
        rgba = decompositionRgba( rgba )
    }
    return hexToDec( rgbaToHex( rgba ) );
}

/**
 * Transform hsv object to decimal number; Throw rgb.
 * @param hsv { {h: number, s: number, v: number} } - like {h: 23.943661971830988, s: 0.8352941176470589, v: 1}
 * @returns {number} - like 4286524159
 */
function hsvToDec( hsv ) {
    return rgbToDec( hsvToRgb( hsv ) );
}

/**
 * Transform cmyk object or string into decimal number. Throw rgb.
 * @param cmyk { {c: number, m: number, y: number, k: number} | string } - like { c: 0, m: 50.19607843137255, y: 83.52941176470588, k: 0 }
 * @returns {number} - like 4286524159
 */
function cmykToDec( cmyk ) {
    return rgbToDec( cmykToRgb( cmyk) );
}

/** Bin Methods **/

/**
 * Transform decimal number into binary string.
 * @param dec {number} - decimal number like 16744234
 * @returns {string} - binary string like '111111110111111100101010'
 */
function decToBin( dec ) {
    return dec.toString(2);
}

/**
 * Transform Hexadecimal string into binary string. Throw decimal.
 * @param hex {string} - like 'ff7f2a'
 * @returns {string} - like '111111110111111100101010'
 */
function hexToBin( hex ) {
    return decToBin( hexToDec( hex ) );
}

/**
 * Transform rgb object or string into binary string. Throw decimal.
 * @param rgb { {r: number, g: number, b: number} | string } - object like {r: 255, g: 127, b: 42} or string like 'rgb( 255, 127, 42 )'
 * @returns {string} - like '111111110111111100101010'
 */
function rgbToBin( rgb ) {
    if ( typeof rgb === 'string' ) {
        rgb = decompositionRgb( rgb )
    }
    return decToBin( rgbToDec(rgb) );
}

/**
 * Transform rgba string or object into binary string. Throw decimal;
 * @param rgba { string | {r: number, g:number, b: number, a: number,} }
 * @returns {string} - like '11111111011111110010101011111111'
 */
function rgbaToBin( rgba ) {
    if ( typeof rgba === 'string' ) {
        rgba = decompositionRgba( rgba )
    }
    return decToBin( rgbaToDec(rgba) );
}

/**
 * Transform hsv object to bin string. Throw rgb.
 * @param hsv { {h: number, s: number, v: number} } - like {h: 23.943661971830988, s: 0.8352941176470589, v: 1}
 * @returns {string} - like '111111110111111100101010'
 */
function hsvToBin( hsv ) {
    return rgbToBin( hsvToRgb( hsv ) );
}

/**
 * Transform cmyk object or string to binary string. Throw rgb.
 * @param cmyk { {c: number, m: number, y: number, k: number} | string } - like { c: 0, m: 50.19607843137255, y: 83.52941176470588, k: 0 }
 * @returns {string} - like '111111110111111100101010'
 */
function cmykToBin( cmyk ) {
    return rgbToBin( cmykToRgb( cmyk ) );
}

/** HSV Methods **/

/**
 * Transform rgb object into hsv object
 * @param rgb { {r: number, g: number, b: number } | string } - like { r: 255, g: 127, b: 42 }
 * @returns { {h: number, s: number, v: number} } - like {h: 23.943661971830988, s: 0.8352941176470589, v: 1}
 */
function rgbToHsv( rgb ) {

    if ( typeof rgb === 'string' ) {
        rgb = decompositionRgb( rgb );
    }

    /** Init variables **/
    let
        r = rgb.r / 255,
        g = rgb.g / 255,
        b = rgb.b / 255,
        hsv = { h: 0, s: 0, v: 0 },
        min = 0,
        max = 0,
        delta
    ;

    /** Find max and min values **/
    if ( r >= g && r >= b ) {
        max = r;
        min = g > b ? b : g;
    }

    else if ( g >= b && g >= r ) {
        max = g;
        min = r > b ? b : r;
    }

    else {
        max = b;
        min = g > r ? r : g;
    }

    /** Set v and s **/
    hsv.v = max;
    if ( max === 0 ) { hsv.s = 0; }
    else { hsv.s = 1 - ( min / max ); }

    /** Set h **/
    if ( max === min ) { hsv.h = 0; }
    else {
        delta = max - min;

        if      ( max === r && g >= b )   { hsv.h =   60 * ( (g - b) / delta ); }

        else if ( max === r && g < b )    { hsv.h = ( 60 * ( (g - b) / delta ) ) + 360; }

        else if ( max === g )             { hsv.h = ( 60 * ( (b - r) / delta ) ) + 120; }

        else if ( max === b )             { hsv.h = ( 60 * ( (r - g) / delta ) ) + 240; }
    }

    return hsv;
}

/**
 * Transform rgba object into hsv object
 * @param rgba { {r: number, g: number, b: number, a: number} | string } - like { r: 255, g: 127, b: 42, a: 255 }
 * @returns {{h: number, s: number, v: number}} - like {h: 23.943661971830988, s: 0.8352941176470589, v: 1}
 */
function rgbaToHsv( rgba ) {
    return rgbToHsv( rgbaToRgb( rgba ) );
}

/**
 * Transform hex string into hsv object. Throw rgb.
 * @param hex {string} - like 'ff7f2a'
 * @returns {{h: number, s: number, v: number}} - like {h: 23.943661971830988, s: 0.8352941176470589, v: 1}
 */
function hexToHsv( hex ) {
    return rgbToHsv( hexToRgb( hex ) );
}

/**
 * Transform bin string into hsv object. Throw rgb.
 * @param bin {string} - like '111111110111111100101010'
 * @returns {{h: number, s: number, v: number}} - like {h: 23.943661971830988, s: 0.8352941176470589, v: 1}
 */
function binToHsv( bin ) {
    return rgbToHsv( binToRgb( bin ) );
}

/**
 * Transform decimal number into hsv object. Throw rgb.
 * @param dec {number} - like 16744234
 * @returns {{h: number, s: number, v: number}} - like {h: 23.943661971830988, s: 0.8352941176470589, v: 1}
 */
function decToHsv( dec ) {
    return rgbToHsv( decToRgb( dec ) );
}

/**
 * Transform cmyk object or string to hsv object. Throw rgb.
 * @param cmyk { {c: number, m: number, y: number, k: number} | string } - like { c: 0, m: 50.19607843137255, y: 83.52941176470588, k: 0 }
 * @returns { {h: number, s: number, v: number} } - like {h: 23.943661971830988, s: 0.8352941176470589, v: 1}
 */
function cmykToHsv( cmyk ) {
    return rgbToHsv( cmykToRgb( cmyk ) );
}

/** Cmyk methods **/

/**
 * Transform rgb object or string to cmyk object or string.
 * @param rgb { {r: number, g: number, b: number } | string } - like { r: 255, g: 127, b: 42 }
 * @param type { string } - 'string' or 'object'
 * @returns { {c: number, m: number, y: number, k: number} | string } - like { c: 0, m: 50.19607843137255, y: 83.52941176470588, k: 0}
 */
function rgbToCmyk( rgb, type = 'object' ) {

    if ( typeof rgb === 'string' ) {
        rgb = decompositionRgb( rgb );
    }

    let
        cmyk = {},
        r = rgb.r / 255,
        g = rgb.g / 255,
        b = rgb.b / 255
    ;

    cmyk.k = Math.min( 1 - r, 1 - g, 1 - b );
    cmyk.k = cmyk.k * 100;

    cmyk.c = ( ( 1 - r - cmyk.k ) / ( 1 - cmyk.k ) ) * 100;
    cmyk.m = ( ( 1 - g - cmyk.k ) / ( 1 - cmyk.k ) ) * 100;
    cmyk.y = ( ( 1 - b - cmyk.k ) / ( 1 - cmyk.k ) ) * 100;

    if ( type === 'string' ) {
        cmyk = compositeCmyk( cmyk );
    }

    return cmyk;
}

/**
 * Transform rgba object or string to cmyk object or string. Throw rgb.
 * @param rgba { {r: number, g: number, b: number, a: number} | string } - like { r: 255, g: 127, b: 42, a: 255 }
 * @param type {string} - 'string' or 'object'
 * @returns { {c: number, m: number, y: number, k: number} | string } - like { c: 0, m: 50.19607843137255, y: 83.52941176470588, k: 0}
 */
function rgbaToCmyk( rgba, type = 'object' ) {
    return rgbToCmyk( rgbaToRgb( rgba ), type );
}

/**
 * Transform hsv object to cmyk object or string. Throw rgb.
 * @param hsv { {h: number, s: number, v: number} } - like {h: 23.943661971830988, s: 0.8352941176470589, v: 1}
 * @param type { string } - 'string' or 'object'
 * @returns { {c: number, m: number, y: number, k: number} | string } - like { c: 0, m: 50.19607843137255, y: 83.52941176470588, k: 0}
 */
function hsvToCmyk( hsv, type = 'object' ) {
    return rgbToCmyk( hsvToRgb( hsv ), type );
}

/**
 * Transform hex string to cmyk object or string. Throw rgb.
 * @param hex {string} - like 'ff7f2a'
 * @param type { string } - 'string' or 'object'
 * @returns { {c: number, m: number, y: number, k: number} | string } - like { c: 0, m: 50.19607843137255, y: 83.52941176470588, k: 0}
 */
function hexToCmyk( hex, type = 'object' ) {
    return rgbToCmyk( hexToRgb( hex ), type );
}

/**
 * Transform decimal number to cmyk object or string. Throw rgb.
 * @param dec {number} - like 16744234
 * @param type { string } - 'string' or 'object'
 * @returns { {c: number, m: number, y: number, k: number} | string } - like { c: 0, m: 50.19607843137255, y: 83.52941176470588, k: 0}
 */
function decToCmyk( dec, type = 'object' ) {
    return rgbToCmyk( decToRgb( dec ), type );
}

/**
 * Transform binary string to cmyk object or string. Throw rgb.
 * @param bin {string} - like '111111110111111100101010'
 * @param type { string } - 'string' or 'object'
 * @returns { {c: number, m: number, y: number, k: number} | string } - like { c: 0, m: 50.19607843137255, y: 83.52941176470588, k: 0}
 */
function binToCmyk( bin, type = 'object' ) {
    return rgbToCmyk( binToRgb( bin ), type );
}

/** Tests **/

function test() {

    let
        rgbStr   = 'rgb( 255, 127, 42 )',
        rgbaStr  = 'rgba( 255, 127, 42, 255 )',
        hex      = 'ff7f2a',
        alphaHex = 'ff7f2aff',
        dec      = 16744234,
        alphaDec = 4286524159,
        bin      = '111111110111111100101010',
        alphaBin = '11111111011111110010101011111111',
        hsv      = {h: 23.943661971830988, s: 0.8352941176470589, v: 1},
        // cmykObj  = { c: 0, m: 50.19607843137255, y: 83.52941176470588, k: 0 },
        cmykStr  = 'cmyk( 0, 50.19607843137255, 83.52941176470588, 0 )'
    ;

    return {

        // Rgb Methods
        'hexToRgbStr':        hexToRgb( hex, 'string' )              === rgbStr,
        'binToRgbStr':        binToRgb( bin, 'string' )              === rgbStr,
        'decToRgbStr':        decToRgb( dec, 'string' )              === rgbStr,
        'rgbaStrToRgbStr':    rgbaToRgb( rgbaStr, 'string' )         === rgbStr,
        'hsvToRgb':           hsvToRgb( hsv, 'string' )              === rgbStr,

        // Rgba methods
        'rgbStrToRgbaStr':    rgbToRgba( rgbStr, 255, 'string' )    === rgbaStr,
        'decToRgbaStr':       decToRgba( alphaDec, 'string' )       === rgbaStr,
        'binToRgbaStr':       binToRgba( alphaBin, 'string' )       === rgbaStr,
        'hexToRgbaStr':       hexToRgba( alphaHex, 'string' )       === rgbaStr,
        'hsvToRgbaStr':       hsvToRgba( hsv, 255, 'string' )       === rgbaStr,

        // Hex Methods
        'rgbStrToHex':        rgbToHex( rgbStr )                    === hex,
        'rgbaStrToHex':       rgbaToHex( rgbaStr )                  === alphaHex,
        'binToHex':           binToHex( bin )                       === hex,
        'decToHex':           decToHex( dec )                       === hex,
        'alphaBinToAlphaHex': binToHex( alphaBin )                  === alphaHex,
        'alphaDecToAlphaHex': decToHex( alphaDec )                  === alphaHex,
        'hsvToHex':           hsvToHex( hsv )                       === hex,

        // Dec Methods
        'rgbStrToDec':        rgbToDec( rgbStr )                    === dec,
        'rgbaStrToDec':       rgbaToDec( rgbaStr )                  === alphaDec,
        'hexToDec':           hexToDec( hex )                       === dec,
        'binToDec':           binToDec( bin )                       === dec,
        'alphaHexToAlphaDec': hexToDec( alphaHex )                  === alphaDec,
        'alphaBinToAlphaDec': binToDec( alphaBin )                  === alphaDec,
        'hsvToDec':           hsvToDec( hsv )                       === dec,

        // Bin Methods
        'rgbStrToBin':        rgbToBin( rgbStr )                    === bin,
        'rgbaStrToBin':       rgbaToBin( rgbaStr )                  === alphaBin,
        'hexToBin':           hexToBin( hex )                       === bin,
        'decToBin':           decToBin( dec )                       === bin,
        'alphaHexToAlphaBin': hexToBin( alphaHex )                  === alphaBin,
        'alphaDecToAlphaBin': decToBin( alphaDec )                  === alphaBin,
        'hsvToBin':           hsvToBin( hsv )                       === bin,

        // Hsv Methods
        'rgbToHsv':           compositeHsv( rgbToHsv( rgbStr ) )    === compositeHsv( hsv ),
        'rgbaToHsv':          compositeHsv( rgbaToHsv( rgbaStr ) )  === compositeHsv( hsv ),
        'hexToHsv':           compositeHsv( hexToHsv( hex ) )       === compositeHsv( hsv ),
        'decToHsv':           compositeHsv( decToHsv( dec ) )       === compositeHsv( hsv ),
        'binToHsv':           compositeHsv( binToHsv( bin ) )       === compositeHsv( hsv ),

        // Cmyk methods
        'rgbToCmyk':          rgbToCmyk( rgbStr, 'string' )         === cmykStr,
        'rgbaToCmyk':         rgbaToCmyk( rgbaStr, 'string' )       === cmykStr,
        'hexToCmyk':          hexToCmyk( hex, 'string' )            === cmykStr,
        'decToCmyk':          decToCmyk( dec, 'string' )            === cmykStr,
        'binToCmyk':          binToCmyk( bin, 'string' )            === cmykStr
    }

}