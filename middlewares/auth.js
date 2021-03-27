const { verify } = require("jsonwebtoken");

const isAuth = (req, res, next) => {
    const authorization = req.headers["authorization"];

    if (!authorization) {
        return next();
    }

    try {
        const token = authorization.split(" ")[1];
        const payload = verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.authPayload = payload;
        return next();
    } catch (err) {
        return next();
    }
};

const requireAuth = (req, res, next) => {
    if (req.authPayload) {
        return next();
    } else {
        res.sendStatus(403);
    }
};

module.exports = { isAuth, requireAuth };