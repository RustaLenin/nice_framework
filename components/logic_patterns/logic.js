export function debounce( func, delay){
    let lastTimeout;
    return function(){

        if( lastTimeout ) {
            clearTimeout( lastTimeout );
        }

        let args = Array.from( arguments );
        lastTimeout = setTimeout(function(){
            func.apply(null, args);
        }, delay);
    }
}