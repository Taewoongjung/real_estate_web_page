import React, {useState, VFC} from 'react';
import {Aside, CancelBtn, CenterAxis} from "@components/KaKaoMapLand/style";

const RightBox: VFC = ({}) => {

    const [zIndex, setzIndex] = useState(0);

    const onClickCancelBtn = () => {
        setzIndex(0);
    }

    return (
        <div>
            <Aside zIndex={zIndex}>
                <CancelBtn className="btn btn-default" onClick={onClickCancelBtn}>
                    <div className="glyphicon glyphicon-remove" />
                </CancelBtn>
                <button type="button" className="btn btn-default">
                    <span className="glyphicon glyphicon-star" aria-hidden="true"></span> Star
                </button>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <td>주소:</td>
                            <td><div id="jsonAddr" /></td>
                        </tr>
                        <tr>
                            <td>고유필지번호:</td>
                            <td><div id="jsonFullPNU" /></td>
                        </tr>
                        <tr>
                            <td>좌표(x):</td>
                            <td><div id="jsonX" /></td>
                        </tr>
                        <tr>
                            <td>좌표(y):</td>
                            <td><div id="jsonY" /></td>
                        </tr>
                        <tr>
                            <td>특수지구분명:</td>
                            <td>
                                <div id="regstrSeCodeNm"/>
                            </td>
                        </tr>
                        <tr>
                            <td>특수지구코드:</td>
                            <td><div id="regstrSeCode" /></td>
                        </tr>
                        <tr>
                            <td>공시 일자:</td>
                            <td>
                                <div id="lastUpdtDt"/>
                            </td>
                        </tr>
                        <tr>
                            <td>공시지가:</td>
                            <td>
                                <div id="pblntfPclnd"/>
                            </td>
                        </tr>
                        <tr>
                            <td>토지면적(㎡):</td>
                            <td>
                                <div id="lnadArea"/>
                            </td>
                        </tr>
                        <tr>
                            <td>지목:</td>
                            <td>
                                <div id="landName"/>
                            </td>
                        </tr>
                        <tr>
                            <td>용도지역:</td>
                            <td>
                                <div id="landType"/>
                            </td>
                        </tr>
                        <tr>
                            <td>용도지역2:</td>
                            <td>
                                <div id="landType2"/>
                            </td>
                        </tr>
                        <tr>
                            <td>토지이용상황:</td>
                            <td>
                                <div id="landUsage"/>
                            </td>
                        </tr>
                        <tr>
                            <td>지형형상:</td>
                            <td>
                                <div id="landShape"/>
                            </td>
                        </tr>
                        <tr>
                            <td>도로측면:</td>
                            <td>
                                <div id="landRoad"/>
                            </td>
                        </tr>
                    </thead>
                </table>
            </Aside>
        </div>
    )
}

export default RightBox;