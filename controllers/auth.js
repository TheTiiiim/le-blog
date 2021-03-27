const router = require("express").Router();

const { revokeRefreshTokensForUser } = require("../utils/auth");
const { requireSession } = require("../middlewares/auth");

// "/" endpoint

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/logout", requireSession, async (req, res) => {
    res.clearCookie("jid");
    revokeRefreshTokensForUser(req.sessionPayload.userId);
    res.render("logout");
});

module.exports = router;
