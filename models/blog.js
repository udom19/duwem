var mongoose = require("mongoose")
// Schema Setup
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    content: String, 
    // date: Number,
    author: String,
    authorProfile: String,
    authorImage: String,
    authorFacebookLink: String,
    authorTwitterLink: String,
    authorLinkedInLink: String,
    authorInstagramLink: String,
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }]
  });
  
  module.exports = mongoose.model("Blog", blogSchema);