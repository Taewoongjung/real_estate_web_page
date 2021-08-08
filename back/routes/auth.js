const express = require("express");
const bcrypt = require("bcrypt");
const sanitize = require('sanitize-html');
const passport = require('passport');

const { isNotLoggedIn, isLoggedIn } = require("./middlewares");
const User = require("../models/user");

const router = express.Router();

router.get("/", (req, res, next) => {
    return res.json(req.user || false);
}); // SWR 요청은 GET으로 오기 때문에 이 라우터 필요

router.post("/signup", isNotLoggedIn, async (req, res, next) => {
    console.log("auth/signup 진입");

    try {
        const exUser = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (exUser) {
            return res.status(403).send("이미 사용 중인 아이디입니다.");
        }
        sanitize(req.body.password);
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const user = await User.create({
            email: req.body.email,
            name: req.body.name,
            nick: req.body.nick,
            password: hashedPassword,
        });
        console.log(" 회원가입 완료 = ", user);
        res.status(201).send("ok");
    } catch (error) {
        console.error(error);
        next(error); // status 500
    }
});


router.post('/login', isNotLoggedIn, (req, res, next) => {
    console.log("auth/login 진입");

    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (info) {
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.status(200).json(
                await User.findOne({
                    where: { id: user.id },
                    attributes: ["id", "nick", "email"],
                })
            );
        });
    })(req, res, next);
});

module.exports = router;