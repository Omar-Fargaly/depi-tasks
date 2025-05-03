const Employee = require("../models/employee");

const getEmployees = (req, res) => {
  Employee.find()
    .then((employees) => {
      res.render("pages/employee", { employees });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error fetching employees");
    });
};


const createEmployee = (req, res) => {
  const { name, gender, address, salary } = req.body;

  const newEmployee = new Employee({ name, gender, address, salary });

  newEmployee
    .save()
    .then(() => res.redirect("/employee"))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error creating employee");
    });
};

const editEmployee = async (req, res) => {
    const { id } = req.params;
    const employee = await Employee.findById(id); 
    const employees = await Employee.find(); 
    res.render('pages/employee', { employee, employees }); 
  };
  
const updateEmployee = async (req, res) => {
    const { id } = req.params;
    const { name, gender, address, salary } = req.body;
  
    await Employee.findByIdAndUpdate(id, { name, gender, address, salary });
    res.redirect('/employee');
  };
  

const deleteEmployee = (req, res) => {
  const { id } = req.params;

  Employee.findByIdAndDelete(id)
    .then(() => res.redirect("/employee"))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting employee");
    });
};

module.exports = {
  getEmployees,
  createEmployee,
  editEmployee,
  updateEmployee,
  deleteEmployee,
};
