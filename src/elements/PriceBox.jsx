import React from 'react';

const PriceBox = (props) => {

    let price = props.hasOwnProperty('price') ? props.price : Math.floor( 500 + (Math.random() * 400));
    let plusSign = props.notFixedPrice || false;
    let included = props.included || false;

    let isHotel = props.isHotel || false;
    let isPackage = !isHotel;

    let ctaLabel = isPackage ? 'Continue' : 'Select this';
    if( props.ctaLabel ){
        ctaLabel = props.ctaLabel;
    }

    let tinyText = props.tinyText || `inc. hotel and flight. 
    (flight choice in next step)`;
    // let ctaLink = isPackage ? '/step/hotel' : '/step/outbound';

    // console.log('props.cta = ', props.cta);
    let cta = typeof props.cta != 'undefined' ? props.cta : true;

    return (
        <div className="price-box">
            <div className="price-box__price">
                
                <span className={`price__big ${props.extraPriceClass}`}>
                    {
                        isHotel && <span className="price-box__above-price"><img src="/images/temp/hotel-flight-icon-duo.png" alt="" /></span>
                    }
                    {
                        isPackage && <span className="starting-from">from</span>
                    }
                   
                    { (price !== 0 && !included) ? 
                        <span> {plusSign ? '+' : null} ${price} </span>
                        :
                        'Selected'
                    }
                </span>
                    {
                        (isHotel && !included ) && <span className="price-box__under-price">
                        {tinyText}
                        </span>
                    }

            </div>
            
            { cta && 
                <div className="price-box__cta">
                    {/* <Link to={ctaLink}> */}
                        <button className="btn price-box__btn" onClick={() => props.onSelect(price)}>{ctaLabel}</button>
                    {/* </Link> */}
                    {
                        isPackage && <p><a className="price-box__link"><i className="icon-pencil"></i> edit package</a></p>
                    }
                </div>
            }

            { 
                isPackage && 
                <div className="price-box__notes">
                    <p>
                    fares included <br />
                    later changed
                    </p>
                </div>
            }
        </div>
    )
}

export default PriceBox;