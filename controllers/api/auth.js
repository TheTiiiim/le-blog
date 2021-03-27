const router = require("express").Router();
const { compare } = require("bcryptjs");
const { verify } = require("jsonwebtoken");
require("dotenv").config();

const { User } = require("../../models");
const { createAccessToken, createRefreshToken, sendRefreshToken, revokeRefreshTokensForUser } = require("../../utils/auth");

// "/" endpoint

router.post("/register", async (req, res) => {
    try {
        await User.create({
            "name": req.body.name,
            "email": req.body.email,
            "password": req.body.password,
        });

        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false });
    }
});

router.post("/login", async (req, res) => {
    try {
        // check email
        const user = await User.findOne({ where: { email: req.body.email }});

        if (!user) throw Error("no user");
		
        // check password
        const valid = await compare(req.body.password, user.password);

        if (!valid) throw Error("bad password");

        // login success

        // set refresh token
        sendRefreshToken(res, await createRefreshToken(user));

        // set accesss token
        res.status(200).json({ accessToken: createAccessToken(user) });
    } catch (err) {
        // login fail
        console.log(err);
        res.sendStatus(403);
    }
});

router.post("/logout", async (req, res) => {
    res.clearCookie("jid");
    revokeRefreshTokensForUser(req.authPayload.userId);
    res.sendStatus(200);
});

router.post("/refresh_token", async (req, res) => {
    // get token
    const token = req.cookies.jid;

    // fail without token
    if (!token) {
        return res.status(403).send({ ok: false, accessToken: "" });
    }

    let payload = null;
    try {
        // get payload
        payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
        // fail without payload
        return res.status(403).send({ ok: false, accessToken: "" });
    }

    // get user
    const user = await User.findByPk(payload.userId);

    // fail without user
    if (!user) return res.status(403).send({ ok: false, accessToken: "" });

    // fail if tokenVersions dont match
    if (user.tokenVersion !== payload.tokenVersion) {
        return res.status(403).send({ ok: false, accessToken: "" });
    }

    // session is valid

    // set refresh token
    sendRefreshToken(res, await createRefreshToken(user));

    // set accesss token
    return res.send({ ok: true, accessToken: createAccessToken(user) });
});

module.exports = router;
