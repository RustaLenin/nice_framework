/*global document:false, window:false*/

// используйте картинку из своего домена. иначе получите ошибку No 'Access-Control-Allow-Origin' header is present on the requested resource.


'user strict';
let cropComponent
    , container
    , crop_img
    , event_state = {}
    , size = {
    width: 350,
    height: 220,
}
    , ratio = 1.0
    , keyZoomValue = 4.0
    , MINWIDTH = 50
    , MINHEIGHT = 50
    , CROPWIDTH = 200
    , CROPHEIGHT = 200
    , cropLeft = 0
    , cropTop = 0
    , cropWidth = 0
    , cropHeight = 0
    , resize_canvas = null;

function removeHandlers() {
    container.removeEventListener('mousedown', startMoving);
    container.removeEventListener('touchstart', startMoving);
    // container.removeEventListener('wheel', resizing);

    document.removeEventListener('mouseup', endMoving);
    document.removeEventListener('touchend', endMoving);
    document.removeEventListener('mousemove', moving);
    document.removeEventListener('touchmove', moving);
    // document.removeEventListener('keypress', keyHandler);
}

function addHandlers() {
    container.addEventListener('mousedown', startMoving, false);
    container.addEventListener('touchstart', startMoving, false);
    // container.addEventListener('wheel', resizing, false);

    // document.addEventListener('keypress', keyHandler, false);
}

export function init(image_target) {
    if (image_target.complete) {
        initOverlay(image_target);
    } else {
        image_target.onload = function () {
            initOverlay(image_target);
        };
    }
}
function initOverlay(image_target) {

    let wrapper, left, top;

    if (image_target.dataset.isCrop) {
        throw 'image is already crop'
    }

    image_target.dataset.isCrop = 'true';
    image_target.classList.add('crop-blur');
    image_target.draggable = false;

    crop_img = new Image();
    crop_img.crossOrigin = image_target.crossOrigin;
    crop_img.src = image_target.src;
    crop_img.draggable = false;

    resize_canvas = document.createElement('canvas');

    cropComponent = document.createElement('div');
    cropComponent.classList.add('crop-component');

    container = document.createElement('div');
    container.classList.add('overlay');

    cropComponent.appendChild(container);
    wrapper = image_target.parentNode;
    wrapper.appendChild(cropComponent);
    cropComponent.appendChild(crop_img);
    cropComponent.appendChild(image_target);
    container.appendChild(crop_img);

    left = image_target.offsetWidth / 2 - CROPWIDTH / 2;
    top = image_target.offsetHeight / 2 - CROPHEIGHT / 2;

    updateCropImage(left, top);
    addHandlers();
}
function updateCropSize(width, height) {
    container.style.width = width + 'px';
    container.style.height = height + 'px';
}

function updateCropImage(left, top) {
    cropLeft = -left * ratio;
    cropTop = -top * ratio;
    left = -left + 'px';
    top = -top + 'px';

    crop_img.style.top = top;
    crop_img.style.left = left;
}

function updateContainer(left, top) {
    top = top + (CROPWIDTH / 2) + 'px';
    left = left + (CROPHEIGHT / 2) + 'px';

    container.style.top = top;
    container.style.left = left;
}

// Save the initial event details and container state
function saveEventState(e) {
    event_state.container_width = container.offsetWidth;
    event_state.container_height = container.offsetHeight;

    event_state.container_left = container.offsetLeft;
    event_state.container_top = container.offsetTop;

    event_state.mouse_x = (e.clientX || e.pageX || e.touches && e.touches[0].clientX) + window.scrollX;
    event_state.mouse_y = (e.clientY || e.pageY || e.touches && e.touches[0].clientY) + window.scrollY;
}

function imgZoom(zoom) {
    zoom = zoom * Math.PI * 2
    var newWidth = Math.floor(container.clientWidth + zoom)
        , newHeight = Math.floor(container.clientHeight + zoom)
        , w = crop_img.clientWidth
        , h = crop_img.clientHeight
        , left
        , top
        , right
        , bottom;

    if (newWidth < MINWIDTH) {
        return;
    } else if (newWidth > w) {
        return;
    }

    left = container.offsetLeft - (zoom / 2);
    top = container.offsetTop - (zoom / 2);
    right = left + newWidth;
    bottom = top + newHeight;

    if (left < 0) {
        left = 0;
    }
    if (top < 0) {
        top = 0;
    }
    if (right > w) {
        return;
    }
    if (bottom > h) {
        return;
    }

    ratio = CROPWIDTH / newWidth;

    updateCropSize(newWidth, newWidth);
    updateCropImage(left, top);
    updateContainer(left, top);
    crop();
}

function keyHandler(e) {
    e.preventDefault();

    switch (String.fromCharCode(e.charCode)) {
        case '+' :
            imgZoom(keyZoomValue);
            break;
        case '-' :
            imgZoom(-keyZoomValue);
            break;
    }
}

function resizing(e) {
    e.preventDefault();
    imgZoom(e.deltaY > 0 ? 1 : -1);
}

function startMoving(e) {
    e.preventDefault();
    e.stopPropagation();

    saveEventState(e);

    document.addEventListener('mousemove', moving);
    document.addEventListener('touchmove', moving);
    document.addEventListener('mouseup', endMoving);
    document.addEventListener('touchend', endMoving);
}

function endMoving(e) {
    e.preventDefault();

    document.removeEventListener('mouseup', endMoving);
    document.removeEventListener('touchend', endMoving);
    document.removeEventListener('mousemove', moving);
    document.removeEventListener('touchmove', moving);
}

function moving(e) {
    var curuntTouch = {}
        , left
        , top
        , w
        , h;

    e.preventDefault();
    e.stopPropagation();

    curuntTouch.x = e.pageX || e.touches && e.touches[0].pageX;
    curuntTouch.y = e.pageY || e.touches && e.touches[0].pageY;

    left = curuntTouch.x - (event_state.mouse_x - event_state.container_left);
    top = curuntTouch.y - (event_state.mouse_y - event_state.container_top);
    w = container.offsetWidth;
    h = container.offsetHeight;

    if (left < 0) {
        left = 0;
    } else if (left > crop_img.offsetWidth - w) {
        left = crop_img.offsetWidth - w;
    }
    if (top < 0) {
        top = 0;
    } else if (top > crop_img.offsetHeight - h) {
        top = crop_img.offsetHeight - h;
    }

    updateCropImage(left, top);
    updateContainer(left, top);
}

function crop() {
    cropWidth = crop_img.width * ratio;
    cropHeight = crop_img.height * ratio;

    resize_canvas.width = size.width;
    resize_canvas.height = size.height;

    var ctx = resize_canvas.getContext('2d');
    ctx.drawImage(crop_img,
        cropLeft, cropTop,
        cropWidth, cropHeight
    );
}


export function openCropCanvasImg(self) {
    crop();
    try {
        let modal = self.closest('nice-modal');
        let input = document.querySelector(`.input[data-modal=${modal.getAttribute('id')}]`);
        let base64Img = resize_canvas.toDataURL('image/png', 1.0);
        let requestData = {
            'action': 'crop',
            'command': 'crop_img',
            'payload': base64Img
        };
        Nice.ajaxPost(requestData, false).then(function (answer) {
            if(answer.result === 'success'){
                modal.close();
                input.innerText = answer.payload;
                Nice.field.updateMediaField(input);
                Nice.field.validate(input);
                removeHandlers();
            }
        });
    } catch (e) {
        alert(e);
    }

}