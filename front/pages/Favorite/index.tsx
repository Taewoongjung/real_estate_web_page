import React from 'react';
import {Container, Wrap} from "@pages/Main/style";
import TopNav from "@components/TopNav";
import KaKaoMapFavorite from "@components/KaKaoMapFavorite";

const Favorite = () => {

    return (
        <>
            <Wrap>
                <Container>
                    <TopNav />
                    <KaKaoMapFavorite />
                </Container>
            </Wrap>
        </>
    )
};

export default Favorite;
