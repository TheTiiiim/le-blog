const router = require("express").Router();

// const { requireCookie } = require("../middlewares/auth");
const { Post, User } = require("../models");

// "/" endpoint

router.get("/post/:id", async (req, res) => {
    try {
        // get post
        const postData = await Post.findByPk(req.params.id, { include: User });
        // check post exists
        if (!postData) {
            throw Error("No post");
        }
        const post = postData.get({ plain: true });
        res.render("post", { title: post.title, post });
    } catch {
        res.render("post", { title: "Post not found" });
    }
});

router.get("/posts", async (req, res) => {
    const dbUserData = await Post.findAll();

    const posts = dbUserData.map((user) =>
        user.get({ plain: true }),
    );

    res.render("posts", { title: "Post List", posts });
});

module.exports = router;
