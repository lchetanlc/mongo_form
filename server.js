const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb+srv://lchetanlc:mypassword@cluster0.eiodoqw.mongodb.net/forms?retryWrites=true&w=majority",
  { useNewUrlParser: true },
  { useUndefinedTopology: true }
);

//create data schema
const formSchema = {
  title: String,
  content: String,
};
const Form = mongoose.model("Form", formSchema);
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/main", function (req, res) {
  res.sendFile(__dirname + "/main.html");
});

//app.post
app.post("/", function (req, res) {
  let newForm = new Form({
    title: req.body.title,
    content: req.body.content,
  });
  newForm.save();
  res.redirect("/main");
});

app.listen(3000, function () {
  console.log("server is running");
});
