import React, {useCallback, useEffect, useState} from 'react';
import {Container, MapScreen, Nav, Toggle, Wrap} from '@pages/Main/style';
import KaKaoMap from "@components/KaKaoMap";
import TopNav from "@components/TopNav";


const Main = () => {

    // useEffect(() => {
    //     let container = document.getElementById('map');
    //     let options = {
    //         center: new window.kakao.maps.LatLng(37.531427643208275, 127.0619991033721),
    //         level: 7
    //     };
    //
    //     let map = new window.kakao.maps.Map(container, options);
    //
    //     // 지도 중심 좌표 변화 이벤트를 등록한다
    //     window.kakao.maps.event.addListener(map, 'center_changed', function () {
    //         console.log('지도의 중심 좌표는 ' + map.getCenter().toString() +' 입니다.');
    //     });
    //
    //     // 지도 시점 변화 완료 이벤트를 등록한다
    //     window.kakao.maps.event.addListener(map, 'idle', function () {
    //         var message = '지도의 중심좌표는 ' + map.getCenter().toString() + ' 이고,' +
    //             '확대 레벨은 ' + map.getLevel() + ' 레벨 입니다.';
    //         console.log(message);
    //     });
    //
    //     // 지도 클릭 이벤트를 등록한다 (좌클릭 : click, 우클릭 : rightclick, 더블클릭 : dblclick)
    //     window.kakao.maps.event.addListener(map, 'click', function (mouseEvent: any) {
    //         console.log('지도에서 클릭한 위치의 좌표는 ' + mouseEvent.latLng.toString() + ' 입니다.');
    //     });
    //
    //     // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성합니다
    //     var mapTypeControl = new window.kakao.maps.MapTypeControl();
    //
    //     // 지도에 컨트롤을 추가해야 지도위에 표시됩니다
    //     // kakao.maps.ControlPosition은 컨트롤이 표시될 위치를 정의하는데 TOPRIGHT는 오른쪽 위를 의미합니다
    //     map.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);
    //
    //     // 지도 확대 축소를 제어할 수 있는  줌 컨트롤을 생성합니다
    //     var zoomControl = new window.kakao.maps.ZoomControl();
    //     map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
    //
    //     var geocoder = new window.kakao.maps.services.Geocoder(); // 주소-좌표 변환 객체를 생성합니다
    //     var marker = new window.kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
    //         infowindow = new window.kakao.maps.InfoWindow({zindex:1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다
    //
    //     // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
    //     searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    //     // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
    //     window.kakao.maps.event.addListener(map, 'click', function(mouseEvent: any) {
    //         searchDetailAddrFromCoords(mouseEvent.latLng, function(result: any, status: any) {
    //             if (status === window.kakao.maps.services.Status.OK) {
    //                 var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
    //                 detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
    //                 var content = '<div class="bAddr">' +
    //                     '<span class="title">법정동 주소정보</span>' +
    //                     detailAddr +
    //                     '</div>';
    //                 // 마커를 클릭한 위치에 표시합니다
    //                 marker.setPosition(mouseEvent.latLng);
    //                 marker.setMap(map);
    //                 // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
    //                 infowindow.setContent(content);
    //                 infowindow.open(map, marker);
    //             }
    //         });
    //     });
    //     // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
    //     window.kakao.maps.event.addListener(map, 'idle', function() {
    //         searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    //     });
    //     function searchAddrFromCoords(coords: any, callback: any) {
    //         // 좌표로 행정동 주소 정보를 요청합니다
    //         geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    //     }
    //     function searchDetailAddrFromCoords(coords: any, callback: any) {
    //         // 좌표로 법정동 상세 주소 정보를 요청합니다
    //         geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    //     }
    //     // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
    //     function displayCenterInfo(result: any, status: any) {
    //         if (status === window.kakao.maps.services.Status.OK) {
    //             var infoDiv = document.getElementById('centerAddr');
    //             for(var i = 0; i < result.length; i++) {
    //                 // 행정동의 region_type 값은 'H' 이므로
    //                 if (result[i].region_type === 'H') {
    //                     // @ts-ignore
    //                     infoDiv.innerHTML = result[i].address_name;
    //                     break;
    //                 }
    //             }
    //         }
    //     }
    // });

    return (
        <Wrap>
            <Container>
                <TopNav />
                {/*<MapScreen id="map" />*/}
                <KaKaoMap />
            </Container>
        </Wrap>
    )
}

export default Main;