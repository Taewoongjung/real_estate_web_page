import React, {useEffect, useRef} from 'react';
import {
    BottomNews,
    Container,
    LeftTopNews,
    MapScreenInNews,
    MapScreenSpace, RightNews,
    RightTopNews
} from "@components/NewsScreen/style";
import TopNav from "@components/TopNav";

const NewsScreen = () => {

    const aMap = useRef(null);

    useEffect(()=> {
        let options = {
            center: new window.kakao.maps.LatLng(37.531427643208275, 127.0619991033721),
            level: 7
        };
        let map = new window.kakao.maps.Map(aMap.current, options);
    },[]);

        return (
        <>
            <Container>
                <MapScreenSpace>
                    <MapScreenInNews id="map" ref={aMap}/>
                </MapScreenSpace>
                <LeftTopNews>
                    <div className="row">
                        <div className="col-xs-6 col-md-3">
                            <a href="#" className="thumbnail">
                                asdasdasdasdasdasdasdasdas
                                asdasdasdasdasdasdasdasdas
                                asdasdasdasdasdasdasdasdas
                                asdasdasdasdasdasdasdasdas
                                asdasdasdasdasdasdasdasdas
                                asdasdasdasdasdasdasdasdas
                                asdasdasdasdasdasdasdasdas
                            </a>
                        </div>
                    </div>
                </LeftTopNews>
                <BottomNews>
                </BottomNews>
                <RightTopNews>
                    <div className="row">
                        <div className="col-xs-6 col-md-3">
                            <a href="#" className="thumbnail">
                                asdasdasdasdasdasdasdasdas
                                asdasdasdasdasdasdasdasdas
                                asdasdasdasdasdasdasdasdas
                                asdasdasdasdasdasdasdasdas
                                asdasdasdasdasdasdasdasdas
                                asdasdasdasdasdasdasdasdas
                                asdasdasdasdasdasdasdasdas
                            </a>
                        </div>
                    </div>
                </RightTopNews>
                <RightNews>
                    <div className="row">
                        <div className="col-xs-6 col-md-3">
                            <a href="#" className="thumbnail">
                                asdasdasdasdasdasdasdasdas
                                asdasdasdasdasdasdasdasdas
                                asdasdasdasdasdasdasdasdas
                                asdasdasdasdasdasdasdasdas
                                asdasdasdasdasdasdasdasdas
                                asdasdasdasdasdasdasdasdas
                                asdasdasdasdasdasdasdasdas
                            </a>
                        </div>
                    </div>
                </RightNews>
            </Container>
        </>
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