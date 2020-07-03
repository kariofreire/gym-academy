const { age, date } = require("../../lib/date");

module.exports = {
  index(req, res) {
    return res.render("members/index");
  },
  create(req, res) {
    return res.render("members/create");
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] === "") return res.send("Please, fill all fields!");
    }

    return res.send("ok");
  },
  show(req, res) {
    return res.send("ok");
  },
  edit(req, res) {
    return res.send("ok");
  },
  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] === "") return res.send("Please, fill all fields!");
    }

    return res.send("ok");
  },
  delete(req, res) {
    return res.send("ok");
  },
};
