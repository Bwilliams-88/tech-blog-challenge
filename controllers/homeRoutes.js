const router = require("express").Router();
const { User, Posts } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const postData = await Posts.findAll({});

    const posts = postData.map((project) => project.get({ plain: true }));
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login");
});

router.get("/dashboard", (req, res) => {
  try {
    res.render("dashboard", {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/dashboard", (req, res) => {
  Posts.create({
    title: req.body.title,
    content: req.body.content,
  })
    .then((newPost) => {
      res.json(newPost);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
