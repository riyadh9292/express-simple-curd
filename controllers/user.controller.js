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
module.exports.saveAuser = (req, res) => {
  parsedUsers.push(req.body);
  const write = fs.writeFile("users.json", JSON.stringify(parsedUsers), (err) =>
    err ? console.log(err) : console.log("success")
  );
  res.status(201).send({
    success: true,
    messages: "Created",
    data: parsedUsers,
  });
};
module.exports.updateAuser = (req, res) => {
  const { id } = req.params;
  const newData = parsedUsers.find((user) => Number(user.id) === Number(id));

  try {
    newData.id = id;
    newData.contact = req.body.contact ?? newData.contact;
    newData.photoUrl = req.body.photoUrl ?? newData.photoUrl;
    newData.name = req.body.name ?? newData.name;
    newData.address = req.body.address ?? newData.address;
    newData.gender = req.body.gender ?? newData.gender;

    const newArray = parsedUsers.map((user) =>
      user.id === id ? newData : user
    );
    const write = fs.writeFile(
      "users.json",
      JSON.stringify(newArray),
      (err) => {
        if (err) {
          res.send(err);
        } else {
          res.send("success");
        }
      }
    );
  } catch (error) {
    res.status(404);
    res.send("please provide a valid id");
  }
};
module.exports.updateMultipleUser = (req, res) => {
  const userArray = req.body;
  //validate the user id
  try {
    for (let i = 0; i < userArray.length; i++) {
      if (!userArray[i].id) {
        res.status(404).send({
          success: false,
          messages: "User id not found",
          data: userArray,
        });
        return;
      }
    }
  } catch (error) {
    console.log(error);
  }
  const userIds = userArray.map((user) => user.id && user.id);

  for (let i = 0; i < parsedUsers.length; i++) {
    for (let j = 0; j < userArray.length; j++) {
      if (parsedUsers[i].id === userArray[j].id) {
        parsedUsers[i] = userArray[j];
      }
    }
  }
  const write = fs.writeFile("users.json", JSON.stringify(parsedUsers), (err) =>
    err ? res.send(err) : res.send("success")
  );
};
module.exports.deleteUser = (req, res) => {
  const { id } = req.params;
  try {
    const newUsers = parsedUsers.filter((user) => user.id !== id);
    // validate the user id
    if (newUsers.length === newUsers.length) {
      res.status(404).send({
        success: true,
        messages: "No user found",
        data: parsedUsers,
      });
      return;
    }
    const write = fs.writeFile(
      "users.json",
      JSON.stringify(newUsers),
      (err) => {}
      // err ? res.send(err) : res.send("successly delete")
    );
  } catch (error) {
    res.send("please provide a valid id");
  }
};
