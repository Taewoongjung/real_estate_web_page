import React, {FC, useCallback, useState} from 'react';
import {Nav, Toggle} from "./style";

const TopNav:FC = () => {
    const [navCollapse, setNavCollapse] = useState(true);

    const navDropdownCollapse = useCallback(() => {
        setNavCollapse((prev) => !prev);
    }, []);


    return (
        <Nav>
            <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                    {/*<li id="navbar-page"><a href="/"> Home</a></li>*/}
                    <Toggle collapse={navCollapse} onClick={navDropdownCollapse} className="dropdown"><a href="#" className="dropdown-category" id="dropdownCategoryMenu" data-toggle="dropdown">
                        부동산 <span className="caret"></span></a>
                        {navCollapse && <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownCategoryMenu">
                            <li><a href="/category/1"> 아파트</a></li>
                            <li><a href="/category/2"> 빌라</a></li>
                            <li><a href="/category/3"> 오피스텔</a></li>
                            <li><a href="/category/4"> 원, 투룸</a></li>
                        </ul>}
                    </Toggle>
                    <Toggle collapse={navCollapse} onClick={navDropdownCollapse} className="dropdown">
                        <a href="#" className="dropdown-category" id="dropdownCategoryMenu" data-toggle="dropdown">임장 <span className="caret"></span></a>
                        {navCollapse && <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownCategoryMenu">
                            <Toggle collapse={navCollapse} onClick={navDropdownCollapse} className="dropdown-submenu">
                                <a href="#"  className="dropdown-category" id="dropdownCategoryMenu" data-toggle="dropdown"> 주변<span className="caret"></span></a>
                                {navCollapse && <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownCategoryMenu">
                                    <li><a href="/category/231"> 산책로</a></li>
                                    <li><a href="/category/1222"> 맛집</a></li>
                                </ul>}
                            </Toggle>
                            <li><a href="/category/2"> 청약 아파트</a></li>
                        </ul>}
                    </Toggle>
                    <Toggle collapse={navCollapse} onClick={navDropdownCollapse} className="dropdown"><a href="#" className="dropdown-category" id="dropdownCategoryMenu" data-toggle="dropdown">
                        땅 분석 <span className="caret"></span></a>
                        {navCollapse && <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownCategoryMenu">
                            <li><a href="/LandAnalyzation"> 공시지가</a></li>
                        </ul>}
                    </Toggle>
                    <Toggle collapse={navCollapse} onClick={navDropdownCollapse} className="dropdown"><a href="/news" >
                        부동산 주요뉴스</a>
                    </Toggle>
                    <Toggle collapse={navCollapse} onClick={navDropdownCollapse} className="dropdown"><a href="#" className="dropdown-category" id="dropdownCategoryMenu" data-toggle="dropdown">
                        커뮤니티 <span className="caret"></span></a>
                        {navCollapse && <ul className="dropdown-menu" role="menu" aria-labelledby="dropdownCategoryMenu">
                            <li><a href="/category/1"> 자유게시판</a></li>
                        </ul>}
                    </Toggle>
                </ul>
            </div>
        </Nav>
    )
}

export default TopNav;
