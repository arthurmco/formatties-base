
/**
 * Gets a canvas
 * @returns {CanvasRenderingContext2D} a canvas context
 */
function getCanvas() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    return ctx;
}

/**
 * Plot pixels from buffer into imagedata
 * @param {Uint8Array} buffer 
 * @param {ImageData} imagedata 
 * @returns {ImageData} a new imagedata
 */
function plot(buffer, imagedata) {
    let offset = 0;
    for (let i = 0; i < 800*600*3; i++, offset++) {
        if (i >= buffer.length)
            break;

        imagedata.data[offset] = buffer[i];
        
        if ((i+1) % 3 == 0) {
            offset++;
            imagedata.data[offset] = 0xff;
        }

    }

    return imagedata;
}

let submit = document.getElementById('filesend');
submit.addEventListener('click', (ev) => {
    let fileupload = document.getElementById('bmpfile');
    console.log(fileupload.files);
    if (fileupload.files.length <= 0) {
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        const buffer = new Uint8Array(e.target.result);
        console.log(`Size is ${buffer.length}`);

        let canvas = getCanvas();
        canvas.fillStyle = "red";
        canvas.fillRect(0, 0, 800, 600);

        const idata = plot(buffer, canvas.createImageData(800, 600));


        canvas.putImageData(idata, 0, 0);
    };
    reader.readAsArrayBuffer(fileupload.files[0])

    ev.preventDefault();
});


