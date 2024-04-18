const db = require("../config/db")

function kueri(command) {
  return new Promise((resolve, reject) => {
    db.query(command, (err, result, fields) => {
      if (err) throw err;
      resolve(result);
    });
  });
}

module.exports = kueri;
