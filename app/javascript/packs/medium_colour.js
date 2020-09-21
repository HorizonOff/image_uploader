const getImageItems = () => {
    return document.querySelectorAll('.image');
}

const getAverageRGB = (imgEl) => {
    let blockSize = 5, // only visit every 5 pixels
        defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
        canvas = document.createElement('canvas'),
        context = canvas.getContext && canvas.getContext('2d'),
        data, width, height,
        i = -4,
        length,
        rgb = {r:0,g:0,b:0},
        count = 0;

    if (!context) {
        return defaultRGB;
    }

    height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
    width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

    context.drawImage(imgEl, 0, 0);

    try {
        data = context.getImageData(0, 0, width, height);
    } catch(e) {
        /* security error, img on diff domain */
        return defaultRGB;
    }

    length = data.data.length;

    while ( (i += blockSize * 4) < length ) {
        ++count;
        rgb.r += data.data[i];
        rgb.g += data.data[i+1];
        rgb.b += data.data[i+2];
    }

    // ~~ used to floor values
    rgb.r = ~~(rgb.r/count);
    rgb.g = ~~(rgb.g/count);
    rgb.b = ~~(rgb.b/count);

    return rgb;

}

const setAverageBg = () => {
    const images = getImageItems();

    images.forEach(function (el) {
       const color =  getAverageRGB(el);
       el.parentElement.style.backgroundColor = `rgb(${color.r},${color.g},${color.b})`;
    });
}

export const getMediumColor = () => {
    const imgs = document.images;
    let imgCounter = 0

    const incrementCounter = () => {
        imgCounter++

        if ( imgCounter === imgs.length ) {
            setAverageBg();
        }
    }

    [].forEach.call(imgs, (img) => {
        if (img.complete)
            incrementCounter();
        else
            img.addEventListener('load', incrementCounter, false);
    });
}

document.addEventListener("turbolinks:load", getMediumColor);
