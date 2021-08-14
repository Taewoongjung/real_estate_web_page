import React, {FC} from 'react';
import {Aside, CenterAxis} from "./style";

const RightBox:FC = () => {

    return (
        <Aside>
            <table className="table table-hover">
                <thead>
                <tr>
                    <td colSpan={2} align="center">중심 화면</td>
                </tr>
                <tr>
                    <td colSpan={2} align="center"><CenterAxis id="centerAddr" /></td>
                </tr>
                <tr>
                    <td>주소(도로명):</td>
                    <td><div id="detailAddr"></div></td>
                </tr>
                <tr>
                    {/*<td colSpan={2} align="center">{getData && <button type="button" className="btn btn-primary" onClick={onClick_first}>선택한 땅 확인</button>}</td>*/}
                    {/*<td colSpan={2} align="center"><button type="button" className="btn btn-primary" onClick={onClick_first}>선택한 땅 확인</button></td>*/}
                </tr>
                <tr><td colSpan={2}>&nbsp;</td></tr>
                <tr>
                    <td>주소:</td>
                    <td><div id="jsonAddr" /></td>
                </tr>
                <tr>
                    <td>본번:</td>
                    <td><div id="jsonMain" /></td>
                </tr>
                <tr>
                    <td>부번:</td>
                    <td><div id="jsonSub" /></td>
                </tr>
                <tr>
                    <td>PNU:</td>
                    <td><div id="jsonPNU" /></td>
                </tr>
                <tr>
                    <td>FullPNU:</td>
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
                    <td colSpan={2} align="center">
                        {/*{responsedData && <button type="button" className="btn btn-success" onClick={onClick_second}>공시지가 확인</button>}*/}
                    </td>
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
                        <div id="pblntfDe"/>
                    </td>
                </tr>
                <tr>
                    <td>공시지가:</td>
                    <td>
                        <div id="pblntfPclnd"/>
                    </td>
                </tr>
                <tr>
                    <td>데이터기준일자:</td>
                    <td>
                        <div id="lastUpdtDt"/>
                    </td>
                </tr>
                </thead>
            </table>
            <div id='chkTerrain'>

            </div>
        </Aside>
    )
};

export default RightBox;