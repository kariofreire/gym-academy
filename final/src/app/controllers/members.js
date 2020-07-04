const Member = require("../models/Member");
const { date } = require("../../lib/date");
const validate = require("../../lib/validate");

module.exports = {
  index(req, res) {
    Member.all(function (members) {
      return res.render("members/index", { members });
    });
  },
  create(req, res) {
    Member.instructorsSelectOptions(function (instructors) {
      return res.render("members/create", { instructors });
    });
  },
  post(req, res) {
    if (!validate(req.body)) return res.send("Please, fill all fields");

    Member.create(req.body, function (member) {
      return res.redirect(`/members/${member.id}`);
    });
  },
  show(req, res) {
    Member.find(req.params.id, function (member) {
      if (!member) return res.send("Member not found!");

      member.gender = member.gender === "M" ? "Masculino" : "Feminino";
      member.birth = date(member.birth).format;
      return res.render("members/show", { member });
    });
  },
  edit(req, res) {
    Member.find(req.params.id, function (member) {
      if (!member) return res.send("Member not found!");
      member.birth = date(member.birth).iso;

      Member.instructorsSelectOptions(function (instructors) {
        return res.render("members/edit", { member, instructors });
      });
    });
  },
  put(req, res) {
    if (!validate(req.body)) return res.send("Please, fill all fields");

    Member.update(req.body, function () {
      return res.redirect(`/members/${req.body.id}`);
    });
  },
  delete(req, res) {
    Member.delete(req.body.id, function () {
      return res.redirect(`/members`);
    });
  },
};
