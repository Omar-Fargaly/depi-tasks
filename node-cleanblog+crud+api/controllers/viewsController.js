const getHome = (req, res) => {
  res.render("pages/index", { title: "Home Page" });
};
const getAbout = (req, res) => {
  res.render("pages/about", { title: "About Page" });
};


module.exports = {
  getHome,
  getAbout,
};
