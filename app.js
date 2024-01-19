const express = require("express");
const body_parser = require("body-parser");
const notifier = require("node-notifier");
const fs = require('fs');
const app = express();
const importedDate = require(__dirname +"/dateLocalModule.js");

var newItems = fs.readFileSync('list_data.txt').toString().split("\n").slice(1);

const port = 2024;

app.use(body_parser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  var date = importedDate.getCurrentDate();
  var name = "User";
  var seconds = new Date().getSeconds();

  res.render("todolist", { date: date, name: name, newItems: newItems });
});

app.post("/", (req, res) => {
  var item = req.body.user_input;
  console.log(req.body);

  if (req.body.action === "add") {
    if (newItems.includes(item)) {
      notifier.notify({
        title: "Cant Add " + item,
        message: "Item Already Exists!",
      });
    } else {
      if (item !== "" && item !== null && req.body.action === "add") {
        newItems.push(item);
      }
    }
  } else if (req.body.action === "remove") {
    var tempArray = [];
    let boo = false;
    for (let i = 0; i < newItems.length; i++) {
      if (newItems[i] !== item) {
        tempArray.push(newItems[i]);
      }
      if (newItems[i] === item) {
        boo = true;
      }
    }

    if (boo === false) {
      notifier.notify({
        title: "Cant Remove " + item,
        message: "Item Doesnt Exists!",
      });
    }
    newItems = tempArray;
  }

  console.log(newItems)
  writeFileMethod();
  res.redirect("/");
});

app.listen(port, () => {
  console.log("Listening to localhost at " + port);
});


async function writeFileMethod(){
  await fs.writeFileSync('./list_data.txt', newItems.join('\n'));
  }