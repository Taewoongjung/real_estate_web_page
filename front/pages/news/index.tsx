import React, {useEffect} from 'react';
import NewsScreen from "@components/NewsScreen";
import TopNav from "@components/TopNav";

const news = () => {
    return (
        <>
            <TopNav />
            <NewsScreen />
        </>
    )
};

export default news;