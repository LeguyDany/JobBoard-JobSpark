const {Router} = require('express');
const controller = require('./controller')

const router = Router();

router.get('/information/all/', controller.getInformation);
router.get("/information/", controller.getInformationByDynamic);
router.post('/information/', controller.addInformation);
router.delete("/information/:information_id", controller.removeInformation);
router.put("/information/:information_id", controller.updateInformation);

module.exports = router;