const { Router } = require('express');
const controller = require('./controller');
const middleware = require('../../functions');

const router = Router();

router.get('/advertisement/all/', controller.getOffers);
router.get("/advertisement/dynamic/", controller.getOffersByDynamic);
router.get("/advertisement/:id", [middleware.verify, middleware.checkRightsLv1], controller.getOfferById);

router.post('/advertisement/', [middleware.verify, middleware.checkRightsLv1], controller.addOffer);
router.post('/advertisement/back_office/', [middleware.verify, middleware.checkRightsLv2], controller.bo_addOffer);

router.delete("/advertisement/:offer_id", [middleware.verify, middleware.checkRightsLv1], controller.removeOffer);

router.put("/advertisement/:offer_id", [middleware.verify, middleware.checkRightsLv1], controller.updateOffer);
router.put("/advertisement/back_office/:id", controller.bo_updateOffer);

module.exports = router;