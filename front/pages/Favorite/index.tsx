import React from 'react';

const Favorite = () => {

    return (
        <>
            <div className="btn-group btn-group-justified" role="group" aria-label="...">
                <div className="btn-group" role="group">
                    <button type="button" className="btn btn-default">Left</button>
                </div>
                <div className="btn-group" role="group">
                    <button type="button" className="btn btn-default">Middle</button>
                </div>
                <div className="btn-group" role="group">
                    <button type="button" className="btn btn-default">Right</button>
                </div>
            </div>
        </>
    )
};

export default Favorite;
