
var mongoose = require("mongoose"),
    Blog     = require("./models/blog"),
    Comment  = require("./models/comment");
    
    var data = [
        {
            title: "What is coding?",
            image: "../images/childs.jpg", 
            content: "a careful look at the most successful professionals both living and dead will reveal that most of them started out doing what makes them successful at a very young age.", 
            author: "Etido Okoh", 
            authorProfile: "Jerry loves writing",
            authorImage: "../images/olivia.jpg",
            authorFacebookLink: "facebook.com/cudom2",
            authorTwitterLink: "twitter.com",
            authorLinkedInLink: "linkedin.com",
            authorInstagramLink: "instagram.com"
        },
        {
            title: "Importance of Coding To Kids",
            image: "../images/childs.jpg", 
            content: "There are a lot of benefits in young people starting to learn and practice what they will do even when they are not aware", 
            author: "Jerry Paulinus", 
            authorProfile: "Jerry loves writing",
            authorImage: "../images/olivia.jpg",
            authorFacebookLink: "facebook.com/cudom2",
            authorTwitterLink: "twitter.com",
            authorLinkedInLink: "linkedin.com",
            authorInstagramLink: "instagram.com"
        }
    ];

function seedDB(){
    // Remove all Blogs
    Blog.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed Blogs");
            // Add Blogs
        data.forEach(function(seed){
            Blog.create(seed, function(err, blog){
                if(err){
                    console.log(err);
                }else{
                    console.log("added Blog");
                    // Create comments
                    Comment.create({
                        text: "This blog is making sense",
                        author: "Mike Jim"  
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        }else{
                        blog.comments.push(comment);
                        blog.save();
                        console.log("created a new comment");
                        }   
                    }) ;
                }
            });
        });
    });
    
    // Add a few comments
}

module.exports = seedDB;