const router = require("express").Router();

const { requireCookie } = require("../middlewares/auth");
const { User } = require("../models");

// "/" endpoint

router.get("/dashboard", requireCookie, async (req, res) => {
    try {
        res.render("dashboard", { title: "Dashboard" });
    } catch {
        res.redirect("/login");
    }
});

router.get("/users", async (req, res) => {
    const dbUserData = await User.findAll();

    const users = dbUserData.map((user) =>
        user.get({ plain: true }),
    );

    res.render("users", { title: "User List", users });
});

module.exports = router;
