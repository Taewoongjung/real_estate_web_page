import React, {useCallback, useEffect, useState} from 'react';
import {Container, Wrap} from "@pages/Main/style";
import TopNav from "@components/TopNav";
import KaKaoMapLand from "@components/KaKaoMapLand";
import useSWR from "swr";
import fetcher from "@utils/fetcher";

const LandAnalyzation = () => {
    return (
        <Wrap>
            <Container>
                <TopNav />
                <KaKaoMapLand />
                {/*<RightBox/>*/}
            </Container>
        </Wrap>
    )
};

export default LandAnalyzation;