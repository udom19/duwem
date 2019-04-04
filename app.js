var express = require("express");
var app = express();

var publicDir = require('path').join(__dirname,'/public');

app.set("view engine", "ejs");
app.use(express.static(publicDir));

app.get("/", function(req, res){
  res.render("landing");
});

app.get("/etgehubteens", function(req, res){
  res.render("etgehubteens");
});

app.get("/parents", function(req, res){
  res.render("parents");
});

app.get("/educators", function(req, res){
  res.render("educators");
});

app.get("/web", function(req, res){
  res.render("web");
});

app.post("/contact", function(req, res){
  res.render("contact.ejs");
});

app.get("/etgehubteens/juniors", function(req, res){
  res.render("juniors");
});

app.get("/etgehubteens/elementary", function(req, res){
  res.render("elementary");
});

app.get("/etgehubteens/intermediate", function(req, res){
  res.render("intermediate");
});

app.get("/etgehubteens/advance", function(req, res){
  res.render("advance");
});


app.listen(process.env.PORT || 5000, function(){
  console.log("The Server has started");
}); 