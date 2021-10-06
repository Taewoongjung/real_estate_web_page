import React, {useEffect, useRef} from 'react';
import {
    BottomNews, Boxes,
    Container, FullContainer, LeftBottomNews, LeftNews,
    LeftTopNews, MapScreenInNews,
    MapScreenSpace, RightBottomNews, RightNews,
    RightTopNews, SearchSpace
} from "@components/NewsScreen/style";
import axios from "axios";
import useInput from "@hooks/useInput";

const NewsScreen = () => {
    const [words, onSetSearchWords] = useInput('');
    const aMap = useRef(null);

    useEffect(()=> {
        let options = {
            center: new window.kakao.maps.LatLng(37.531427643208275, 127.0619991033721),
            level: 7
        };
        let map = new window.kakao.maps.Map(aMap.current, options);
        var geocoder = new window.kakao.maps.services.Geocoder(); // 주소-좌표 변환 객체를 생성합니다
        var marker = new window.kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
            infowindow = new window.kakao.maps.InfoWindow({zindex:1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

        function searchDetailAddrFromCoords(coords: any, callback: any) {
            // 좌표로 법정동 상세 주소 정보를 요청합니다
            geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
        }

        // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
        window.kakao.maps.event.addListener(map, 'click', function(mouseEvent: any) {
            searchDetailAddrFromCoords(mouseEvent.latLng, function (result: any, status: any) {
                if (status === window.kakao.maps.services.Status.OK) {
                    var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
                    console.log("!! = ", detailAddr);
                    detailAddr += '<div>' + result[0].address.address_name + '</div>';
                    var content = '<div id="bAddr" style="color: green; width: 300%; height:300%;" >' +
                        detailAddr +
                        '</div>';

                    const addr = result[0].address.address_name;

                    // 마커를 클릭한 위치에 표시합니다
                    marker.setPosition(mouseEvent.latLng);
                    marker.setMap(map);

                    // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
                    infowindow.setContent(content);
                    infowindow.open(map, marker);

                    const requestNews = axios.get(
                        'http://localhost:1010/api/newspage',
                        {
                            params: {
                                address: addr,
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

                            // fifth

                            // @ts-ignore
                            document.getElementById("title_fifth").innerHTML = response.data.items[4]['title'];
                            // @ts-ignore
                            document.getElementById("image_fifth").href = response.data.items[4]['link'];
                            // @ts-ignore
                            document.getElementById("content_fifth").innerHTML = response.data.items[4]['description'];

                            // sixth

                            // @ts-ignore
                            document.getElementById("title_sixth").innerHTML = response.data.items[5]['title'];
                            // @ts-ignore
                            document.getElementById("image_sixth").href = response.data.items[5]['link'];
                            // @ts-ignore
                            document.getElementById("content_sixth").innerHTML = response.data.items[5]['description'];

                            // seventh

                            // @ts-ignore
                            document.getElementById("title_seventh").innerHTML = response.data.items[6]['title'];
                            // @ts-ignore
                            document.getElementById("image_seventh").href = response.data.items[6]['link'];
                            // @ts-ignore
                            document.getElementById("content_seventh").innerHTML = response.data.items[6]['description'];

                            // eight

                            // @ts-ignore
                            document.getElementById("title_eight").innerHTML = response.data.items[7]['title'];
                            // @ts-ignore
                            document.getElementById("image_eight").href = response.data.items[7]['link'];
                            // @ts-ignore
                            document.getElementById("content_eight").innerHTML = response.data.items[7]['description'];

                            // nine

                            // @ts-ignore
                            document.getElementById("title_nine").innerHTML = response.data.items[8]['title'];
                            // @ts-ignore
                            document.getElementById("image_nine").href = response.data.items[8]['link'];
                            // @ts-ignore
                            document.getElementById("content_nine").innerHTML = response.data.items[8]['description'];

                        })
                        .catch((error) => {
                            console.log(error);
                        });

                }
            })
        })

        geocoder.addressSearch(words, function(result: any, status: any) {

            // 정상적으로 검색이 완료됐으면
            if (status === window.kakao.maps.services.Status.OK) {

                var coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

                // 결과값으로 받은 위치를 마커로 표시합니다
                var marker = new window.kakao.maps.Marker({
                    map: map,
                    position: coords,
                });

                // 인포윈도우로 장소에 대한 설명을 표시합니다
                // var infowindow = new window.kakao.maps.InfoWindow({
                //     content: `<div style="width:150px;text-align:center;padding:6px 0;">${words}</div>`
                // });
                // infowindow.open(map, marker);

                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
            }
        });
    },[words]);

        return (
        <FullContainer>
            <Container>
                <MapScreenSpace>
                    <MapScreenInNews id="map" ref={aMap}/>
                    <SearchSpace className="col-lg-6">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Search for..." onChange={onSetSearchWords}/>
                            <span className="input-group-btn">
                                <button className="btn btn-default" type="button" onClick={(e) => {
                                    console.log(words);
                                }}>Search</button>
                            </span>
                        </div>
                    </SearchSpace>
                </MapScreenSpace>
                <LeftTopNews>
                    <div className="row">
                        <div className="col-xs-6 col-md-12">
                            <a id="image_fir" href="#" className="thumbnail">
                                <div className="caption">
                                    <h3 id="title_fir"></h3>
                                    <p id="content_fir"></p>
                                </div>
                            </a>
                        </div>
                    </div>
                </LeftTopNews>
                <LeftNews>
                    <div className="row">
                        <div className="col-xs-6 col-md-12">
                            <a id="image_sec" href="#" className="thumbnail">
                                <div className="caption">
                                    <h3 id="title_sec"></h3>
                                    <p id="content_sec"></p>
                                </div>
                            </a>
                        </div>
                    </div>
                </LeftNews>
                <LeftBottomNews>
                    <div className="row">
                        <div className="col-xs-6 col-md-12">
                            <a id="image_trd" href="#" className="thumbnail">
                                <div className="caption">
                                    <h3 id="title_trd"></h3>
                                    <p id="content_trd"></p>
                                </div>
                            </a>
                        </div>
                    </div>
                </LeftBottomNews>
                <BottomNews>
                    <div className="row">
                        <div className="col-xs-6 col-md-10">
                            <a id="image_frh" href="#" className="thumbnail">
                                <div className="caption">
                                    <h3 id="title_frh"></h3>
                                    <p id="content_frh"></p>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-6 col-md-10">
                            <a id="image_eight" href="#" className="thumbnail">
                                <div className="caption">
                                    <h3 id="title_eight"></h3>
                                    <p id="content_eight"></p>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-6 col-md-10">
                            <a id="image_nine" href="#" className="thumbnail">
                                <div className="caption">
                                    <h3 id="title_nine"></h3>
                                    <p id="content_nine"></p>
                                </div>
                            </a>
                        </div>
                    </div>
                </BottomNews>
                <RightBottomNews>
                    <div className="row">
                        <div className="col-xs-6 col-md-12">
                            <a id="image_fifth" href="#" className="thumbnail">
                                <div className="caption">
                                    <h3 id="title_fifth"></h3>
                                    <p id="content_fifth"></p>
                                </div>
                            </a>
                        </div>
                    </div>
                </RightBottomNews>
                <RightTopNews>
                    <Boxes>
                            <div className="col-xs-6 col-md-12">
                                <a id="image_sixth" href="#" className="thumbnail">
                                    <div className="caption">
                                        <h3 id="title_sixth"></h3>
                                        <p id="content_sixth"></p>
                                    </div>
                                </a>
                            </div>
                    </Boxes>
                </RightTopNews>
                <RightNews>
                    <div className="row">
                        <div className="col-xs-6 col-md-12">
                            <a id="image_seventh" href="#" className="thumbnail">
                                <div className="caption">
                                    <h3 id="title_seventh"></h3>
                                    <p id="content_seventh"></p>
                                </div>
                            </a>
                        </div>
                    </div>
                </RightNews>
            </Container>
        </FullContainer>
    )
}

// <div className="row">
//     <div className="col-xs-6 col-md-3">
//         <a href="#" className="thumbnail">
//             <img src="..." alt="..." />
//         </a>
//     </div>
// </div>

export default NewsScreen;