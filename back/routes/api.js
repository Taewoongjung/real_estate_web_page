const express = require('express');
const axios = require('axios');
const parser = require('fast-xml-parser');
const he = require('he');
require('dotenv').config();

const { isNotLoggedIn, isLoggedIn } = require("./middlewares");

const router = express.Router();

router.get("/", (req, res, next) => {
    console.log("!!!!! = ", req.user);
    return res.json(req.user || false);
});

router.get('/reinfo',  async(req, res, next) => {
    try{
        const { pnu, stdrYear } = req.query;
        console.log("(reinfo) query로 넘어오는 값들", pnu, stdrYear);
        const getItemFir = await axios.get(
            `https://api.allorigins.win/get?url=
            ${encodeURIComponent(
                `http://apis.data.go.kr/1611000/nsdi/IndvdLandPriceService/attr/getIndvdLandPriceAttr?ServiceKey=${process.env.SERVICE_KEY}&pnu=${pnu}&stdrYear=${stdrYear}&format=json&numOfRows=1&pageNo=1`
            )}`
        );
        console.log(getItemFir.data);

        const getItemSec = await axios.get(
            `https://api.allorigins.win/get?url=
            ${encodeURIComponent(
                `http://apis.data.go.kr/1611000/nsdi/IndvdLandPriceService/wfs/getIndvdLandPriceWFS?ServiceKey=${process.env.SERVICE_KEY}&typename=F166&pnu=${pnu}&maxFeatures=10&resultType=results&srsName=EPSG:5174`
            )}`
        );
        console.log("\n==============XML===============\n");
        // console.log(getItemSec.data['contents']);

        const xml = getItemSec.data['contents'];
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
        }

        // console.log("\n==============JSON===============\n");

        const jsonDataFir = JSON.parse(getItemFir.data.contents);
        const All = jsonDataFir.indvdLandPrices.field;

        // console.log('All: ', All);
        // console.log("\n===============================\n");

        const getData = await axios.get(
            `http://openapi.nsdi.go.kr/nsdi/LandCharacteristicsService/attr/getLandCharacteristics`, {
                params: {
                    format: 'json',
                    authkey:'5202a492640453cc982ec2',
                    pnu:pnu,
                    stdrYear:'2021',
                    numOfRows:'10',
                    pageNo:'1'
                },
                headers: {
                    host: "openapi.nsdi.go.kr",
                    Accept: "*/*"
                }
            })
        console.log("responsed data = ", getData.data['landCharacteristicss']['field']);
        const allTheSecondData = getData.data['landCharacteristicss']['field'];
        const sumUp = Object.assign(All, allTheSecondData);
        console.log("all the data = ", sumUp);
        return res.send(sumUp);

    } catch (error) {
        console.log(error);
    }
});

router.get('/secreinfo', async(req, res, next) => {
    try {
        const { pnu, stdrYear } = req.query;
        console.log("aaa = ", typeof(pnu));
        console.log("bbb = ", typeof(process.env.KNSD_KEY));
        console.log("(secreinfo) query로 넘어오는 값들", pnu, stdrYear);
        const getData = await axios.get(
            `http://openapi.nsdi.go.kr/nsdi/LandCharacteristicsService/attr/getLandCharacteristics`, {
                params: {
                    format: 'json',
                    authkey:'5202a492640453cc982ec2',
                    pnu:pnu,
                    stdrYear:'2021',
                    numOfRows:'10',
                    pageNo:'1'
                },
                headers: {
                    host: "openapi.nsdi.go.kr",
                    Accept: "*/*"
                }
            })
        console.log("responsed data = ", getData);
        return res.send(getData);
    } catch(error) {
        console.log(error);
    }
});

router.get('/newsinfo', async(req, res, next) => {
    try {
        const { si, dong } = req.query;
        console.log("newsinfo 라우터에 query로 넘어오는 값들", si, dong);

        const getNewsInfo = await axios.get(
            `https://openapi.naver.com/v1/search/news.json?query=${encodeURI(dong)}${encodeURI("부동산")}&display=10&start=1&sort=sim`, {
            headers: {
                'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID, 'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET
            }
        });
        // console.log("getNewsInfo = ", getNewsInfo.data);

        return res.send(getNewsInfo.data);
    } catch (error) {
        console.log(error);
    }
});

// router.get('/apartment', async(req, res, next) => {
//    try {
//        const { pnuCode } = req.query;
//        console.log("apartment 라우터에 query로 넘어오는 값들", pnuCode);
//
//         const getAptInfo = await axios.get(
//             `http://openapi.molit.go.kr:8081/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTrade?LAWD_CD=${pnuCode}&DEAL_YMD=201512&serviceKey=${process.env.SERVICE_KEY}`
//         )
//        console.log("get Apartments information = ", getAptInfo.data.response['body']['items']['item']);
//
//        return res.send(getAptInfo.data.response['body']['items']['item']);
//    } catch(error) {
//        console.log(error);
//    }
// });

router.post('/logout', isLoggedIn, (req, res, next) => {
    try {
        req.logout();
        req.session.destroy();
        res.send("logged out");
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;