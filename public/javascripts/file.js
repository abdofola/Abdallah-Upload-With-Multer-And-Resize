// ********** canvas ****************
function getBoxCanvas(sourceCanvas) {
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var width = sourceCanvas.width;
    var height = sourceCanvas.height;
    canvas.width = width;
    canvas.height = height;
    context.imageSmoothingEnabled = true;
    context.drawImage(sourceCanvas, 0, 0, width, height);
    return canvas;
}
// ****************************************

const fileSelect = document.getElementById("fileSelect"),
    fileElem = document.getElementById("fileElem"),
    fileList = document.getElementById("fileList");

fileSelect.addEventListener("click", function (e) {
    if (fileElem) {
        fileElem.click();
    }
    e.preventDefault(); // prevent navigation to "#"
}, false);

fileElem.addEventListener("change", handleFiles, false);

function handleFiles() {
    if (!this.files.length) {
        fileList.innerHTML = "<p>No files selected!</p>";
    } else {
        fileList.innerHTML = "";
        const list = document.createElement("ul");
        fileList.appendChild(list);
        for (let i = 0; i < this.files.length; i++) {
            const li = document.createElement("li");
            list.appendChild(li);

            const img = document.createElement("img");


            img.src = URL.createObjectURL(this.files[i]);
            img.onload = function () {
                URL.revokeObjectURL(this.src);
            }
            li.appendChild(img);
            // *********cropper*************
            cropper = new Cropper(img);
            // const btn = document.querySelector("button");
            // const prev = document.getElementById("prev");
            // btn.onclick = function () {
            //     const croppedCanvas = cropper.getCroppedCanvas();
            //     const boxCanvas = getBoxCanvas(croppedCanvas);
            //     const croppedImage = document.createElement('img');
            //     croppedImage.src = boxCanvas.toDataURL();
            //     prev.innerHTML = '';
            //     prev.appendChild(croppedImage);
            // }
        }
    }
}
