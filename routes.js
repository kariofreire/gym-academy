const express = require("express");
const routes = express.Router();
const instructors = require("./controllers/instructors");
const members = require("./controllers/members");

routes.get("/", (req, res) => {
  return res.redirect("/instructors");
});

routes.get("/instructors", instructors.index);
routes.get("/instructors/create", instructors.form);
routes.post("/instructors", instructors.create);
routes.get("/instructors/:id", instructors.show);
routes.get("/instructors/:id/edit", instructors.edit);
routes.put("/instructors", instructors.update);
routes.delete("/instructors", instructors.delete);

routes.get("/members", members.index);
routes.get("/members/create", members.form);
routes.post("/members", members.create);
routes.get("/members/:id", members.show);
routes.get("/members/:id/edit", members.edit);
routes.put("/members", members.update);
routes.delete("/members", members.delete);

module.exports = routes;
