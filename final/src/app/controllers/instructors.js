const fs = require("fs");
const data = require("../data.json");
const { age, date } = require("../helpers/date");

exports.index = (req, res) => {
  return res.render("instructors/index", { instructors: data.instructors });
};

exports.form = (req, res) => {
  return res.render("instructors/create");
};

exports.create = (req, res) => {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] === "") return res.send("Please, fill all fields!");
  }

  const { avatar_url, name, birth, gender, services } = req.body;
  const formattedBirth = Date.parse(birth);
  const created_at = Date.now();
  const id = Number(data.instructors.length + 1);

  data.instructors.push({
    id,
    created_at,
    avatar_url,
    name,
    birth: formattedBirth,
    gender,
    services,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write file error!");
    return res.redirect("/instructors");
  });
};

exports.show = (req, res) => {
  const { id } = req.params;
  const foundInstructor = data.instructors.find(
    (instructor) => instructor.id === Number(id)
  );

  if (!foundInstructor) return res.send("Instructor not found!");

  const { services, gender, birth, created_at } = foundInstructor;

  const instructor = {
    ...foundInstructor,
    age: age(birth),
    gender: gender === "M" ? "Masculino" : "Feminino",
    services: services.split(",").map((service) => service.trim()),
    created_at: date(created_at),
  };

  return res.render("instructors/show", { instructor });
};

exports.edit = (req, res) => {
  const { id } = req.params;
  const foundInstructor = data.instructors.find(
    (instructor) => instructor.id === Number(id)
  );

  if (!foundInstructor) return res.send("Instructor not found!");

  const { birth } = foundInstructor;

  const instructor = {
    ...foundInstructor,
    birth: date(birth, "iso"),
  };

  return res.render("instructors/edit", { instructor });
};

exports.update = (req, res) => {
  const { id } = req.body;
  let index = 0;

  const foundInstructor = data.instructors.find((instructor, foundIndex) => {
    if (instructor.id === Number(id)) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundInstructor) return res.send("Instructor not found!");

  const instructor = {
    ...foundInstructor,
    ...req.body,
    id: Number(id),
    birth: Date.parse(req.body.birth),
  };

  data.instructors[index] = instructor;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write error!");

    return res.redirect(`/instructors/${id}`);
  });
};

exports.delete = (req, res) => {
  const { id } = req.body;

  const filteredInstructors = data.instructors.filter(
    (instructor) => instructor.id !== Number(id)
  );

  data.instructors = filteredInstructors;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
    if (err) return res.send("Write error!");
    return res.redirect(`/instructors`);
  });
};
