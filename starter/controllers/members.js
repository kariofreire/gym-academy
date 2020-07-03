const fs = require("fs");
const data = require("../data.json");
const { date } = require("../helpers/date");

exports.index = (req, res) => {
  return res.render("members/index", { members: data.members });
};

exports.form = (req, res) => {
  return res.render("members/create");
};

exports.create = (req, res) => {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] === "") return res.send("Please, fill all fields!");
  }

  const birth = Date.parse(req.body.birth);
  const lastMember = data.members[data.members.length - 1];
  let id = 1;

  if (lastMember) id = lastMember.id + 1;

  data.members.push({
    ...req.body,
    id,
    birth,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write file error!");
    return res.redirect("/members");
  });
};

exports.show = (req, res) => {
  const { id } = req.params;
  const foundMember = data.members.find((member) => member.id === Number(id));

  if (!foundMember) return res.send("member not found!");

  const { gender, birth } = foundMember;

  const member = {
    ...foundMember,
    birth: date(birth),
    gender: gender === "M" ? "Masculino" : "Feminino",
  };

  return res.render("members/show", { member });
};

exports.edit = (req, res) => {
  const { id } = req.params;
  const foundMember = data.members.find((member) => member.id === Number(id));

  if (!foundMember) return res.send("member not found!");

  const { birth } = foundMember;

  const member = {
    ...foundMember,
    birth: date(birth, "iso"),
  };

  return res.render("members/edit", { member });
};

exports.update = (req, res) => {
  const { id } = req.body;
  let index = 0;

  const foundMember = data.members.find((member, foundIndex) => {
    if (member.id === Number(id)) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundMember) return res.send("member not found!");

  const member = {
    ...foundMember,
    ...req.body,
    id: Number(id),
    birth: Date.parse(req.body.birth),
  };

  data.members[index] = member;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write error!");

    return res.redirect(`/members/${id}`);
  });
};

exports.delete = (req, res) => {
  const { id } = req.body;

  const filteredMembers = data.members.filter(
    (instructor) => instructor.id !== Number(id)
  );

  data.members = filteredMembers;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write error!");
    return res.redirect(`/members`);
  });
};
