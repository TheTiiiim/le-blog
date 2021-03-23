const router = require("express").Router();

// routes
router.get("/", (req, res) => {
    res.render("homepage");
});

module.exports = router;
