
// ********** canvas ****************
function getBoxCanvas(sourceCanvas) {
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");
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
    const li = document.createElement("li");
    list.appendChild(li);

    const img = document.createElement("img");
    img.src = URL.createObjectURL(this.files[0]);
    img.onload = function () {
      URL.revokeObjectURL(this.src);
    }
    li.appendChild(img);
    // *********cropper*************
    const cropper = new Cropper(img);
    const btn = document.querySelector(".btn");
    const prev = document.getElementById("prev");

    btn.onclick = function (e) {
      e.preventDefault()
      const croppedCanvas = cropper.getCroppedCanvas();
      console.log(croppedCanvas);
      const boxCanvas = getBoxCanvas(croppedCanvas);
      const croppedImage = document.createElement("img");
      croppedImage.src = boxCanvas.toDataURL();//return image.png as default.
      croppedImage.setAttribute("class", "edited");
      prev.innerHTML = "";
      prev.appendChild(croppedImage);
      croppedImage.onload = function () {// when the cropped image loads.
        console.log(this.width, this.height);
        const formData = new FormData();// formData to be sent to /upload shipped with input of type file and the img src.

        // const contenType = {
        //   headers: { "content-type": "multipart/form-data" }
        // };
        formData.append("sampleFile", fileElem.files[0]);

        formData.append("src", this.src);
        // Ajax axois
        axios.post("/upload", formData)
          .then(function (response) {
            console.log(response)
            window.location.href = response.data.redirect;
          })
          .catch(function (error) {
            console.log(error);
          });

        // Ajax JQuery
        // $.post("/new", { width: this.width, height: this.height })
        //   .done(function (data) {
        //     console.log(data)
        //   });
        // fetch API
        // fetch('/upload', {
        //   method: 'POST',
        //   body: JSON.stringify({
        //     foo: "bar"
        //   })
        // })
        // XMLHttpRequest
        // let xhr = new XMLHttpRequest();
        // xhr.open('post', '/upload');
        // xhr.send('w=' + this.width + '&h=' + this.height);
        // }

      }
    }
  }
}
