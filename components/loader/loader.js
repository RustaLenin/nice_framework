export function addLoader( element) {
    element.insertAdjacentHTML('afterbegin', '<div class="nice_overlay"><div class="loader Loader"></div></div>');
}

export function runLoader( element) {
    element.querySelector('.Loader').classList.add('go');
    element.querySelector('.nice_overlay').classList.add('show');
}

export function addAndRunLoader( element ) {
    element.insertAdjacentHTML('afterbegin', '<div class="nice_overlay show"><div class="loader Loader go"></div></div>');
}

export function stopLoader( element ) {
    element.querySelector('.Loader').classList.remove('go');
    element.querySelector('.nice_overlay').classList.remove('show');
}

export function removeLoader( element ) {
    element.querySelector('.nice_overlay').remove();
}