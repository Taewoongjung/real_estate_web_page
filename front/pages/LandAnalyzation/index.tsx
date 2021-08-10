import React, {useCallback, useEffect, useState} from 'react';
import {Container, MapScreen, Nav, Toggle, Aside} from "@pages/LandAnalyzation/style";
import {Form, Input, Label} from "@pages/style";
import axios from "axios";
import qs from "qs";

declare global {
    interface Window {
        kakao: any;
        adrr: string;
        pnu: string;
    }
}

const LandAnalyzation = () => {

    const [navCollapse, setNavCollapse] = useState(true);
    const [data, setData] = useState('');
    const [responsedData, setResponsedData] = useState('');
    const [getPnu, setPnu] = useState('');
    const [secondInfo, setSecondInfo] = useState('');

    const navDropdownCollapse = useCallback(() => {
        setNavCollapse((prev) => !prev);
    }, []);

    useEffect(() => {
        let container = document.getElementById('map');
        let options = {
            center: new window.kakao.maps.LatLng(37.531427643208275, 127.0619991033721),
            level: 7
        };

        let map = new window.kakao.maps.Map(container, options);

        // 지도 중심 좌표 변화 이벤트를 등록한다
        window.kakao.maps.event.addListener(map, 'center_changed', function () {
            console.log('지도의 중심 좌표는 ' + map.getCenter().toString() + ' 입니다.');
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
            infowindow = new window.kakao.maps.InfoWindow({zindex: 1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

        // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
        window.kakao.maps.event.addListener(map, 'click', function (mouseEvent: any) {
            searchDetailAddrFromCoords(mouseEvent.latLng, function (result: any, status: any) {
                if (status === window.kakao.maps.services.Status.OK) {
                    var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].address.address_name + '</div>' : '';
                    detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
                    var content = '<div class="bAddr">' +
                        '<span class="title">법정동 주소정보</span>' +
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
            });
            // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
            window.kakao.maps.event.addListener(map, 'idle', function () {
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
                    var infoDiv = document.getElementById('centerAddr');
                    for (var i = 0; i < result.length; i++) {
                        // 행정동의 region_type 값은 'H' 이므로
                        if (result[i].region_type === 'H') {
                            // @ts-ignore
                            infoDiv.innerHTML = result[i].address_name;
                            break;
                        }
                    }
                }
            }
        });
    },[]);

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
                // @ts-ignore
                document.getElementById("jsonAddr").innerHTML = response.data['documents'][0]['address']['address_name'];
                // @ts-ignore
                document.getElementById("jsonX").innerHTML = response.data['documents'][0]['address']['x'];
                // @ts-ignore
                document.getElementById("jsonY").innerHTML = response.data['documents'][0]['address']['y'];
                // @ts-ignore
                const YoN = document.getElementById("jsonMountain").innerHTML = response.data['documents'][0]['address']['mountain_yn'];
                // @ts-ignore
                const main = document.getElementById("jsonMain").innerHTML = response.data['documents'][0]['address']['main_address_no'];
                // @ts-ignore
                const sub = document.getElementById("jsonSub").innerHTML = response.data['documents'][0]['address']['sub_address_no'];
                // @ts-ignore
                document.getElementById("jsonPNU").innerHTML = response.data['documents'][0]['address']['b_code'];


                /////////////////////////////////////////////////////////////////////

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

                // @ts-ignore
                document.getElementById("jsonFullPNU").innerHTML = response.data['documents'][0]['address']['b_code'];

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
                const Full = document.getElementById("jsonFullPNU").innerHTML = beforeFull;
            })
            .catch((error) => {
                console.log(error);
            });
    },[]);

    const onClick_second = useCallback((e) => {
        e.preventDefault();
        console.log("@!@!@ = ", window.pnu);
        setPnu(window.pnu);
        console.log('!', window.pnu);
        console.log(typeof (window.pnu));

        axios.get(
            'http://localhost:1000/api/',
            {
                params:{
                    pnu : window.pnu,
                    stdrYear : "2021",
                },
            })
            .then(response => {
                console.log("second Info");
                console.log(response.data);
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
    },[]);

    return (
        <div>
            <Container>
                <Nav>
                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav">
                            {/*<li id="navbar-page"><a href="/"> Home</a></li>*/}
                            <Toggle collapse={navCollapse} onClick={navDropdownCollapse} className="dropdown"><a href="#" className="dropdown-category" id="dropdownCategoryMenu" data-toggle="dropdown">
                                부동산 <span className="caret"></span></a>
                                {navCollapse && <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownCategoryMenu">
                                    <li><a href="/category/1"> 아파트</a></li>
                                    <li><a href="/category/2"> 빌라</a></li>
                                    <li><a href="/category/3"> 오피스텔</a></li>
                                    <li><a href="/category/4"> 원, 투룸</a></li>
                                </ul>}
                            </Toggle>
                            <Toggle collapse={navCollapse} onClick={navDropdownCollapse} className="dropdown">
                                <a href="#" className="dropdown-category" id="dropdownCategoryMenu" data-toggle="dropdown">임장 <span className="caret"></span></a>
                                {navCollapse && <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownCategoryMenu">
                                    <Toggle collapse={navCollapse} onClick={navDropdownCollapse} className="dropdown-submenu">
                                        <a href="#"  className="dropdown-category" id="dropdownCategoryMenu" data-toggle="dropdown"> 주변<span className="caret"></span></a>
                                        {navCollapse && <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownCategoryMenu">
                                            <li><a href="/category/231"> 산책로</a></li>
                                            <li><a href="/category/1222"> 맛집</a></li>
                                        </ul>}
                                    </Toggle>
                                    <li><a href="/category/2"> 청약 아파트</a></li>
                                </ul>}
                            </Toggle>
                            <Toggle collapse={navCollapse} onClick={navDropdownCollapse} className="dropdown"><a href="#" className="dropdown-category" id="dropdownCategoryMenu" data-toggle="dropdown">
                                땅 분석 <span className="caret"></span></a>
                                {navCollapse && <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownCategoryMenu">
                                    <li><a href="/LandAnalyzation"> 공시지가</a></li>
                                </ul>}
                            </Toggle>
                            <Toggle collapse={navCollapse} onClick={navDropdownCollapse} className="dropdown"><a href="/news" >
                                부동산 주요뉴스</a>
                            </Toggle>
                            <Toggle collapse={navCollapse} onClick={navDropdownCollapse} className="dropdown"><a href="#" className="dropdown-category" id="dropdownCategoryMenu" data-toggle="dropdown">
                                커뮤니티 <span className="caret"></span></a>
                                {navCollapse && <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownCategoryMenu">
                                    <li><a href="/category/1"> 자유게시판</a></li>
                                </ul>}
                            </Toggle>
                        </ul>
                    </div>
                </Nav>
                <MapScreen id="map" />
                <Aside>
                    <table>
                        <tr>
                            <td>시,구,동 : &nbsp;</td>
                            <td><div id="centerAddr"></div></td>
                        </tr>
                        <tr>
                            <td>주소(도로명) : &nbsp;</td>
                            <td><div id="detailAddr"></div></td>
                        </tr>
                        <tr>
                            <td>선택한 땅 확인 : &nbsp;</td>
                            <td>{data && <button onClick={onClick_first}>클릭</button>}</td>
                            <td>{responsedData && <button onClick={onClick_second}>공시지가 확인</button>}</td>
                        </tr>
                        <tr><td>&nbsp;</td></tr>
                        <tr>
                            <td>주소 : &nbsp;</td>
                            <td><div id="jsonAddr" /></td>
                        </tr>
                        <tr>
                            <td>산(N)일반(Y) : &nbsp;</td>
                            <td><div id="jsonMountain" /></td>
                        </tr>
                        <tr>
                            <td>본번 : &nbsp;</td>
                            <td><div id="jsonMain" /></td>
                        </tr>
                        <tr>
                            <td>부번 : &nbsp;</td>
                            <td><div id="jsonSub" /></td>
                        </tr>
                        <tr>
                            <td>PNU : &nbsp;</td>
                            <td><div id="jsonPNU" /></td>
                        </tr>
                        <tr>
                            <td>FullPNU : &nbsp;</td>
                            <td><div id="jsonFullPNU" /></td>
                        </tr>
                        <tr>
                            <td>좌표(x) : &nbsp;</td>
                            <td><div id="jsonX" /></td>
                        </tr>
                        <tr>
                            <td>좌표(y) : &nbsp;</td>
                            <td><div id="jsonY" /></td>
                        </tr>
                        <tr><td id="FromNowOnSecondInformation">&nbsp;</td></tr>
                        {getPnu &&
                        <tr>
                            <td>특수지구분명 : &nbsp;</td>
                            <td><div id="regstrSeCode" /></td>
                        </tr>
                        }
                        {getPnu &&
                        <tr>
                            <td>특수지구분코드 : &nbsp;</td>
                            <td>
                                <div id="regstrSeCodeNm"/>
                            </td>
                        </tr>
                        }
                        {getPnu &&
                        <tr>
                            <td>공시 일자 : &nbsp;</td>
                            <td>
                                <div id="pblntfDe"/>
                            </td>
                        </tr>
                        }
                        {getPnu &&
                        <tr>
                            <td>공시지가 : &nbsp;</td>
                            <td>
                                <div id="pblntfPclnd"/>
                            </td>
                        </tr>
                        }
                        {getPnu &&
                        <tr>
                            <td>데이터기준일자 : &nbsp;</td>
                            <td>
                                <div id="lastUpdtDt"/>
                            </td>
                        </tr>
                        }
                    </table>
                </Aside>
            </Container>
        </div>
    )
};

export default LandAnalyzation;