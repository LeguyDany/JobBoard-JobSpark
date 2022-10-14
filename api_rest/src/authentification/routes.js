// Tells what happens depending on the request (post, delete, get...).
const { Router } = require('express');
const controller = require('./controller');
const middleware = require('../../functions');

const router = Router();

router.post('/login/', controller.createToken);
router.post('/forgotPass/', controller.forgot_pass);
router.post('/resetPass/:token', controller.reset_pass);
router.post('/verifymail/', controller.verify_email);
router.get('/verify/:token', controller.verify);
router.get('/user_type', middleware.verify ,controller.getUserType)

module.exports = router;