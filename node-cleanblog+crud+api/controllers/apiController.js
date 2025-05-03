const Employee = require("../models/employee");


const getEmployees = (req, res) => {
  Employee.find()
    .then((employees) => {
      res.status(200).json({ success: true, employees });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ success: false, message: "Error fetching employees" });
    });
};

const createEmployee = (req, res) => {
  const { name, gender, address, salary } = req.body;

  const newEmployee = new Employee({ name, gender, address, salary });

  newEmployee
    .save()
    .then(() => res.status(201).json({ success: true, message: "Employee created" }))
    .catch((err) => {
      console.error(err);
      res.status(500).json({ success: false, message: "Error creating employee" });
    });
};

const editEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);

    if (!employee) return res.status(404).json({ success: false, message: "Employee not found" });

    res.status(200).json({ success: true, employee });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching employee" });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, gender, address, salary } = req.body;

    const updated = await Employee.findByIdAndUpdate(id, { name, gender, address, salary }, { new: true });

    if (!updated) return res.status(404).json({ success: false, message: "Employee not found" });

    res.status(200).json({ success: true, message: "Employee updated", employee: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error updating employee" });
  }
};

const deleteEmployee = (req, res) => {
  const { id } = req.params;

  Employee.findByIdAndDelete(id)
    .then((deleted) => {
      if (!deleted) return res.status(404).json({ success: false, message: "Employee not found" });

      res.status(200).json({ success: true, message: "Employee deleted" });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ success: false, message: "Error deleting employee" });
    });
};

module.exports = {
  getEmployees,
  createEmployee,
  editEmployee,
  updateEmployee,
  deleteEmployee,
};
