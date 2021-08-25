import React, {useCallback, useEffect, useRef, useState, VFC} from 'react';
import axios from "axios";
import {Aside, MapScreen, Table, TableBox} from "./style";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import {aaa} from "@typings/db";
import Scrollbars from "react-custom-scrollbars";

declare global {
    interface Window {
        DataId: string;
    }
}

const KaKaoMapFavorite: VFC = () => {
    const {data, error, mutate} = useSWR('http://localhost:1010/auth/', fetcher);
    console.log("favorite 로그인 데이타 = ", data);

    window.DataId = data?.id;
    console.log("id 확인 = ", window.DataId);
    const[getLand, setLand] = useState(false);
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

    const [getName, setName] = useState(Object);
    const [aa, bb] = useState(Object);
    const [area, setArea] = useState([]);
    const [price, setPrice] = useState([]);
    const [type, setType] = useState([]);
    const [special, setSpecial] = useState([]);
    const [address, setAddress] = useState([]);

    const landClicked = useCallback((e) => {
        console.log("id 확인2 = ", window.DataId);
        e.preventDefault();
        setLand((prev) => !prev);
        const backReq = axios.get('http://localhost:1010/favorite/find', {
            params: {
                userId: window.DataId
            }
        })
            .then((res) => {
                console.log("axios = ", res.data.length);
                console.log("axios data1= ", res.data[0]);
                console.log("axios data2= ", res.data[1]);
                var arr = new Array(res.data.length);
                console.log("??! = ", arr);

                let landName = new Array();
                let landArea = new Array();
                let landPrice = new Array();
                let landType = new Array();
                let landSpecial = new Array();
                let address = new Array();
                var full = [];

                for(let i = 0; i < res.data.length; i++) {
                    landName[i] = res.data[i].landName;
                    console.log("type = ", typeof(landName[i]));

                    landArea[i] = res.data[i].landArea;
                    landPrice[i] = res.data[i].landPrice;
                    landType[i]  = res.data[i].landType;
                    landSpecial[i] = res.data[i].landSpecial;
                    address[i] = res.data[i].address;
                    console.log("^^ = ", landName[i], landArea[i], landPrice[i], landType[i], landSpecial[i], address[i] );
                    full[i] = [landName[i], landArea[i], landPrice[i], landType[i], landSpecial[i], address[i]];
                    console.log("array = ", full);
                }
                setName(full);
                console.log("!! = ", getName);
            });
    },[getName]);

    console.log('?? = ', getName);
    console.log('type = ', typeof(getName));
    console.log(aa);
    console.log("aaaa = ",aa);
    console.log("bbbb = ",aa.length);

    return (
        <>
            <MapScreen id="map" ref={aMap} />
            <Aside>
                <div className="btn-group btn-group-justified" role="group" aria-label="...">
                    <div className="btn-group" role="group">
                        <div className="btn btn-default" onClick={landClicked}>땅</div>
                    </div>
                    <div className="btn-group" role="group">
                        <button type="button" className="btn btn-default">청약</button>
                    </div>
                </div>
                {getLand &&
                <Scrollbars style={{height: 300, backgroundColor: "white"}}>
                    <div>
                        <TableBox>
                            <Table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th style={{fontSize: 12}} datatype='id'>번호</th>
                                        <th style={{fontSize: 12}}>주소</th>
                                        <th style={{fontSize: 12}}>지목</th>
                                        <th style={{fontSize: 12}}>면적</th>
                                        <th style={{fontSize: 12}}>공시지가</th>
                                        <th style={{fontSize: 12}}>용도</th>
                                        <th style={{fontSize: 12}}>특수지구분</th>
                                    </tr>
                                    </thead>
                                <tbody>
                                {Object.keys(getName).map((keyName:any, index:any ) =>
                                    <tr>
                                            <td key="unique1"> {index+1}</td>
                                            <td key="unique2"> {getName[index][5]}</td>
                                            <td key="unique3"> {getName[index][0]}</td>
                                            <td key="unique4"> {getName[index][1]}</td>
                                            <td key="unique5"> {getName[index][2]}</td>
                                            <td key="unique6"> {getName[index][4]}</td>
                                            <td key="unique7"> {getName[index][3]}</td>
                                            <td key="uniqeu8"> <button onClick={() => (
                                                axios.post('http://localhost:1010/favorite/delete', {
                                                    addr: getName[index]
                                                }),
                                                setLand(false)
                                            )}>삭제</button></td>
                                    </tr>
                                )}
                                </tbody>
                            </Table>
                        </TableBox>
                    </div>
                </Scrollbars>
                }
            </Aside>
        </>
    )
};

export default KaKaoMapFavorite;