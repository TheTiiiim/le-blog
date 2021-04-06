const router = require("express").Router();

const { revokeRefreshTokensForUser } = require("../utils/auth");
const { requireCookie } = require("../middlewares/auth");

// "/" endpoint

router.get("/login", (req, res) => {
    res.render("login", { title: "Login" });
});

router.get("/register", (req, res) => {
    res.render("register", { title: "Register" });
});

router.get("/logout", requireCookie, async (req, res) => {
    res.clearCookie("jid");
    revokeRefreshTokensForUser(req.cookieUserData);
    delete res.locals.cookieUser;
    res.render("logout", { title: "Logout" });
});

module.exports = router;
