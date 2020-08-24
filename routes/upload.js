const express = require('express');
const router = express.Router();


router.get("/upload", (req, res) => {
    res.render("upload")
});

router.post("/upload", (req, res) => {
    console.log(req.files);

    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }
    const sampleFile = req.files.sampleFile;
    sampleFile.mv("public/images/" + sampleFile.name, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
        // res.send('File uploaded!');
        res.render("sucUploaded")
    });
});

module.exports = router;