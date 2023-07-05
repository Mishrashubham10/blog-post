const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const PORT = 3000;

const app = express();

app.set("view engine", "ejs");

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const homeStartingContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ipsa rem dolorem esse voluptas quos nihil? Cum inventore laboriosam cumque maiores sunt aspernatur. Maiores deserunt provident accusamus quaerat. Laudantium quos debitis molestias maxime, dolor nesciunt reprehenderit earum nihil quam voluptatibus minima, a non fugiat quo totam perferendis dolorem recusandae labore.";
const aboutContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ipsa rem dolorem esse voluptas quos nihil? Cum inventore laboriosam cumque maiores sunt aspernatur. Maiores deserunt provident accusamus quaerat. Laudantium quos debitis molestias maxime, dolor nesciunt reprehenderit earum nihil quam voluptatibus minima, a non fugiat quo totam perferendis dolorem recusandae labore.";
const contactContent =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit ipsa rem dolorem esse voluptas quos nihil? Cum inventore laboriosam cumque maiores sunt aspernatur. Maiores deserunt provident accusamus quaerat. Laudantium quos debitis molestias maxime, dolor nesciunt reprehenderit earum nihil quam voluptatibus minima, a non fugiat quo totam perferendis dolorem recusandae labore.";

// Globally initialised variable
let posts = [];

// Routes
app.get("/", (req, res) => {
  res.render("home", { homeContent: homeStartingContent, posts: posts });
});

// About route
app.get("/about", (req, res) => {
  res.render("about", { aboutContent: aboutContent });
});

// Contact route
app.get("/contact", (req, res) => {
  res.render("contact", { contactContent: contactContent });
});

// Compose route
app.get("/compose", (req, res) => {
  res.render("compose");
});

// Posting Compose
app.post("/compose", (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
  };

  posts.push(post);
  res.redirect("/");
});

// Seprate routes for blogs
app.get("/posts/:postName", (req, res) => {
  const data = _.lowerCase(req.params.postName);

  posts.forEach((post) => {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === data) {
      res.render("post", { title: post.title, content: post.content });
    }
  });
});

app.listen(PORT, () => console.log(`Server is up and runnig on ${PORT}...`));
