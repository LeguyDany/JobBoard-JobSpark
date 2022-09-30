// Tells what happens depending on the request (post, delete, get...).
const { Router } = require('express');
const controller = require('./controller')

const router = Router();

router.get('/users', controller.getUsers);
router.post('/users', controller.addUser);
router.get("/users/:firstname", controller.getUsersByName); // ":" states the variable we will enter in the url.
router.delete("/users/:user_id", controller.removeUser);
router.put("/users/:user_id", controller.updateUser);

module.exports = router;