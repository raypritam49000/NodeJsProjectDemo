const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
const multer = require('multer');


const upload = multer({

    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "D:\\user-photos")
        },
        filename: function (req, file, cb) {
            console.log(file.originalname);
            cb(null, file.originalname + "_" + Date.now() + ".jpg")
        }
    })

}).single("file");


app.post('/upload', upload, (req, res) => {
    res.json({ "message": "File Uploaded Success", "success": true })
});

app.listen(PORT, HOST, () => {
    console.log(`Server listening on ${HOST}:${PORT}`);
});