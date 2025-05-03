const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: String,
  gender: String,
  address: String,
  salary: Number,
});

module.exports = mongoose.model('Employee', employeeSchema);
