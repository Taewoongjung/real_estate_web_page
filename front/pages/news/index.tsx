import React, {useEffect} from 'react';
import axios from "axios";

const news = () => {

    useEffect(()=> {
        axios.get('http://localhost:1010/api/newsinfo')
            .then((response)=>{
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    },[]);

    return (
        <>
            <div className="row">
                <div className="col-xs-6 col-md-3">
                    <a href="#" className="thumbnail">
                        <img src="..." alt="..." />
                    </a>
                </div>
            </div>
        </>
    )
};

export default news;