const { date } = require("../../lib/date");
const db = require("../../config/db");

module.exports = {
  all(cb) {
    const query = `
      SELECT instructors.*, count(members) as total_students 
      FROM instructors LEFT JOIN members on (instructors.id = members.instructor_id)
      GROUP BY instructors.id
      ORDER BY total_students DESC;
    `;

    db.query(query, function (err, results) {
      if (err) throw `database error: ${err.message}`;
      cb(results.rows);
    });
  },
  create(data, cb) {
    const query = `
      INSERT INTO instructors(
        name,
        avatar_url,
        gender,
        services,
        birth,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id
    `;

    const { name, avatar_url, gender, services, birth } = data;
    const values = [
      name,
      avatar_url,
      gender,
      services,
      date(birth).iso,
      date(Date.now()).iso,
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `database error: ${err.message}`;
      cb(results.rows[0]);
    });
  },
  find(id, cb) {
    const query = "SELECT * FROM instructors WHERE id = $1";
    db.query(query, [id], function (err, results) {
      if (err) throw `database error: ${err.message}`;
      cb(results.rows[0]);
    });
  },
  update(data, cb) {
    const query = `
      UPDATE instructors SET
        avatar_url=($1),
        name=($2),
        birth=($3),
        gender=($4),
        services=($5)
      WHERE id = $6
    `;

    const values = [
      data.avatar_url,
      data.name,
      data.birth,
      data.gender,
      data.services,
      data.id,
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `database error: ${err.message}`;
      cb();
    });
  },
  delete(id, cb) {
    const query = "DELETE FROM instructors WHERE id = $1";
    db.query(query, [id], function (err, results) {
      if (err) throw `database error: ${err.message}`;
      cb();
    });
  },
};
