import React, { useCallback, useState, VFC} from 'react';
import {Nav, RightMenu, Toggle, Header, ProfileImg, ProfileModal, LogOutButton} from "./style";
import gravatar from 'gravatar';
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import {IUser} from "@typings/db";
import Menu from "@components/Menu";
import axios from "axios";
import {Redirect} from "react-router-dom";

const TopNav:VFC = () => {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [navCollapse, setNavCollapse] = useState(true);

    const navDropdownCollapse = useCallback(() => {
        setNavCollapse((prev) => !prev);
    }, []);

    const onClickUserProfile = useCallback((e) => {
        e.stopPropagation();
        setShowUserMenu((prev) => !prev);
    }, []);

    const onLogout = useCallback((e) => {
        e.preventDefault();
        axios.post('http://localhost:1010/api/logout', null,{
            withCredentials: true,
        })
            .then((res) => {
                // mutate(false, false);
                window.location.href = '/login';
                console.log('logedout? = ', res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    },[]);

    function moveFavorite(){
        location.href = "/favorite";
    }

    return (
        <Nav>
            <div className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                    {/*<Toggle collapse={navCollapse} onClick={navDropdownCollapse} className="dropdown"><a href="/house" >*/}
                    {/*    부동산</a>*/}
                    {/*</Toggle>*/}
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
                            <li><a href="/chungyak"> 청약 아파트</a></li>
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
            <div>
                <Header>
                    <RightMenu>
                        <span onClick={onClickUserProfile}>
                        <ProfileImg />
                        {showUserMenu && (
                            <Menu style={{ right: 0, top: 38}} show={showUserMenu} onCloseModal={onClickUserProfile}>
                                <ProfileModal>
                                    <div>
                                        <button type="button" className="btn btn-default btn-sm" onClick={moveFavorite} >
                                            <span className="glyphicon glyphicon-star" aria-hidden="true"></span> 즐겨찾기&nbsp;&nbsp;&nbsp;&nbsp;ㅁㅁ
                                        </button>
                                    </div>
                                </ProfileModal>
                                <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
                            </Menu>
                        )}
                        </span>
                    </RightMenu>
                </Header>
            </div>
        </Nav>
    )
}

export default TopNav;
