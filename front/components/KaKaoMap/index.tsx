import React, {FC, useCallback, useEffect, useRef, useState} from 'react';
import {Aside, BottomBox, CancelBtn, CenterAxis, MapScreen, MapTypeBtn} from "./style";
import axios from "axios";

declare global {
    interface Window {
        kakao: any;
        adrr: string;
        pnu: string;
        si: string;
        dong: string;
    }
}

const KaKaoMap: FC = () => {
    const [getTrracficMap, setTrraficMap] = useState(false);
    const [getRoadMap, setRoadMap] = useState(false);
    const [getTerrainMap, setTerrainMap] = useState(false);
    const [getDistrictMap, setDistrictMap] = useState(false);
    const [zIndex, setzIndex] = useState(0);
    const [getSecondData, setSecondData] = useState('');

    const [getData, setData] = useState('');
    const [responsedData, setResponsedData] = useState('');
    const [getPnu, setPnu] = useState('');

    const aMap = useRef(null);

    const onClickTrafficMap = useCallback((e) => { // 교통정보 지도타입
        e.preventDefault();
        setTrraficMap(prev => !prev);
        console.log("getTrracficMap = ", getTrracficMap);
    },[getTrracficMap]);

    const onClickRoadMap = useCallback((e) => { // 로드뷰 도로정보 지도타입
        e.preventDefault();
        setRoadMap(prev => !prev);
        console.log("getRoadMap = ", getRoadMap);
    },[getRoadMap]);

    const onClickTerrainMap = useCallback((e) => {
        e.preventDefault();
        setTerrainMap(prev => !prev);
        console.log("getTerrainMap = ", getTerrainMap);
    },[getTerrainMap]);

    const onCLickDistrictMap = useCallback((e) => {
        e.preventDefault();
        setDistrictMap(prev => !prev);
        console.log("getDistrictMap = ", getDistrictMap);
    },[getDistrictMap]);

    useEffect(()=> {
            let options = {
                center: new window.kakao.maps.LatLng(37.531427643208275, 127.0619991033721),
                level: 7
            };
            let map = new window.kakao.maps.Map(aMap.current, options);
            // // 지도에 추가된 지도타입정보를 가지고 있을 변수입니다
            var currentTypeId: any;
            var changeMaptype;

            console.log("getRoadMap 데이터 = ", getTrracficMap);

            if (getTrracficMap) {  // 교통정보 지도타입
                changeMaptype = window.kakao.maps.MapTypeId.TRAFFIC;
                map.addOverlayMapTypeId(changeMaptype);
            }
            else if (getRoadMap) { // 로드뷰 도로정보 지도타입
                changeMaptype = window.kakao.maps.MapTypeId.ROADVIEW;
                map.addOverlayMapTypeId(changeMaptype);
            }
            else if (getTerrainMap) { // 지형정보 지도타입
                changeMaptype = window.kakao.maps.MapTypeId.TERRAIN;
                map.addOverlayMapTypeId(changeMaptype);
            }
            else if (getDistrictMap) { // 지적편집도 지도타입
                changeMaptype = window.kakao.maps.MapTypeId.USE_DISTRICT;
                map.addOverlayMapTypeId(changeMaptype);
            }

            // 지도 중심 좌표 변화 이벤트를 등록한다
            window.kakao.maps.event.addListener(map, 'center_changed', function () {
                console.log('지도의 중심 좌표는 ' + map.getCenter().toString() +' 입니다.');
            });

            // 지도 시점 변화 완료 이벤트를 등록한다
            window.kakao.maps.event.addListener(map, 'idle', function () {
                var message = '지도의 중심좌표는 ' + map.getCenter().toString() + ' 이고,' +
                    '확대 레벨은 ' + map.getLevel() + ' 레벨 입니다.';
                console.log(message);
            });

            // 지도 클릭 이벤트를 등록한다 (좌클릭 : click, 우클릭 : rightclick, 더블클릭 : dblclick)
            window.kakao.maps.event.addListener(map, 'click', function (mouseEvent: any) {
                console.log('지도에서 클릭한 위치의 좌표는 ' + mouseEvent.latLng.toString() + ' 입니다.');
            });

            // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
            var mapTypeControl = new window.kakao.maps.MapTypeControl();

            // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
            // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
            map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

            // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
            var zoomControl = new window.kakao.maps.ZoomControl();
            map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

            var geocoder = new window.kakao.maps.services.Geocoder(); // 주소-좌표 변환 객체를 생성합니다
            var marker = new window.kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
                infowindow = new window.kakao.maps.InfoWindow({zindex:1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

            // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
            searchAddrFromCoords(map.getCenter(), displayCenterInfo);
            // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
            window.kakao.maps.event.addListener(map, 'click', function(mouseEvent: any) {
                searchDetailAddrFromCoords(mouseEvent.latLng, function (result: any, status: any) {
                    if (status === window.kakao.maps.services.Status.OK) {
                        console.log("@@");
                        var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
                        console.log("!! = ", detailAddr);
                        detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
                        var content = '<div id="bAddr" style="color: green; width: 300%; height:300%;" >' +
                            detailAddr +
                            '</div>';

                        // 마커를 클릭한 위치에 표시합니다
                        marker.setPosition(mouseEvent.latLng);
                        marker.setMap(map);
                        // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
                        infowindow.setContent(content);
                        infowindow.open(map, marker);
                    }
                    var infoAddr = document.getElementById('detailAddr');
                    // @ts-ignore
                    infoAddr.innerHTML = result[0].address.address_name;
                    window.adrr = result[0].address.address_name;
                    setData(window.adrr);
                })
            })

            window.kakao.maps.event.addListener(map, 'click', function(mouseEvent: any) {
                console.log('Map clicked');
                setzIndex(3);
            });

            // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
            window.kakao.maps.event.addListener(map, 'idle', function() {
                searchAddrFromCoords(map.getCenter(), displayCenterInfo);
            });
            function searchAddrFromCoords(coords: any, callback: any) {
                // 좌표로 행정동 주소 정보를 요청합니다
                geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
            }
            function searchDetailAddrFromCoords(coords: any, callback: any) {
                // 좌표로 법정동 상세 주소 정보를 요청합니다
                geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
            }
            // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
            function displayCenterInfo(result: any, status: any) {
                if (status === window.kakao.maps.services.Status.OK) {
                    const infoDiv = document.getElementById('centerAddr');
                    // console.log("@@!! = ", infoDiv);
                    for(var i = 0; i < result.length; i++) {
                        // 행정동의 region_type 값은 'H' 이므로
                        if (result[i].region_type === 'H') {
                            // @ts-ignore
                            infoDiv.innerHTML = result[i].address_name;
                            break;
                        }
                    }
                }
            }
    },[getTrracficMap, getRoadMap, getTerrainMap, getDistrictMap]);

    const onClickCancelBtn = () => {
        setzIndex(0);
    }
    const onClick_first = useCallback((e) => {
        e.preventDefault();
        axios.get(
            `http://dapi.kakao.com/v2/local/search/address.json?query=${window.adrr}&analyze_type=similar&page=10&size=1`,
            {
                headers: {Authorization: 'KakaoAK 50be921832a2d06f65d24b6e54ba16e5'},
            })
            .then(response => {
                setResponsedData(response.data);
                console.log("first Info");
                console.log(response.data);

                window.si = response.data['documents'][0]['address']['region_1depth_name'];
                window.dong = response.data['documents'][0]['address']['region_2depth_name'];

                console.log("@!!! = ", window.si, window.dong);

                // @ts-ignore
                document.getElementById("jsonAddr").innerHTML = response.data['documents'][0]['address']['address_name'];
                // @ts-ignore
                document.getElementById("jsonX").innerHTML = response.data['documents'][0]['address']['x'];
                // @ts-ignore
                document.getElementById("jsonY").innerHTML = response.data['documents'][0]['address']['y'];
                // @ts-ignore
                const main = document.getElementById("jsonMain").innerHTML = response.data['documents'][0]['address']['main_address_no'];
                // @ts-ignore
                const sub = document.getElementById("jsonSub").innerHTML = response.data['documents'][0]['address']['sub_address_no'];

                /////////////////////////////////////////////////////////////////////

                const YoN = response.data['documents'][0]['address']['mountain_yn'];
                const digits_main = main.toString().split('');
                const arr_main = new Array(4);
                arr_main.fill(0);
                //digits: ['1', '2', '3']
                //digits.length=3   i:2->1->0, j:3->2->1
                //arr=[0,0,0,0] arr[3]=3  arr[2]=2  arr[1]=1
                for (let j=3, i=digits_main.length-1; i>=0; i--, j--) {
                    arr_main[j] = Number(digits_main[i]);
                }
                const arrStr_main = arr_main.join('');

                /////////////////////////////////////////////////////////////////////

                const digits_sub = sub.toString().split('');
                const arr_sub = new Array(4);
                arr_sub.fill(0);
                for (let j=3, i=digits_sub.length-1; i>=0; i--, j--) {
                    arr_sub[j] = Number(digits_sub[i]);
                }
                const arrStr_sub = arr_sub.join('');

                /////////////////////////////////////////////////////////////////////

                let beforeFull = response.data['documents'][0]['address']['b_code'];

                if(YoN === 'N') {
                    beforeFull += (1 + arrStr_main + arrStr_sub);
                    window.pnu = beforeFull;
                } else {
                    beforeFull += (2 + arrStr_main + arrStr_sub);
                    window.pnu = beforeFull;
                }
                /////////////////////////////////////////////////////////////////////

                // @ts-ignore
                document.getElementById("jsonFullPNU").innerHTML = beforeFull;
            })
            .catch((error) => {
                console.log(error);
            });
    },[]);

    const onClick_second = useCallback(async(e) => {
        e.preventDefault();
        console.log("got PNU = ", window.pnu);
        setPnu(window.pnu);
        console.log('!', window.pnu);
        console.log(typeof (window.pnu));

        const axiosRequest = await axios.get(
            'http://localhost:1010/api/reinfo',
            {
                params:{
                    pnu : window.pnu,
                    stdrYear : "2021",
                },
            })
            .then(response => {
                console.log("second Info");
                console.log(response.data);
                setSecondData(response.data);
                console.log(response['data'][0].stdrMt);
                // @ts-ignore
                document.getElementById("regstrSeCode").innerHTML = response['data'][0].regstrSeCode;
                // @ts-ignore
                document.getElementById("regstrSeCodeNm").innerHTML = response['data'][0].regstrSeCodeNm;
                // @ts-ignore
                document.getElementById("pblntfDe").innerHTML = response['data'][0].pblntfDe;
                // @ts-ignore
                document.getElementById("pblntfPclnd").innerHTML = response['data'][0].pblntfPclnd;
                // @ts-ignore
                document.getElementById("lastUpdtDt").innerHTML = response['data'][0].lastUpdtDt;
            })
            .catch((error) => {
                console.log(error);
            });

        const requestNews = await axios.get(
            'http://localhost:1010/api/newsinfo',
            {
                params: {
                    si: window.si,
                    dong: window.dong,
                }
            })
            .then((response)=>{
                console.log(response.data);
                const data = response.data.items[0];
                console.log("responsed data = ", data);

                // first

                // @ts-ignore
                document.getElementById("title_fir").innerHTML = response.data.items[0]['title'];
                // @ts-ignore
                document.getElementById("image_fir").href = response.data.items[0]['link'];
                // @ts-ignore
                document.getElementById("content_fir").innerHTML = response.data.items[0]['description'];

                // second

                // @ts-ignore
                document.getElementById("title_sec").innerHTML = response.data.items[1]['title'];
                // @ts-ignore
                document.getElementById("image_sec").href = response.data.items[1]['link'];
                // @ts-ignore
                document.getElementById("content_sec").innerHTML = response.data.items[1]['description'];

                // third

                // @ts-ignore
                document.getElementById("title_trd").innerHTML = response.data.items[2]['title'];
                // @ts-ignore
                document.getElementById("image_trd").href = response.data.items[2]['link'];
                // @ts-ignore
                document.getElementById("content_trd").innerHTML = response.data.items[2]['description'];

                // fourth

                // @ts-ignore
                document.getElementById("title_frh").innerHTML = response.data.items[3]['title'];
                // @ts-ignore
                document.getElementById("image_frh").href = response.data.items[3]['link'];
                // @ts-ignore
                document.getElementById("content_frh").innerHTML = response.data.items[3]['description'];

            })
            .catch((error) => {
                console.log(error);
            });

    },[]);

    return (
        <>
            <MapTypeBtn className="btn btn-default" onClick={onClickTrafficMap}>교통정보</MapTypeBtn>
            <MapTypeBtn className="btn btn-default" onClick={onClickRoadMap}>도로정보</MapTypeBtn>
            <MapTypeBtn className="btn btn-default" onClick={onClickTerrainMap}>지형정보</MapTypeBtn>
            <MapTypeBtn className="btn btn-default" onClick={onCLickDistrictMap}>지적편집도</MapTypeBtn>
            <MapScreen id="map" ref={aMap} />
            <div>
                <Aside zIndex={zIndex}>
                    <CancelBtn className="btn btn-default" onClick={onClickCancelBtn}>
                        <div className="glyphicon glyphicon-remove" />
                    </CancelBtn>
                    <button type="button" className="btn btn-default">
                        <span className="glyphicon glyphicon-star" aria-hidden="true"></span> Star
                    </button>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <td colSpan={2} align="center">중심 화면</td>
                        </tr>
                        <tr>
                            <td colSpan={2} align="center"><CenterAxis id="centerAddr" /></td>
                        </tr>
                        <tr>
                            <td>주소(도로명):</td>
                            <td><div id="detailAddr"></div></td>
                        </tr>
                        <tr>
                            {/*<td colSpan={2} align="center">{getData && <button type="button" className="btn btn-primary" onClick={onClick_first}>선택한 땅 확인</button>}</td>*/}
                            <td colSpan={2} align="center"><button type="button" className="btn btn-primary" onClick={onClick_first}>선택한 땅 확인</button></td>
                        </tr>
                        <tr><td colSpan={2}>&nbsp;</td></tr>
                        <tr>
                            <td>주소:</td>
                            <td><div id="jsonAddr" /></td>
                        </tr>
                        <tr>
                            <td>본번:</td>
                            <td><div id="jsonMain" /></td>
                        </tr>
                        <tr>
                            <td>부번:</td>
                            <td><div id="jsonSub" /></td>
                        </tr>
                        <tr>
                            <td>고유필지번호:</td>
                            <td><div id="jsonFullPNU" /></td>
                        </tr>
                        <tr>
                            <td>좌표(x):</td>
                            <td><div id="jsonX" /></td>
                        </tr>
                        <tr>
                            <td>좌표(y):</td>
                            <td><div id="jsonY" /></td>
                        </tr>

                        <tr>
                            <td colSpan={2} align="center">
                                {responsedData && <button type="button" className="btn btn-success" onClick={onClick_second}>공시지가 확인</button>}
                            </td>
                        </tr>
                        <tr>
                            <td>특수지구분명:</td>
                            <td>
                                <div id="regstrSeCodeNm"/>
                            </td>
                        </tr>
                        <tr>
                            <td>특수지구코드:</td>
                            <td><div id="regstrSeCode" /></td>
                        </tr>
                        <tr>
                            <td>공시 일자:</td>
                            <td>
                                <div id="pblntfDe"/>
                            </td>
                        </tr>
                        <tr>
                            <td>공시지가:</td>
                            <td>
                                <div id="pblntfPclnd"/>
                            </td>
                        </tr>
                        <tr>
                            <td>데이터기준일자:</td>
                            <td>
                                <div id="lastUpdtDt"/>
                            </td>
                        </tr>
                        </thead>
                    </table>
                </Aside>
                {getSecondData && <BottomBox zIndex={zIndex}>
                    <div className="row">
                        <div className="col-xs-6 col-md-3">
                            <a id="image_fir" href="#" className="thumbnail">
                                <div className="caption">
                                    <h3 id="title_fir"></h3>
                                    <p id="content_fir"></p>
                                </div>
                            </a>
                        </div>
                        <div className="col-xs-6 col-md-3">
                            <a id="image_sec" href="#" className="thumbnail">
                                <div className="caption">
                                    <h3 id="title_sec"></h3>
                                    <p id="content_sec"></p>
                                </div>
                            </a>
                        </div>
                        <div className="col-xs-6 col-md-3">
                            <a id="image_trd" href="#" className="thumbnail">
                                <div className="caption">
                                    <h3 id="title_trd"></h3>
                                    <p id="content_trd"></p>
                                </div>
                            </a>
                        </div>
                        <div className="col-xs-6 col-md-3">
                            <a id="image_frh" href="#" className="thumbnail">
                                <div className="caption">
                                    <h3 id="title_frh"></h3>
                                    <p id="content_frh"></p>
                                </div>
                            </a>
                        </div>
                    </div>
                </BottomBox> }
            </div>
        </>
    );
}

export default KaKaoMap;