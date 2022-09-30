// Tells what happens depending on the request (post, delete, get...).
const { Router } = require('express');
const controller = require('./controller')

const router = Router();

router.get('/company/', controller.getCompanies);
router.post('/company/', controller.addCompany);
router.get("/company/:company_name", controller.getCompaniesByName);
router.delete("/company/:company_id", controller.removeCompany);
router.put("/company/:company_id", controller.updateCompany);

module.exports = router;