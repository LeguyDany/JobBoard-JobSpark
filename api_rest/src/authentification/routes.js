// Tells what happens depending on the request (post, delete, get...).
const { Router } = require('express');
const functions = require('./functions');

const router = Router();

router.post('/login/', functions.createToken);

module.exports = router;