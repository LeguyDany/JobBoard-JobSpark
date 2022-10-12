var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./JobSpark_localStorage');
require("dotenv").config()
const jwt = require('jsonwebtoken');
const nodemailer = require("nodemailer");

// =================================== Functions ===================================
function getTimeNow() {
    let date = new Date();
    date.setTime(date.getTime())
    return date.toUTCString()
}

function sendMail(to, subject, message) {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "leguy.work@gmail.com",
            pass:'pmnhumvuibpilznf'
        }
    });

    try {
        transporter.sendMail({
            from: "leguy.work@gmail.com",
            to: to,
            subject: subject,
            text: message,
        });

    } catch (error) {
        return error;
    }
}

// =================================== Middlewares ===================================
function verify(req, res, next) {
    // Checks which kind of user is making an API request.
    try {
        // User not logged in
        if (!req.headers.authorization) return next();

        // User logged in
        const token = req.headers.authorization.split(' ')[1];
        const decrypt_token = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        res.locals.user_info = {
            user_id: decrypt_token.user_id,
            user_type: decrypt_token.user_type,
            user_email: decrypt_token.user_email
        }

        next();

        // Login session expired
    } catch (error) {
        next();
    }
}
function checkRightsLv1(req, res, next) {
    if (!res.locals.user_info) return res.send("Log in first.");
    if (res.locals.user_info.user_type != "RCT" && res.locals.user_info.user_type != "ADM") return res.send("Your account doesn't have the authorizations.");
    return next();
}
function checkRightsLv2(req, res, next) {
    if (!res.locals.user_info) return res.send("Log in first.");
    if (res.locals.user_info.user_type != "ADM") return res.send("Your account doesn't have the authorizations.");
    return next();
}

module.exports = {
    getTimeNow,
    sendMail,
    verify,
    checkRightsLv1,
    checkRightsLv2,
}