const express = require("express");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
var swal = require("sweetalert");

const app = express();

//DB connection
// mongoose.connect("mongodb://localhost:27017/cnlpuDB");
mongoose.connect(
  "mongodb+srv://lchetan:chetan2002@cluster0.ovfbv.mongodb.net/form?retryWrites=true&w=majority"
);
//Create Schema
const formSchema = new mongoose.Schema({
  title:String,
  content:String,
});

//Create model
const Form = mongoose.model("Form", formSchema);

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function (req, res) {
  const userForm = new Form({
    title: req.body.title,
    content: req.body.content,
    
  });
  userForm.save(function (err) {
    console.log(err);
    res.redirect("/");
  });
});



let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
  console.log("Server has started successfully");
});
