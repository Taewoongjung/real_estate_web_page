const express = require('express');
const axios = require('axios');
const parser = require('fast-xml-parser');
const he = require('he');
require('dotenv').config();

const router = express.Router();

router.get('/',  async(req, res, next) => {
    try{
        const { pnu, stdrYear } = req.query;
        console.log("query로 넘어오는 값들", pnu, stdrYear);
        const getItem_fir = await axios.get(
            `https://api.allorigins.win/get?url=
            ${encodeURIComponent(
                `http://apis.data.go.kr/1611000/nsdi/IndvdLandPriceService/attr/getIndvdLandPriceAttr?ServiceKey=${process.env.SERVICE_KEY}&pnu=${pnu}&stdrYear=${stdrYear}&format=json&numOfRows=1&pageNo=1`
            )}`
        );
        console.log(getItem_fir.data);

        const getItem_sec = await axios.get(
            `https://api.allorigins.win/get?url=
            ${encodeURIComponent(
                `http://apis.data.go.kr/1611000/nsdi/IndvdLandPriceService/wfs/getIndvdLandPriceWFS?ServiceKey=${process.env.SERVICE_KEY}&typename=F166&pnu=${pnu}&maxFeatures=10&resultType=results&srsName=EPSG:5174`
            )}`
        );
        console.log("\n==============XML===============\n");
        console.log(getItem_sec.data['contents']);

        const xml = getItem_sec.data['contents'];
        var options = {
            attributeNamePrefix : "@_",
            attrNodeName: "attr", //default is 'false'
            textNodeName : "#text",
            ignoreAttributes : true,
            ignoreNameSpace : false,
            allowBooleanAttributes : false,
            parseNodeValue : true,
            parseAttributeValue : false,
            trimValues: true,
            cdataTagName: "__cdata", //default is 'false'
            cdataPositionChar: "\\c",
            parseTrueNumberOnly: false,
            arrayMode: false, //"strict"
            attrValueProcessor: (val, attrName) => he.decode(val, {isAttributeValue: true}),//default is a=>a
            tagValueProcessor : (val, tagName) => he.decode(val), //default is a=>a
            stopNodes: ["parse-me-as-string"]
        };

        if( parser.validate(xml) === true) { //optional (it'll return an object in case it's not valid)
            const jsonObj = parser.parse(xml,options);

            var json = JSON.stringify(jsonObj);
            console.log("result = ", json);
        }

        console.log("\n==============JSON===============\n");

        const jsonData_fir = JSON.parse(getItem_fir.data.contents);
        const All = jsonData_fir.indvdLandPrices.field

        console.log('All: ', All);
        console.log("\n===============================\n");
        return res.send(All);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;