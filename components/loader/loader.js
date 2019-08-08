export function addLoader( element) {
    element.prepend('<div class="nice_overlay"><div class="loader Loader"></div></div>');
}

export function runLoader( element) {
    element.find('.Loader').addClass('go');
    element.find('.overlay').addClass('show');
}

export function addAndRunLoader( element ) {
    element.prepend('<div class="overlay show"><div class="loader Loader go"></div></div>');
}

export function stopLoader( element ) {
    element.find('.Loader').removeClass('go');
    element.find('.overlay').removeClass('show');
}

export function removeLoader( element ) {
    element.find('.Loader').remove();
}