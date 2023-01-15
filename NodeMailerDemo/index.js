const express = require('express');
const app = express();
require('dotenv').config();
const nodemailer = require('nodemailer');
const cors = require('cors');
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const SENDER_EMAIL = process.env.SENDER_EMAIL;
const SENDER_PASSWORD = process.env.SENDER_PASSWORD;
const RECIVER_EMAIL = process.env.RECIVER_EMAIL;

// Using Middleware
app.use(cors({ origin: '*' }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.post("/sendMessage", (req, res) => {

    const { message } = req.body;
    console.log(message);

    // Check Credentical 
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: false,
        requireTLS: true,
        service: 'gmail',
        secureConnection: false,
        auth: {
            user: SENDER_EMAIL,
            pass: SENDER_PASSWORD
        }
    });

    const mailOptions = {
        from: SENDER_EMAIL,
        to: RECIVER_EMAIL,
        subject: "You tube tutorila",
        text: message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.json({ "message": error.message, "success": false })
        }
        else {
            res.json({ "message": info.response, "success": true })
            transporter.close();
        }
    })
});



app.listen(PORT, HOST, () => {
    console.log(`Server are running at ${HOST}:${PORT}`);
})