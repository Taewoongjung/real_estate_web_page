import React, {FC, useCallback, useState} from 'react';
import {Nav, RightMenu, Toggle, Header, ProfileImg, ProfileModal, LogOutButton} from "./style";
import gravatar from 'gravatar';
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import {IUser} from "@typings/db";
import Menu from "@components/Menu";

const TopNav:FC = () => {
    const {data: useData, mutate} = useSWR<IUser>('http://localhost:1010/api/', fetcher,{
        dedupingInterval: 2000,
    });

    console.log("@@@ = ", useData);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [navCollapse, setNavCollapse] = useState(true);

    const navDropdownCollapse = useCallback(() => {
        setNavCollapse((prev) => !prev);
    }, []);

    const onClickUserProfile = useCallback((e) => {
        e.stopPropagation();
        setShowUserMenu((prev) => !prev);
    }, []);

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
            <div>
                <Header>
                    <RightMenu>
                        <span onClick={onClickUserProfile}>
                        <ProfileImg src={gravatar.url(useData?.email as string,{ s:'39px', d:'mp'})} alt={useData?.nick} />
                        {showUserMenu && (
                            <Menu style={{ right: 0, top: 38}} show={showUserMenu} onCloseModal={onClickUserProfile}>
                                <ProfileModal>
                                    <div>
                                        <p className="navbar-text">Nickname:&nbsp; {useData?.nick}</p>
                                        <button type="button" className="btn btn-default btn-sm">
                                            <span className="glyphicon glyphicon-star" aria-hidden="true"></span> 즐겨찾기&nbsp;&nbsp;&nbsp;&nbsp;ㅁㅁ
                                        </button>
                                    </div>
                                </ProfileModal>
                                {/*<LogOutButton onClick={onLogout}>로그아웃</LogOutButton>*/}
                                <LogOutButton>로그아웃</LogOutButton>
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
