const pool = require('../../db');
const queries = require('./queries');
const functions = require('../../functions');
const bcrypt = require("bcrypt");

require("dotenv").config();
const jwt = require('jsonwebtoken');

function createToken(req, res) {
    const { user_email, user_pwd } = req.body;

    pool.query(queries.verifyPass, [user_email], (error, results) => {
        if (!results.rows.length) return res.send("User unregistered or wrong password.");
        const hashed_pass = results.rows[0].user_pwd;
        bcrypt.compare(user_pwd, hashed_pass, function (err, results) {
            if (!results) return res.send("Wrong password, please try again.");
            pool.query(queries.getUserInfo, [user_email, hashed_pass], (error, results) => {
                if (error) throw error;
                if (!results.rows.length) return res.send("User unregistered or wrong password.");
                if (results.rows[0].verified == false) return res.send("Verify your email address first.");
                const user = {
                    user_id: results.rows[0].user_id,
                    user_type: results.rows[0].user_type,
                    user_email: results.rows[0].user_email,
                    verified: results.rows[0].verified,
                };
                const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });

                res.status(200).json({ token: token });
            });
        });
    });
};

function forgot_pass(req, res) {
    const { user_email } = req.body;

    pool.query(queries.checkEmail, [user_email], (error, results) => {
        if (error) throw error;
        if (!results.rows.length) return res.send("Email unregistered.");
        const token = jwt.sign({ user_email: user_email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });

        const message = `
            <p>Hello,<br><br>
            Here is a link to reset your password. Make sure to never share your new password with anyone else. You have 10 minutes tu change your password before this email expires.<br><br>
            <a href="http://localhost:3000/Reset_pass/${token}" style="color:#00F;"> Click here to reset your password. </a>
            </p>
            
            Best regards, <br><br>
            
            JobSpark's staff`

        functions.sendMail(user_email, "JobSpark - Reset your password", message);

        res.status(200).send("Email sent to: " + user_email);
    })

}
function reset_pass(req, res) {

    try { jwt.verify(req.params.token, process.env.ACCESS_TOKEN_SECRET); }
    catch { return res.send("The email to reset the password has expired.") }

    const token = jwt.decode(req.params.token);
    const user_email = token.user_email;
    const { user_pwd } = req.body;

    bcrypt.hash(user_pwd, 10, (error, result) => {
        const hashed_pass = result;
        pool.query(queries.updateUserPass, [hashed_pass, user_email], (error, results) => {
            if (error) throw error;
            pool.query(queries.addUID, [user_email], (error, results) => {
                if (error) throw error;
                let uuid = results.rows[0]["uuid_generate_v4"];
                let user_id = results.rows[0]["user_id"];
                let today = functions.getTimeNow();
                pool.query(queries.addInformation, [today, uuid, "Email: ResetPass", user_id], (error, results) => {
                    if (error) throw error;
                    res.status(201).send("Password updated.");
                })
            });
        });
    });

}

function verify_email(req, res) {
    const { user_email } = req.body;

    const token = jwt.sign({ user_email: user_email }, process.env.ACCESS_TOKEN_SECRET);

    const message = `
        <p>Hello,<br><br>
        Here is a link to verify your account.<br><br>
        <a href="http://localhost:3000/Verify/${token}" style="color:#00F;"> Click here to verify your account. </a>
        </p>
        
        Best regards, <br><br>
        
        JobSpark's staff`

    functions.sendMail(user_email, "JobSpark - Email verification", message);

    res.status(200).send("Email sent to: " + user_email);
}
function verify(req, res) {
    try { jwt.verify(req.params.token, process.env.ACCESS_TOKEN_SECRET); }
    catch { return res.send("The email to verify the account has expired.") }

    const token = jwt.decode(req.params.token);
    const user_email = token.user_email;

    pool.query(queries.verify, [user_email], (error, results) => {
        if (error) throw error;
        pool.query(queries.addUID, [user_email], (error, results) => {
            if (error) throw error;
            let uuid = results.rows[0]["uuid_generate_v4"];
            let user_id = results.rows[0]["user_id"];
            let today = functions.getTimeNow();
            pool.query(queries.addInformation, [today, uuid, "Email: verify", user_id], (error, results) => {
                if (error) throw error;
                res.status(201).send("Account verified.");
            })
        });
    });
}

function getUserType(req, res) {
    if (!Object.entries(res.locals).length) return (res.send("Not logged in."));
    return res.send(res.locals.user_info.user_type);
}

module.exports = {
    createToken,
    forgot_pass,
    reset_pass,
    verify_email,
    verify,
    getUserType
};