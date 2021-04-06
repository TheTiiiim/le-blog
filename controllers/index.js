const router = require("express").Router();

const api = require("./api");
const auth = require("./auth");
const user = require("./user");
const post = require("./post");

const { isCookie } = require("../middlewares/auth");
router.use(isCookie);

// routes
router.get("/", async (req, res) => {
    res.render("home", { title: "Home" });
});

router.use("/api", api);
router.use("/", auth);
router.use("/", user);
router.use("/", post);

module.exports = router;
