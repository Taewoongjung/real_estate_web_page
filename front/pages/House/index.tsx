import React from 'react';
import {Container, Wrap} from "@pages/Main/style";
import TopNav from "@components/TopNav";
import KaKaoMap from "@components/KaKaoMap";

const House = () => {

    return (
        <Wrap>
            <Container>
                <TopNav />
                <KaKaoMap />
            </Container>
        </Wrap>
    )
}

export default House;