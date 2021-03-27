const { verify } = require("jsonwebtoken");

const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;

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

const isSession = (req, res, next) => {
    // get token
    const token = req.cookies.jid;

    if (!token) {
        return next();
    }

    let payload = null;
    try {
        // get payload
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
        req.sessionPayload = payload;
        return next();
    } catch (err) {
        return next();
    }
};

const requireSession = (req, res, next) => {
    if (req.sessionPayload) {
        return next();
    } else {
        res.redirect("/login");
    }
};

module.exports = { isAuth, requireAuth, requireSession, isSession };