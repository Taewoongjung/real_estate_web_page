const express = require('express');
const axios = require('axios');
require('dotenv').config();

const { Like } = require("../models");

const router = express.Router();

router.post('/', async(req, res, next) => {
    try {
        console.log("/favorite 진입");
        const { addr, landName, landArea, landPrice, landType, landSpecial } = req.body;
        console.log("req body = ", req.body);

        const like = await Like.create({
            // land: ,
            // chungYak:,
        });
    }  catch (error) {
        console.log(error);
    }
});

module.exports = router;