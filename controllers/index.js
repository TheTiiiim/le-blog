const router = require("express").Router();
const { User } = require("../models");

const api = require("./api");
const user = require("./user");
const auth = require("./auth");

const { isCookie } = require("../middlewares/auth");
router.use(isCookie);

// routes
router.get("/", async (req, res) => {
    const dbUserData = await User.findAll();

    const users = dbUserData.map((user) =>
        user.get({ plain: true }),
    );

    res.render("home", { users });
});

router.use("/api", api);
router.use("/", auth);
router.use("/", user);

module.exports = router;
