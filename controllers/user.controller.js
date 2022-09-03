const fs = require("fs");

const users = fs.readFileSync("users.json");
const parsedUsers = JSON.parse(users);

function rand(items) {
  // "|" for a kinda "int div"
  return items[(items.length * Math.random()) | 0];
}

module.exports.getRandomUser = (req, res, next) => {
  let randomUser = {};
  randomUser = rand(parsedUsers);
  res.send(randomUser);
};
module.exports.getAllUser = (req, res, next) => {
  // let randomUser = {};
  const { start, end } = req.query;
  console.log(start, end);
  // console.log(parsedUsers[(start, end)]);
  if (start && end) {
    res.send(parsedUsers.slice(start, end));
  } else {
    res.send(parsedUsers);
  }
};
