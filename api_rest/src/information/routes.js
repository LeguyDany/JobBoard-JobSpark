const {Router} = require('express');
const controller = require('./controller');
const middleware = require('../../functions');

const router = Router();

router.get('/information/all/', [middleware.verify, middleware.checkRightsLv1],controller.getInformation);
router.get("/information/", [middleware.verify, middleware.checkRightsLv1], controller.getInformationByDynamic);
router.post('/information/', [middleware.verify, middleware.checkRightsLv1], controller.addInformation);
router.delete("/information/:information_id", [middleware.verify, middleware.checkRightsLv1], controller.removeInformation);
router.put("/information/:information_id", [middleware.verify, middleware.checkRightsLv1], controller.updateInformation);

module.exports = router;