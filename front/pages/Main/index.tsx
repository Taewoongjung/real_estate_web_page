import React, {useCallback, useEffect, useState} from 'react';
import {Container, MapScreen, Nav, Toggle, Wrap} from '@pages/Main/style';
import KaKaoMapLand from "@components/KaKaoMapLand";
import TopNav from "@components/TopNav";

const Main = () => {
    return (
        <Wrap>
            <Container>
                <TopNav />
                <KaKaoMapLand />
            </Container>
        </Wrap>
    )
}

export default Main;