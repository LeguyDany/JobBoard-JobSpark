const { Router } = require('express');
const controller = require('./controller');
const middleware = require('../../functions');

const router = Router();

router.get('/information/all/', [middleware.verify, middleware.checkRightsLv1], controller.getInformation);
router.get('/information/:id', [middleware.verify, middleware.checkRightsLv1], controller.getInformationById);
router.get("/information/dynamic/", [middleware.verify, middleware.checkRightsLv1], controller.getInformationByDynamic);
router.post('/information/', controller.applyOffer);
router.post('/information/back_office/', [middleware.verify, middleware.checkRightsLv2], controller.bo_addInformation);
router.delete("/information/:information_id", [middleware.verify, middleware.checkRightsLv1], controller.removeInformation);
router.put("/information/:information_id", [middleware.verify, middleware.checkRightsLv1], controller.updateInformation);
router.put("/information/back_office/:id", [middleware.verify, middleware.checkRightsLv2], controller.bo_updateInformation);


module.exports = router;