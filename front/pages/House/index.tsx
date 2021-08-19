import React from 'react';
import {Container, Wrap} from "@pages/Main/style";
import TopNav from "@components/TopNav";
import KaKaoMapHouse from "@components/KaKaoMapHouse";

const House = () => {

    return (
        <Wrap>
            <Container>
                <TopNav />
                <KaKaoMapHouse />
            </Container>
        </Wrap>
    )
}

export default House;