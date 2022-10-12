const pool = require('../../db');
const queries = require('./queries');
const functions = require('../../functions');

require("dotenv").config();
const jwt = require('jsonwebtoken');

function createToken(req, res) {
    const { user_email, user_pwd } = req.body;
    pool.query(queries.getUserInfo, [user_email, user_pwd], (error, results) => {
        if (error) throw error;
        if (!results.rows.length) return res.send("User unregistered or wrong password.");
        const user = {
            user_id: results.rows[0].user_id,
            user_type: results.rows[0].user_type,
            user_email: results.rows[0].user_email,
        };
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });

        res.status(200).json({ token: token });
    });
};

function forgot_pass(req, res) {
    try {
        const { email, firstname } = req.body;
        functions.sendMail(email, "JobSpark - Generate a new password", ```
        Hello ${firstname},

        Here is a link to reset your password. Make sure to never share this password with anyone else.

        Best regards,

        JobSpark's staff
        ```);

    } catch (error) {
        res.status(400).send("Error:" + error)
    }
}

module.exports = {
    createToken,
    forgot_pass,
};