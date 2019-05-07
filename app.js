var     express               = require("express"),
        app                   = express(),
        seedDB                = require("./seeds"),
        mongoose              = require("mongoose"),
        bodyParser            = require("body-parser"),
        User                  = require("./models/user"),
        Blog                  = require("./models/blog"),
        passport              = require("passport"),
        LocalStrategy         = require("passport-local").Strategy,
        passportLocalMongoose = require("passport-local-mongoose"),
        Comment               = require("./models/comment");
         


var publicDir = require('path').join(__dirname,'/public');


// Database
mongoose.connect("mongodb://localhost/etgehub", {useNewUrlParser: true });


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
  secret: "My eldest cousi's name is Pius",
  resave: false,
  saveUninitialized: false
}));
app.use(express.static(publicDir));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


seedDB();

// ============== ROUTES ===============

// Landing Route
app.get("/", function(req, res){
  res.render("blogs/landing");
}); 
// Kids Code Landing Route  
app.get("/etgehubteens", function(req, res){
  res.render("etgehubteens"); 
});
// Parents Routes
app.get("/parents", function(req, res){
  res.render("parents");
});
// Educators route
app.get("/educators", function(req, res){
  res.render("educators");
});
// web route
app.get("/web", function(req, res){
  res.render("web");
});
// contact us route
app.post("/contact", function(req, res){
  res.render("contact.ejs");
});
// junior secondary route
app.get("/etgehubteens/juniors", function(req, res){
  res.render("juniors");
});

app.get("/etgehubteens/elementary", function(req, res){
  res.render("elementary");
});

app.get("/etgehubteens/intermediate", function(req, res){
  res.render("intermediate");
});
// talent route
app.get("/talentdev", function(req, res){
  res.render("talentdev");
});
// Blogs landing route
app.get("/blogs", function(req, res){
// Get all blogs from DB:
Blog.find({}, function(err, allBlogs){
  if(err){
    console.log(err);
  }else{
    res.render("blogs/blog_landing", {blogs: allBlogs});
  }
});
});

app.post("/blogs", function(req, res){
  // Get data from form and add to blog array
  var title         = req.body.title;
  var image         = req.body.image;
  var content       = req.body.content;
  var date          = req.body.date;
  var author        = req.body.author;
  var authorProfile = req.body.authorProfile;
  var authorImage   = req.body.authorImage;
  var authorFacebookLink  = req.body.authorFacebookLink;
  var authorTwitterLink   = req.body.authorTwitterLink;
  var authorLinkedInLink  = req.body.authorLinkedInLink;
  var authorInstagramLink = req.body.authorInstagramLink;
  var newBlog       = {
    title: title, 
    image: image, 
    content: content, 
    date: date, 
    author: author, 
    authorProfile: authorProfile,
    authorImage: authorImage,
    authorFacebookLink: authorFacebookLink,
    authorTwitterLink: authorTwitterLink,
    authorLinkedInLink: authorLinkedInLink,
    authorInstagramLink: authorInstagramLink
  };
  // Create a new blog and save to the DB:
  Blog.create(newBlog, function(err, newlyCreated){
    if(err){
      console.log(err);
    }else{
  // Redirect back to blogs page.
      res.redirect("/blogs");
    }
  });
});
// new blog route
app.get("/blogs/new", function(req, res){
  res.render("blogs/new_blog"); 
});

// SHOW: Shows more info about a blog
app.get("/blogs/:id", function(req, res){
  // Find the blog with provided id
  Blog.findById(req.params.id).populate("comments").exec(function(err, foundBlog){
    if(err){
      console.log(err);
    }else{
      console.log(foundBlog);
      // render single_blog template with the blog
      res.render("blogs/single_blog", {blog: foundBlog});
    }
  });
});
// About us route
app.get("/about-us", function(req, res){
  res.render("about-us");
});

// ========================Comment Routes =======================
app.get("/blogs/:id/comments/new", function(req, res){
  // Find blog by id
  Blog.findById(req.params.id, function(err, blog){
    if(err){
      console.log(err);
    }else{
      res.render("blogs/single_blog", {blog: blog});
    }
  });
});

app.post("/blogs/:id/comments", function(req, res){
  // lookup blogs using id
  Blog.findById(req.params.id, function(err, blog){
    if(err){
      console.log(err);
      res.redirect("/blogs");
    }else{
      Comment.create(req.body.comment, function(err, comment){
        if(err){
          console.log(err);
        }else{
          blog.comments.push(comment);
          blog.save();
          res.redirect("/blogs/" + blog._id);
        }
      });
    }
  })
  // create new command
  // connect new comment to campground
  // redirect to single_blog page
});

// ============== AUTH ROUTES =============

// Sign up form route
app.get("/register", function(req, res){
  res.render("register");
});

// Handling user sign up
app.post("/register", function(req, res){
  req.body.username,
  req.body.password,
  User.register(new User({username: req.body.username}), req.body.password, function(err, user){
  if(err){
    console.log(err);
    return res.render("register");
  }
    passport.authenticate("local")(req, res, function(){
      res.redirect("blogs/new_blog");
    });
  });
});


app.listen(process.env.PORT || 5500, function(){
  console.log("The Server has started");
}); 