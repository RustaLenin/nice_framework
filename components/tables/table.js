export function toggleZebra( elem ) {
    elem.classList.toggle('active');
    let table = elem.closest('.nice_table');
    table.classList.toggle('zebra');
}

export function toggleBorder( elem ) {
    let table = elem.closest('.nice_table');
    table.classList.toggle('border');
    elem.classList.toggle('active');
}

export function togglePin( elem ) {
    let table = elem.closest('.nice_table');
    table.classList.toggle('pinned');
    elem.classList.toggle('active');
}

export function toggleAlignCenter( elem ) {
    let table = elem.closest('.nice_table');
    table.classList.toggle('center');
    elem.classList.toggle('active');
}

export function setTallRows( elem ) {
    let table = elem.closest('.nice_table');
    table.classList.remove('medium', 'low');
    table.classList.add('tall');
    table.querySelector('.tableMedium').classList.remove('active');
    table.querySelector('.tableLow').classList.remove('active');
    elem.classList.add('active');
}

export function setMiddleRows( elem ) {
    let table = elem.closest('.nice_table');
    table.classList.remove('tall', 'low');
    table.classList.add('medium');
    table.querySelector('.tableTall').classList.remove('active');
    table.querySelector('.tableLow').classList.remove('active');
    elem.classList.add('active');
}

export function setLowRows( elem ) {
    let table = elem.closest('.nice_table');
    table.classList.remove('tall', 'medium');
    table.classList.add('low');
    table.querySelector('.tableTall').classList.remove('active');
    table.querySelector('.tableMedium').classList.remove('active');
    elem.classList.add('active');
}