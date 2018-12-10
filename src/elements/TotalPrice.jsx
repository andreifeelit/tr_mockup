import React from 'react';

const TotalPrice = (props) => {

    let price = props.price || 530;
    let arrowClass = props.digestOpen ? 'down' : 'right';

    return (
        <div className="total-price">
            
            <span className="total-price__label">Total</span>
            <span className="total-price__value">
                <span className="total-price__value--text">
                    ${price}
                </span> 
                
            </span>

            <span className="total-price__details" onClick={props.onPriceClick}>
                Details
                <i className={`arrow ${arrowClass}`}></i>
            </span>
        </div>
    )

}

export default TotalPrice;