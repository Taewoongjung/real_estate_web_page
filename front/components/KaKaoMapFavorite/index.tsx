import React, {useCallback, useEffect, useRef} from 'react';
import axios from "axios";
import {Aside, MapScreen} from "./style";

const KaKaoMapFavorite = () => {

    const aMap = useRef(null);

    useEffect(()=> {
        let options = {
            center: new window.kakao.maps.LatLng(37.531427643208275, 127.0619991033721),
            level: 7
        };

        let map = new window.kakao.maps.Map(aMap.current, options);

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


    },[]);


    return (
        <>
            <MapScreen id="map" ref={aMap} />
            <Aside>
                <div className="btn-group btn-group-justified" role="group" aria-label="...">
                    <div className="btn-group" role="group">
                        <button type="button" className="btn btn-default">Left</button>
                    </div>
                    <div className="btn-group" role="group">
                        <button type="button" className="btn btn-default">Middle</button>
                    </div>
                    <div className="btn-group" role="group">
                        <button type="button" className="btn btn-default">Right</button>
                    </div>
                </div>
            </Aside>
        </>
    )
}

export default KaKaoMapFavorite;