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
        Address: string;
    }
}

const KaKaoMapFavorite: VFC = () => {
    const {data, error, mutate} = useSWR('http://localhost:1010/auth/', fetcher);
    console.log("favorite 로그인 데이타 = ", data);

    window.DataId = data?.id;
    console.log("id 확인 = ", window.DataId);

    const [place, setPlace] = useState('');
    const [news, setNews] = useState(false);
    const [getLand, setLand] = useState(false);
    const [getLevel, setLevel] = useState(false);
    const aMap = useRef(null);

    useEffect(()=> {
        let options = {
            center: new window.kakao.maps.LatLng(37.531427643208275, 127.0619991033721),
            level: getLevel ? 3 : 7
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

        // 주소로 좌표를 검색합니다
        console.log("setPlace in useEffect = ", place.split(' ', 3));
        const addr = place.split(' ', 3);

        const fullAddr = addr.join(' ');
        console.log("isitright? = ", fullAddr);

        window.Address = fullAddr;

        console.log("addr in useEffect = ", addr);
        // setPlaceForNews(addr);
        geocoder.addressSearch(place, function(result: any, status: any) {

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
                    content: `<div style="width:150px;text-align:center;padding:6px 0;">${place}</div>`
                });
                infowindow.open(map, marker);

                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
            }
        });
        const requestNews = axios.get(
            'http://localhost:1010/api/newsinfo_favorite',
            {
                params: {
                    address: window.Address,
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

    },[place]);

    const [getName, setName] = useState(Object);

    const landClicked = useCallback((e) => {
        console.log("id 확인2 = ", window.DataId);
        e.preventDefault();
        setLand((prev) => !prev);
        setNews(false);
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
                <Scrollbars autoHide autoHideTimeout={500} autoHideDuration={200} style={{height: 300, backgroundColor: "white", marginBottom: 20}}>
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
                                    <tr onClick={() => (
                                        console.log(getName[index][5]),
                                        console.log("type = ", typeof(getName[index][5])),
                                        setPlace(getName[index][5]),
                                        console.log("내부에 setPlace = ", place),
                                        setLevel(true),
                                        setNews(true)
                                    )}>
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
                { getLand && news && <div className="row">
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
                </div> }
            </Aside>
        </>
    )
};

export default KaKaoMapFavorite;