const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employeeController");

router.get("/employee", employeeController.getEmployees);
router.post("/employee/create", employeeController.createEmployee);
router.get('/employee/edit/:id', employeeController.editEmployee)
router.post("/employee/edit/:id", employeeController.updateEmployee);
router.get("/employee/delete/:id", employeeController.deleteEmployee);

module.exports = router;
