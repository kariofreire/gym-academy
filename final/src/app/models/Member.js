const { date } = require("../../lib/date");
const db = require("../../config/db");

module.exports = {
  all(cb) {
    const query = "SELECT * FROM members ORDER BY name ASC";
    db.query(query, function (err, results) {
      if (err) throw `database error: ${err.message}`;
      cb(results.rows);
    });
  },
  create(data, cb) {
    const query = `
      INSERT INTO members(
        name,
        avatar_url,
        email,
        gender,
        birth,
        blood,
        weight,
        height
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id
    `;

    const values = [
      data.name,
      data.avatar_url,
      data.email,
      data.gender,
      date(data.birth).iso,
      data.blood,
      data.weight,
      data.height,
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `database error: ${err.message}`;
      cb(results.rows[0]);
    });
  },
  find(id, cb) {
    const query = "SELECT * FROM members WHERE id = $1";
    db.query(query, [id], function (err, results) {
      if (err) throw `database error: ${err.message}`;
      cb(results.rows[0]);
    });
  },
  update(data, cb) {
    const query = `
      UPDATE members SET
        name=($1),
        avatar_url=($2),
        email=($3),
        gender=($4),
        birth=($5),
        blood=($6),
        weight=($7),
        height=($8)
      WHERE id = $9
    `;

    const values = [
      data.name,
      data.avatar_url,
      data.email,
      data.gender,
      date(data.birth).iso,
      data.blood,
      data.weight,
      data.height,
      data.id,
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `database error: ${err.message}`;
      cb();
    });
  },
  delete(id, cb) {
    const query = "DELETE FROM members WHERE id = $1";
    db.query(query, [id], function (err, results) {
      if (err) throw `database error: ${err.message}`;
      cb();
    });
  },
};
