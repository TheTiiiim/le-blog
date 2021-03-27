const router = require("express").Router();

const { requireSession } = require("../middlewares/auth");
const { User } = require("../models");

// "/" endpoint

router.use(requireSession);

router.get("/dashboard", async (req, res) => {
    try {
        const userData = await User.findByPk(req.sessionPayload.userId);
        if (!userData) {
            throw Error("no user");
        }
        const user = userData.get({ plain: true });
        delete user.password;
        res.render("dashboard", { user });
    } catch {
        res.redirect("/login");
    }
});

module.exports = router;
