const router = require("express").Router();

// const { requireCookie } = require("../middlewares/auth");
const { Post } = require("../models");

// "/" endpoint

router.get("/posts", async (req, res) => {
    const dbUserData = await Post.findAll();

    const posts = dbUserData.map((user) =>
        user.get({ plain: true }),
    );

    res.render("posts", { title: "Post List", posts });
});

module.exports = router;
