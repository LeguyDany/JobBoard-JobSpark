// Tells what happens depending on the request (post, delete, get...).
const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.post('/login/', controller.createToken);
router.post('/forgotPass/', controller.forgot_pass);

module.exports = router;