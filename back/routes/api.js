const express = require('express');
const axios = require('axios');

require('dotenv').config();

const router = express.Router();

router.get('/',  async(req, res, next) => {
    try{
        const { pnu, stdrYear } = req.query;
        console.log("query로 넘어오는 값들", pnu, stdrYear);
        const getItem = await axios.get(
            `https://api.allorigins.win/get?url=
            ${encodeURIComponent(
                `http://apis.data.go.kr/1611000/nsdi/IndvdLandPriceService/attr/getIndvdLandPriceAttr?ServiceKey=${process.env.SERVICE_KEY}&pnu=${pnu}&stdrYear=${stdrYear}&format=json&numOfRows=1&pageNo=1`)}`
        );
        console.log(getItem.data.contents);
        const jsonData = JSON.parse(getItem.data.contents);
        console.log("@!!@!!!");

        const All = jsonData.indvdLandPrices.field
        console.log(All);

        return res.send(All);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;