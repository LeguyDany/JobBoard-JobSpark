// Tells what happens depending on the request (post, delete, get...).
const { Router } = require('express');
const controller = require('./controller');
const middleware = require('../../functions');

const router = Router();

router.get('/users/all', controller.getUsers);
router.post('/users', controller.addUser);
router.get("/users/", controller.getUsersByDynamic);
router.delete("/users/:user_id", [middleware.verify, middleware.checkRightsLv1], controller.removeUser);
router.put("/users/:user_id", controller.updateUser);

module.exports = router;