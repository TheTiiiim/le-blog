const router = require("express").Router();
// const { User } = require("../../models");
const { requireAuth } = require("../../middlewares/auth");

// "/user" endpoint

router.get("/", requireAuth, async (req, res) => {
    try {
        const user = req.authUserData.get({ plain: true });
        delete user.password;
        res.status(200).json({ ...user });
    } catch (err) {
        res.sendStatus(500);
    }
});

module.exports = router;
