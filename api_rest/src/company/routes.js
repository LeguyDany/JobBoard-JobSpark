// Tells what happens depending on the request (post, delete, get...).
const { Router } = require('express');
const controller = require('./controller');
const middleware = require('../../functions');

const router = Router();

router.get('/companies/all/', middleware.verify, controller.getCompanies);
router.get("/companies/dynamic/", controller.getCompaniesByDynamic);
router.post("/companies/", [middleware.verify, middleware.checkRightsLv1], controller.addCompany);
router.delete("/companies/:company_id", [middleware.verify, middleware.checkRightsLv1], controller.removeCompany);
router.put("/companies/:company_id", [middleware.verify, middleware.checkRightsLv1], controller.updateCompany);

module.exports = router;