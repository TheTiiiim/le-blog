const router = require("express").Router();
const { User } = require("../models");

const api = require("./api");
const auth = require("./auth");

const { isSession } = require("../middlewares/auth");
router.use(isSession);

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

module.exports = router;
