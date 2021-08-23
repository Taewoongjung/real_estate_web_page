const express = require('express');
const axios = require('axios');
require('dotenv').config();

const { Like } = require("../models");

const router = express.Router();

router.get('/find', async(req, res, next) => {
    try {
        console.log("/favorite/find 진입");
        const { userId } = req.query;
        console.log("req query = ", req.query);

        const [FindLikes] = await Promise.all([
            Like.findAll({
                where: { UserId: userId}
            })
        ]);
        console.log("/favorite result1 = ", FindLikes);

        return res.send(FindLikes);
    } catch (error) {
        console.log(error);
    }
});

router.post('/it', async(req, res, next) => {
    try {
        console.log("/favorite/it 진입");
        const { isItLand, chungYak, addr, landName, landArea, landPrice, landType, landSpecial, user } = req.body;
        console.log("req body = ", req.body);

        const like = await Like.create({
            land: isItLand,
            chungYak: chungYak,
            address: addr,
            landName: landName,
            landArea: landArea,
            landPrice: landPrice,
            landType: landType,
            landSpecial: landSpecial,
            UserId: user,
        });
    }  catch (error) {
        console.log(error);
    }
});

module.exports = router;