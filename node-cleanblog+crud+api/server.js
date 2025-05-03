require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const expressLayouts = require("express-ejs-layouts");
const viewsRoutes = require("./routes/viewsRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const apiRoutes = require("./routes/apiRoutes");

const app = express();
const port = process.env.PORT || 5000;

connectDB();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("layout", "layout");

app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", viewsRoutes);
app.use("/", employeeRoutes);
app.use("/", apiRoutes);

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
