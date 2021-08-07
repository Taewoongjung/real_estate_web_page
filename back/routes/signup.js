const express = require("express");
const bcrypt = require("bcrypt");

const { isNotLoggedIn, isLoggedIn } = require("./middlewares");
const User = require("../models/user");

const router = express.Router();

router.get("/signingup", (req, res, next) => {
    return res.json(req.user || false);
}); // SWR 요청은 GET으로 오기 때문에 이 라우터 추가 필요

router.post("/signingup", isNotLoggedIn, async (req, res, next) => {
    try {
        console.log("뭐가 넘어오나 = ", req.body);
        const exUser = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (exUser) {
            return res.status(403).send("이미 사용 중인 아이디입니다.");
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        console.log("뭐가 넘어오나 = ", req.body);
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
        console.error("무슨 에러? = ", error);
        next(error); // status 500
    }
});

module.exports = router;