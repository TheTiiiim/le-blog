const router = require("express").Router();

// routes
router.get("/", (req, res) => {
    res.send("hello world");
});

module.exports = router;
