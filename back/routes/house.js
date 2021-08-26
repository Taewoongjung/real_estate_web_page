const express = require('express');
const axios = require('axios');
require('dotenv').config();

const { Like } = require("../models");

const router = express.Router();

router.get('/', async(req, res, next) => {
    const { address } = req.query;
    console.log("(house) query로 넘어오는 값들", address);
    const getItemFir = await axios.get(
        `https://api.allorigins.win/get?url=
            ${encodeURIComponent(
            `http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTrade?LAWD_CD=11110&DEAL_YMD=201512&serviceKey=${process.env.SERVICE_KEY}`
        )}`
    );
});
module.exports = router;