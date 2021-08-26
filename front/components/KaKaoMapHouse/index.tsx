import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
import {Aside, MapScreen, TableBox} from "@components/KaKaoMapHouse/style";
import useSWR from "swr";
import fetcher from "@utils/fetcher";

const KaKaoMapHouse = () => {
    const {data, error} = useSWR('http://localhost:1010/auth/', fetcher,{
        dedupingInterval: 2000,
    });
    console.log("컴포넌트 로그인 데이타 = ", data);
    const aMap = useRef(null);

    useEffect(()=> {
        let options = {
            center: new window.kakao.maps.LatLng(37.531427643208275, 127.0619991033721),
            level: 7
        };

        let map = new window.kakao.maps.Map(aMap.current, options);

        function searchDetailAddrFromCoords(coords: any, callback: any) {
            // 좌표로 법정동 상세 주소 정보를 요청합니다
            geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
        }

        // 지도 중심 좌표 변화 이벤트를 등록한다
        window.kakao.maps.event.addListener(map, 'center_changed', function () {
            const center = map.getCenter();
            console.log("center = ", center);
            searchDetailAddrFromCoords(center,function (result: any, status: any) {
                if (status === window.kakao.maps.services.Status.OK) {
                    console.log('지도의 중심 좌표는 ' + map.getCenter().toString() +' 입니다.');
                    console.log('지도의 주소는 ' + result[0].address.address_name);
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
    },[]);

    return (
        <>
            <MapScreen id="map" ref={aMap} />
            <Aside>
                <TableBox>

                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>주소</th>
                                <th>지목</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>John</td>
                                <td>Doe</td>
                                <td>john@example.com</td>
                            </tr>
                            <tr>
                                <td>Mary</td>
                                <td>Moe</td>
                                <td>mary@example.com</td>
                            </tr>
                            <tr>
                                <td>July</td>
                                <td>Dooley</td>
                                <td>july@example.com</td>
                            </tr>
                        </tbody>
                    </table>


                </TableBox>
            </Aside>
        </>
    )
};

export default KaKaoMapHouse;