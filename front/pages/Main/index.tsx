import React, {useCallback, useEffect, useState} from 'react';
import {Container, MapScreen, Nav, Toggle, Wrap} from '@pages/Main/style';
import KaKaoMap from "@components/KaKaoMap";
import TopNav from "@components/TopNav";
import RightBox from "@components/RightBox";


const Main = () => {

    return (
        <Wrap>
            <Container>
                <TopNav />
                <KaKaoMap />
                {/*<RightBox/>*/}
            </Container>
        </Wrap>
    )
}

export default Main;