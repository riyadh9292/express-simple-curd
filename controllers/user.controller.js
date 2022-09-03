const fs = require("fs");

function rand(items) {
  // "|" for a kinda "int div"
  return items[(items.length * Math.random()) | 0];
}

module.exports.getRandomUser = (req, res, next) => {
  let randomUser = {};
  const users = fs.readFileSync("users.json");
  randomUser = rand(JSON.parse(users));
  res.send(randomUser);
  // const { limit, page } = req.query;
  // console.log(limit, page);
  // undefined.test();
  // res.json(tools.slice(0, limit));
};
