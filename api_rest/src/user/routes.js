// Tells what happens depending on the request (post, delete, get...).
const { Router } = require('express');
const controller = require('./controller')

const router = Router();

router.get('/', controller.getUsers);
router.post('/', controller.addUser);
router.get("/:firstname", controller.getUsersByName); // ":" states the variable we will enter in the url.
router.delete("/:user_id", controller.removeUser);
router.put("/:user_id", controller.updateUser);

module.exports = router;