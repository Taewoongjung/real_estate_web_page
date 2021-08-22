const express = require('express');
const axios = require('axios');
require('dotenv').config();

const { Like } = require("../models");

const router = express.Router();

router.post('/it', async(req, res, next) => {
    try {
        console.log("/favorite 진입");
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