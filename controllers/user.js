const router = require("express").Router();

const { requireCookie } = require("../middlewares/auth");
const { User } = require("../models");

// "/" endpoint

router.get("/dashboard", requireCookie, async (req, res) => {
    try {
        res.redirect(`/user/${req.cookieUserData.id}`);
    } catch {
        res.redirect("/login");
    }
});

router.get("/user/:id", async (req, res) => {
    try {
        let userData;
        // if viewing user in cookie
        if (req.cookieUserData.id === parseInt(req.params.id)) {
            // set userData to match
            userData = req.cookieUserData;
            // set dashboard flag
            res.locals.dashboard = true;
        } else {
            // get user
            userData = await User.findByPk(req.params.id);
            // ensure user exists
            if (!userData) {
                throw Error("no user");
            }
        }
        // get object usable by template engine
        const user = userData.get({ plain: true });
        res.render("user", { title: `${user.name}'s page`, user });
    } catch {
        res.render("user", { title: "User not found" });
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
