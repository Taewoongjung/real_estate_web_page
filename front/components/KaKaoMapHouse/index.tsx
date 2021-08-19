import React, {useCallback, useEffect, useRef, useState} from 'react';
import {MapScreen, MapTypeBtn, Select} from "@components/KaKaoMapHouse/style";
import axios from "axios";
import useInput from "@hooks/useInput";

const KaKaoMapHouse = () => {
    const [getTrracficMap, setTrraficMap] = useState(false);
    const [getRoadMap, setRoadMap] = useState(false);
    const [getTerrainMap, setTerrainMap] = useState(false);
    const [getDistrictMap, setDistrictMap] = useState(false);
    const [newInput, onChangeNewInput, setNewInput] = useInput('');
    const [getCode, setCode] = useState('');

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

        const arrayForApt = new Array();

        // const requestByaxios = axios.get('http://localhost:1010/api/apartment')
        //     .then((response) => {
        //         console.log("requestByaxios = ", response.data);
        //
        //         for (let i = 1; i < 10; i++) {
        //             arrayForApt[i] = response.data[i]['아파트'];
        //         }
        //         console.log("aaaaaAAAA = ", arrayForApt);
        //
        //         // arr
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     })

        // 주소로 좌표를 검색합니다
        geocoder.addressSearch('죽현로 12', function(result: any, status: any) {

            // 정상적으로 검색이 완료됐으면
            if (status === window.kakao.maps.services.Status.OK) {

                var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

                // 결과값으로 받은 위치를 마커로 표시합니다
                var marker = new window.kakao.maps.Marker({
                    map: map,
                    position: coords
                });

                // 인포윈도우로 장소에 대한 설명을 표시합니다
                var infowindow = new window.kakao.maps.InfoWindow({
                    content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
                });
                infowindow.open(map, marker);

                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
            }
        });

        // 주소로 좌표를 검색합니다
        for (let i = 0; i < 10; i++) {
            console.log("count = ", i);
            geocoder.addressSearch(`${arrayForApt[i]}`, function(result: any, status: any) {

                // 정상적으로 검색이 완료됐으면
                if (status === window.kakao.maps.services.Status.OK) {

                    var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

                    console.log("!!!!!!! = ", coords);

                    // 결과값으로 받은 위치를 마커로 표시합니다
                    var marker = new window.kakao.maps.Marker({
                        map: map,
                        position: coords
                    });

                    // 인포윈도우로 장소에 대한 설명을 표시합니다
                    var infowindow = new window.kakao.maps.InfoWindow({
                        content: '<div style="width:150px;text-align:center;padding:6px 0;">우리회사</div>'
                    });
                    infowindow.open(map, marker);

                    // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                    map.setCenter(coords);
                }
            });
        }
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
                for(var i = 0; i < result.length; i++) {
                    // 행정동의 region_type 값은 'H' 이므로
                    if (result[i].region_type === 'H') {
                        // @ts-ignore
                        infoDiv.innerHTML = result[i].address_name;
                        const strPnu = result[i].code;
                        setCode(strPnu.substr(0,5));
                        console.log("getCode = ", getCode);
                        break;
                    }
                }
            }
        }

        const requestByaxios = axios.get('http://localhost:1010/api/apartment',
            {
            params: {
                pnuCode: getCode
            }
        })
            .then((response) => {
                console.log("requestByaxios = ", response.data);

                for (let i = 1; i < 10; i++) {
                    arrayForApt[i] = response.data[i]['아파트'];
                }
                console.log("aaaaaAAAA = ", arrayForApt);

                // arr
            })
            .catch((error) => {
                console.log(error);
            })

    },[getTrracficMap, getRoadMap, getTerrainMap, getDistrictMap, getCode]);

    return (
        <>
            <MapTypeBtn className="btn btn-default" onClick={onClickTrafficMap}>교통정보</MapTypeBtn>
            <MapTypeBtn className="btn btn-default" onClick={onClickRoadMap}>도로정보</MapTypeBtn>
            <MapTypeBtn className="btn btn-default" onClick={onClickTerrainMap}>지형정보</MapTypeBtn>
            <MapTypeBtn className="btn btn-default" onClick={onCLickDistrictMap}>지적편집도</MapTypeBtn>

            <div id="centerAddr"></div>
            <div id="centerCode"></div>
            <input value={newInput} onChange={onChangeNewInput} />
            <Select className="form-control">
                <option value="none">==년도==</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </Select>

            <MapScreen id="map" ref={aMap} />
        </>
    )
};

export default KaKaoMapHouse;