const express = require("express");
const router = express.Router();
// Multer
const multer = require("multer");
const path = require("path");
const fs = require("fs");

//set storage engine
const storage = multer.diskStorage({
  destination: "public/images/",
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  }
});
// Init upload
const upload = multer({ storage: storage, limits: { fieldSize: 25 * 1024 * 1024 } }).single("sampleFile");


router.get("/upload", (req, res) => {
  res.render("upload")
});

router.post("/upload", (req, res) => {
  upload(req, res, function (err) { //uploading single file with error handling
    if (err instanceof multer.MulterError) {
      // *************A Multer error occurred when uploading********************.
      console.log(err);
    } else if (err) {
      //***************** */ An unknown error occurred when uploading********************.
      console.log(err);
    }
    //****************** */ Everything went fine*********************************.
    console.log("req.file:");
    console.log(req.file);
    console.log("req.body:");
    console.log(req.body);
    const img = req.file.filename;
    // image src:
    const src = req.body.src;

    //download base64 encoded img from the client  
    const base64Data = src.replace(/^data:image\/png;base64,/, "");
    console.log("base64Data: ");
    console.log(base64Data);

    fs.writeFile("public/images/edited/" + img + ".png", base64Data, "base64", function (err) {// write the buffer to a file
      if (err) {
        console.log(err);
      } else {
        console.log("you're good to go!");
      }
    });
  });

  res.json({ redirect: "/success" })

});

router.get("/success", (req, res) => {
  res.render("sucUploaded")
});


module.exports = router;
