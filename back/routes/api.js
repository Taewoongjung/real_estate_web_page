const express = require('express');
const axios = require('axios');

require('dotenv').config();

const router = express.Router();

router.get('/',  async(req, res, next) => {
    try{
        const getItem = await axios.get(

            `http://apis.data.go.kr/1611000/nsdi/IndvdLandPriceService/attr/getIndvdLandPriceAttr?ServiceKey=${process.env.SERVICE_KEY}&pnu=1165010100109760014&stdrYear=2021&format=json`,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                }
            });
        console.log(getItem);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;