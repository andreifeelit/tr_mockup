import React from 'react';

const ShowMore = (props) => {

    return (
        <div className="show-more">
            <span>show more</span>
            <br />
            <span className="show-more__icon">
                <i className="arrow down" />
            </span>
        </div>
    );
}

export default ShowMore;