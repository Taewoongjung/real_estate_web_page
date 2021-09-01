import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {Aside, MapScreen, TableBox} from "@components/KaKaoMapHouse/style";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import axios from "axios";
import Scrollbars from "react-custom-scrollbars";

declare global {
    interface Window {
        currentPlaceAddress: string;
        bcode: string;
    }
}

const KaKaoMapHouse = () => {
    const {data, error} = useSWR('http://localhost:1010/auth/', fetcher,{
        dedupingInterval: 2000,
    });
    console.log("컴포넌트 로그인 데이타 = ", data);

    const [aptArray, setAptArray] = useState(Object);
    const [addrInList, setAddressInList] = useState('');
    const [address, setAddress] = useState('');
    const aMap = useRef(null);

    useEffect(()=> {
        const options = {
            center: new window.kakao.maps.LatLng(37.531427643208275, 127.0619991033721),
            level: 7
        };

        let map = new window.kakao.maps.Map(aMap.current, options);

        // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
        var mapTypeControl = new window.kakao.maps.MapTypeControl();

        // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
        // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
        map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

        // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
        var zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

        function searchDetailAddrFromCoords(coords: any, callback: any) {
            // 좌표로 법정동 상세 주소 정보를 요청합니다
            geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
        }

        var geocoder = new window.kakao.maps.services.Geocoder(); // 주소-좌표 변환 객체를 생성합니다

        // 지도 중심 좌표 변화 이벤트를 등록한다
        window.kakao.maps.event.addListener(map, 'center_changed', function () {
            const center = map.getCenter();
            console.log("center = ", center);
            console.log("center = ", center['Ma']);
            console.log("center = ", center['La']);

            let MA = Number(center['Ma']);
            console.log("MA = ", MA);

            let LA = Number(center['La']);
            console.log("LA = ", LA);

            geocoder.coord2RegionCode(LA, MA, function (result: any, status: any) {
                if (status === window.kakao.maps.services.Status.OK) {
                    console.log('지도의 중심 좌표는 ' + map.getCenter().toString() +' 입니다.');
                    console.log('지도의 주소는 ' + result[0].address_name);
                    console.log('행정동코드 ' + result[0].code);

                    const str = result[0].code;
                    const afterSplitString = str.substring(0, 5);
                    console.log("afterSplitString = ", afterSplitString);

                    window.currentPlaceAddress = result[0].address_name;
                    window.bcode = afterSplitString;
                }
            })
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

        function searchAddrFromCoords(coords: any, callback: any) {
            // 좌표로 행정동 주소 정보를 요청합니다
            geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
        }

        console.log("address = ", address);
        console.log("addrInList = ", addrInList);
        const full = address +' '+ addrInList;
        console.log("full = ", full);

        geocoder.addressSearch(full, function(result: any, status: any) {
            // 정상적으로 검색이 완료됐으면
            if (status === window.kakao.maps.services.Status.OK) {
                var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                // 결과값으로 받은 위치를 마커로 표시합니다
                var marker = new window.kakao.maps.Marker({
                    map: map,
                    position: coords,
                });
                // 인포윈도우로 장소에 대한 설명을 표시합니다
                var infowindow = new window.kakao.maps.InfoWindow({
                    content: `<div style="width:150px;text-align:center;padding:6px 0;">${full}</div>`
                });
                infowindow.open(map, marker);
                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
            }
        });
    },[address, addrInList]);

    const ClickthisPlace = useCallback((e) => {
        console.log("address = ", window.currentPlaceAddress);
        console.log("bcode = ", window.bcode);
        console.log("func 진입");
        const requestNews = axios.get(
            'http://localhost:1010/house/',
            {
                params: {
                    address: window.currentPlaceAddress,
                    bcode: window.bcode,
                }
            })
            .then((response)=>{

                // 들어오는 데이터를 백에서 정제하기

                // console.log(response.data['response']['body']['items']['item']);
                // const JsonArray = response.data['response']['body']['items']['item'];
                // // console.log(JsonArray);
                // var newArray = new Array();
                // Object.keys(JsonArray).map((keyName:any, index:any ) => {
                //     // console.log(index);
                //     console.log(JsonArray[index]);
                //     newArray.push([JsonArray[index]['아파트'], JsonArray[index]['지번'], JsonArray[index]['법정동']]);
                //     setAddress(String(JsonArray[index]['법정동']));
                //     // console.log(keyName);
                // })
                // // const setArray = new Set(newArray);
                // const setArray = Array.from(new Set(newArray));
                // console.log("aaaaa = ", setArray);
                // setAptArray(setArray);
            })
            .catch((error) => {
                console.log(error);
            });
    },[]);

    const clickThisApt = useCallback((e) => {
        e.preventDefault();

    },[]);
    console.log("addrInList = ", addrInList);
    return (
        <>
            <MapScreen id="map" ref={aMap}/>
            <Aside>
                <button onClick={ClickthisPlace}>보기</button>
                <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200} style={{height: 300, backgroundColor: "white", marginBottom: 20}}>
                    <div>
                        <TableBox>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>번호</th>
                                        <th>아파트</th>
                                        <th>지번</th>
                                        <th>법정동</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {Object.keys(aptArray).map((keyName:any, index:any ) =>
                                    <tr onClick={() => {
                                        console.log(aptArray[index]);
                                        console.log("clicked = ", aptArray[index][1]);
                                        console.log("clicked = ", aptArray[index][2]);
                                        setAddressInList(String(aptArray[index][1]));
                                    }}>
                                        <td>{index}</td>
                                        <td>{aptArray[keyName][0]}</td>
                                        <td>{aptArray[keyName][1]}</td>
                                        <td>{aptArray[keyName][2]}</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </TableBox>
                    </div>
                </Scrollbars>
            </Aside>
        </>
    )
};

export default KaKaoMapHouse;