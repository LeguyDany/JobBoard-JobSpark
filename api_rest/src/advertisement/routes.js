const {Router} = require('express');
const controller = require('./controller');
const middleware = require('../../functions');

const router = Router();

router.get('/advertisement/all/', controller.getOffers);
router.get("/advertisement/", controller.getOffersByDynamic);
router.post('/advertisement/', [middleware.verify, middleware.checkRightsLv1] , controller.addOffer);
router.delete("/advertisement/:offer_id", [middleware.verify, middleware.checkRightsLv1] , controller.removeOffer);
router.put("/advertisement/:offer_id", [middleware.verify, middleware.checkRightsLv1] , controller.updateOffer);

module.exports = router;