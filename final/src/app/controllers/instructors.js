const Instructor = require("../models/Instructor");
const { age, date } = require("../../lib/date");
const validate = require("../../lib/validate");

module.exports = {
  index(req, res) {
    const { filter } = req.query;
    const page = req.query.page || 1;
    const limit = req.query.limit || 2;
    const offset = limit * (page - 1);

    const params = {
      filter,
      page,
      limit,
      offset,
      cb(instructors) {
        const total = instructors.length
          ? Math.ceil(instructors[0].total / limit)
          : 0;

        return res.render("instructors/index", {
          instructors,
          filter,
          total,
        });
      },
    };

    Instructor.paginate(params);
  },
  create(req, res) {
    return res.render("instructors/create");
  },
  post(req, res) {
    if (!validate(req.body)) return res.send("Please, fill all fields");

    Instructor.create(req.body, function (instructor) {
      return res.redirect(`/instructors/${instructor.id}`);
    });
  },
  show(req, res) {
    Instructor.find(req.params.id, function (instructor) {
      if (!instructor) return res.send("Instructor not found!");

      instructor.age = age(instructor.birth);
      instructor.services = instructor.services.split(",");
      instructor.gender = instructor.gender === "M" ? "Masculino" : "Feminino";
      instructor.created_at = date(instructor.created_at).format;
      return res.render("instructors/show", { instructor });
    });
  },
  edit(req, res) {
    Instructor.find(req.params.id, function (instructor) {
      if (!instructor) return res.send("Instructor not found!");
      instructor.birth = date(instructor.birth).iso;
      return res.render("instructors/edit", { instructor });
    });
  },
  put(req, res) {
    if (!validate(req.body)) return res.send("Please, fill all fields");

    Instructor.update(req.body, function () {
      return res.redirect(`/instructors/${req.body.id}`);
    });
  },
  delete(req, res) {
    Instructor.delete(req.body.id, function () {
      return res.redirect(`/instructors`);
    });
  },
};
