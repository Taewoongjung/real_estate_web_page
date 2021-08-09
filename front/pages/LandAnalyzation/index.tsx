import React, {useCallback, useEffect, useState} from 'react';
import {Container, MapScreen, Nav, Toggle, Aside} from "@pages/LandAnalyzation/style";
import {Form, Input, Label} from "@pages/style";
import axios from "axios";

declare global {
    interface Window {
        kakao: any;
    }
}

const LandAnalyzation = () => {

    const [navCollapse, setNavCollapse] = useState(true);
    const [data, setData] = useState(null);

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
                let aaa = result[0].address.address_name;
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
    });

    const onClick = useCallback((e) => {
        e.preventDefault();
        axios.get(
            `http://dapi.kakao.com/v2/local/search/address.json?query=${aaa}&analyze_type=similar&page=10&size=1`,
            {
                headers: {Authorization: 'KakaoAK 50be921832a2d06f65d24b6e54ba16e5'},
            })
            .then(response => {
                setData(response.data);
                console.log(response.data);
                // @ts-ignore
                return document.getElementById("jsonText").innerHTML = response.data['documents'][0]['address']['address_name'];
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
                            <td>공시지가 : &nbsp;</td>
                            <td><button onClick={onClick}>불러오기</button></td>
                            {/*{data && JSON.parse(data).address_name}*/}
                            <td><div id="jsonText"></div></td>
                        </tr>
                    </table>
                </Aside>
            </Container>
        </div>
    )
};

export default LandAnalyzation;