const router = require("express").Router();

const { requireCookie } = require("../middlewares/auth");

// "/" endpoint

router.use(requireCookie);

router.get("/dashboard", async (req, res) => {
    try {
        res.render("dashboard");
    } catch {
        res.redirect("/login");
    }
});

module.exports = router;
