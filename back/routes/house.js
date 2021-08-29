const express = require('express');
const axios = require('axios');
// const parser = require('fast-xml-parser');

const parser = require('xml2js');
const iconvlite = require("iconv-lite");
const convert = require('xml-js');
const request = require('request');
const xmlParser = require('xml2json');

require('dotenv').config();

const { Like } = require("../models");

const router = express.Router();

router.get('/', async(req, res, next) => {
    try {
        const { address, bcode } = req.query;
        console.log("(house) query로 넘어오는 값들", address, bcode);
        const getItemFir = await axios.get(
            `https://api.allorigins.win/get?url=
            ${encodeURIComponent(
                `http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTrade?LAWD_CD=${bcode}&DEAL_YMD=202107&pageNo=5&numOfRows=100&serviceKey=${process.env.SERVICE_KEY}`
            )}`
        )
            .then((response) => {
                // console.log(response.data.contents);
                const resultString = response.data.contents;
                // console.log("result = ", xmlParser.toJson(resultString));
                const innerData = xmlParser.toJson(resultString.response['items']);
                console.log(innerData);
                // ['response']['body']['items']['item']
                // return res.send(xmlParser.toJson(resultString));
            });
    } catch (error) {
        console.log(error);
    }
});
module.exports = router;