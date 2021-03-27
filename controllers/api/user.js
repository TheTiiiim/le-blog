const router = require("express").Router();
const { User } = require("../../models");
const { requireAuth } = require("../../middlewares/auth");

// "/user" endpoint

router.get("/", requireAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.authPayload.userId);
        if (!userData) {
            throw Error("no user");
        }
        const user = userData.get({ plain: true });
        delete user.password;
        res.status(200).json({ ...user });
    } catch (err) {
        res.sendStatus(500);
    }
});

module.exports = router;
