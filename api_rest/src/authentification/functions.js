var LocalStorage = require('node-localstorage').LocalStorage,
    localStorage = new LocalStorage('./JobSpark_localStorage');

// ========================= Authentification ========================= //
require("dotenv").config()
const jwt = require('jsonwebtoken');

function createToken(req, res) {
    try{
        const { user_id, user_type, user_email } = req.body;
        const user = {
            user_id: user_id,
            user_type: user_type,
            user_email: user_email,
        }
        
        const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24h' });
        
        localStorage.clear();
        localStorage.setItem('token', token);
        
        res.json({ token: token });

    } catch(error){
        throw error;
    }
}

function verify(req, res, next) {
    // Checks which kind of user is making an API request.

    // User not logged in
    if (!localStorage.getItem('token')) return next();

    // User logged in
    try{
        const token = localStorage.getItem('token');

        // const token = req.headers.authorization.split(' ')[1];
        const decrypt_token = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
        res.locals.user_info = {
            user_id: decrypt_token.user_id,
            user_type: decrypt_token.user_type,
            user_email: decrypt_token.user_email
        }

        next();

    // Login session expired
    } catch (error) {
        console.log(error);
        next();
    }
}

module.exports = {
    createToken,
    verify,
}