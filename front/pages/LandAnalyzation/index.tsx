import React, {useCallback, useEffect, useState} from 'react';
import {Container, Wrap} from "@pages/Main/style";
import TopNav from "@components/TopNav";
import KaKaoMap from "@components/KaKaoMap";

const LandAnalyzation = () => {
    return (
        <Wrap>
            <Container>
                <TopNav />
                <KaKaoMap />
                {/*<RightBox/>*/}
            </Container>
        </Wrap>
    )
};

export default LandAnalyzation;