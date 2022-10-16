// Tells what happens depending on the request (post, delete, get...).
const { Router } = require('express');
const controller = require('./controller');
const middleware = require('../../functions');

const router = Router();

router.get('/users/all', controller.getUsers);
router.get('/users/:id', controller.getUserById);
router.post('/users', controller.addUser);
router.post('/users/back_office/', [middleware.verify, middleware.checkRightsLv2], controller.bo_addUser);
router.get("/users/dynamic/", controller.getUsersByDynamic);
router.delete("/users/:user_id", [middleware.verify, middleware.checkRightsLv1], controller.removeUser);
router.put("/users/:user_id", controller.updateUser);
router.put("/users/back_office/:id", controller.bo_updateUser);

module.exports = router;