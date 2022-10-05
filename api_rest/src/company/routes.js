// Tells what happens depending on the request (post, delete, get...).
const { Router } = require('express');
const controller = require('./controller');
const authentification = require('../authentification/functions');

const router = Router();

router.get('/companies/all/', authentification.verify , controller.getCompanies);
router.get("/companies/", controller.getCompaniesByDynamic);
router.post('/companies/', authentification.verify , controller.addCompany);
router.delete("/companies/:company_id", authentification.verify , controller.removeCompany);
router.put("/companies/:company_id", authentification.verify , controller.updateCompany);

module.exports = router;