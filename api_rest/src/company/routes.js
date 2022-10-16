// Tells what happens depending on the request (post, delete, get...).
const { Router } = require('express');
const controller = require('./controller');
const middleware = require('../../functions');

const router = Router();

router.get('/companies/all/', middleware.verify, controller.getCompanies);
router.get("/companies/dynamic/", controller.getCompaniesByDynamic);
router.get("/companies/:id", controller.getCompanyById);

router.post("/companies/", [middleware.verify, middleware.checkRightsLv2], controller.addCompany);
router.post('/companies/back_office/', [middleware.verify, middleware.checkRightsLv2], controller.bo_addCompany);

router.delete("/companies/:company_id", [middleware.verify, middleware.checkRightsLv1], controller.removeCompany);

router.put("/companies/:company_id", [middleware.verify, middleware.checkRightsLv1], controller.updateCompany);
router.put("/companies/back_office/:id", [middleware.verify, middleware.checkRightsLv2], controller.bo_updateCompany);

module.exports = router;