const router = require("express").Router();

const userRoutes = require("./user");
const authRoutes = require("./auth");

const { isAuth } = require("../../middlewares/auth");
router.use(isAuth);

router.use("/user", userRoutes);
router.use("/", authRoutes);

module.exports = router;
