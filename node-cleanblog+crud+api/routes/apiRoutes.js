const express = require("express");
const router = express.Router();
const apiController = require("../controllers/apiController");

router.get("/api/employee", apiController.getEmployees);
router.post("/api/employee/create", apiController.createEmployee);
router.get('/api/employee/edit/:id', apiController.editEmployee)
router.post("/api/employee/edit/:id", apiController.updateEmployee);
router.get("/api/employee/delete/:id", apiController.deleteEmployee);

module.exports = router;
