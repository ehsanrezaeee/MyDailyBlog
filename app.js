
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose")
var _ = require("lodash")

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://Admin-Ehsan:Test123@cluster0.p4ugnh8.mongodb.net/BlogDB");

const titleSchema = {
  name: String
};

const paragSchema = {
  Title: String,
  Del: String
}

const Title = mongoose.model("Title", titleSchema);
const Parag = mongoose.model("Parag", paragSchema);

const homeStartingContent = new Title({
  name: "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."
});
const aboutContent = new Title({
  name: "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui."
});

const contactContent = new Title({
  name: "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero."
});


app.get("/", function(req, res){

  Parag.find({}, function(err, foundparag){
    if (!foundparag) {
      res.render("home", {home_Starting_Content: homeStartingContent.name, posts: []})
    } else {
      res.render("home", {home_Starting_Content: homeStartingContent.name, posts: foundparag})
    }
  });

});

app.get("/about", function(req, res){
  res.render("about", {about_content: aboutContent.name})
});

app.get("/contact", function(req, res){
  res.render("contact", {contact_content: contactContent.name})
});

app.get("/compose", function(req, res){
  res.render("compose")
});


app.post("/compose", function(req, res){
  const a =req.body.text2
  const brr = new Parag({
    Title: req.body.text1,
    Del: a
  });
  brr.save();
  res.redirect("/")
});

app.get("/posts/:postid", function(req, res){
const requestedid = req.params.postid
Parag.findOne({_id: requestedid}, function(err, post){
  res.render("post", {storedItems: post.Title, content1: post.Del})
})
});





app.listen(3000, function() {
  console.log("server running");
});
