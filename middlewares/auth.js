const { verify } = require("jsonwebtoken");
const { User } = require("../models");

const isAuth = async (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return next();
    }

    try {
        // get token
        const token = authorization.split(" ")[1];
        // get payload
        const payload = verify(token, process.env.ACCESS_TOKEN_SECRET);
        // get user
        const userData = await User.findsByPk(payload.userId);
        // ensure user exists
        if (!userData) {
            throw Error("no user");
        }
        // attatch user to request
        req.authUserData = userData;
        return next();
    } catch (err) {
        return next();
    }
};

const requireAuth = (req, res, next) => {
    if (req.authUserData) {
        return next();
    } else {
        res.sendStatus(403);
    }
};

const isCookie = async (req, res, next) => {
    // get token
    const token = req.cookies.jid;

    if (!token) {
        return next();
    }

    let payload = null;
    try {
        // get payload
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
        // get user
        const userData = await User.findByPk(payload.userId);
        // ensure user exists
        if (!userData) {
            throw Error("no user");
        }
        // attatch user to request
        req.cookieUserData = userData;
        // pass user object to template engine
        res.locals.cookieUser = userData.get({ plain: true });
        return next();
    } catch (err) {
        console.log(err);
        return next();
    }
};

const requireCookie = (req, res, next) => {
    if (req.cookieUserData) {
        return next();
    } else {
        res.redirect("/login");
    }
};

module.exports = { isAuth, requireAuth, requireCookie, isCookie };