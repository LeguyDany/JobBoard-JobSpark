const {Router} = require('express');
const controller = require('./controller')

const router = Router();

router.get('/advertisement/all/', controller.getOffers);
router.get("/advertisement/", controller.getOffersByDynamic);
router.post('/advertisement/', controller.addOffer);
router.delete("/advertisement/:offer_id", controller.removeOffer);
router.put("/advertisement/:offer_id", controller.updateOffer);

module.exports = router;