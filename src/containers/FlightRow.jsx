import React, { Component } from 'react';

import { Link } from "react-router-dom";

export default class FlightRow extends Component{

    constructor(props){
        super(props);

        this.state = {
            detailsOpen: false,
        };

        this.onToggleDetails = this.onToggleDetails.bind(this);

        // console.log("FlightRow props=",this.props);
    }

    onToggleDetails(){
        this.setState({
            detailsOpen: !this.state.detailsOpen
        })
    }

    render(){

        // let hotelImg = `/images/temp/hotelimg.png`;
        // let hotelStarsImg = `/images/temp/stars.png`;
        // let tripadvisorImg = `/images/temp/tripadvisor.png`;
        let marginTopClass = this.props.marginTop || 'margin-top-big';

        let {flightData} = this.props;


        let priceText = `+ $${(Math.ceil(Math.random()*6)*10)}`;
        
        if( this.props.hasOwnProperty('flightData') ){
            priceText = `${flightData.currency_code}${flightData.amount}`;
        }
        
        if( this.props.included == true ){
            priceText = 'Selected';
        }

        if( this.props.forceZeroPrice == true ){
            priceText = '+ $0';
        }

        let flightType = typeof this.props.flightType != 'undefined' ? this.props.flightType.toLowerCase() : 'outbound';
        // console.log("In FlightRow, flightType=", flightType);

        let cta = typeof this.props.cta != 'undefined' ? this.props.cta : true;
        let ctaLabel = 'Continue';
        let ctaLink = `/step/${ flightType == 'outbound' ? 'inbound' : 'activity' }`;

        
        let logo = `${flightData.comp_path}${flightData.comp_logo}`;


        return (
            <div> 
                <div className={`package-row flight-row ${marginTopClass}`}>
                    <div className="col-sm-9 col-md-10 no-padding flight-row--left">
                        <div className="tmp-flight-row">

                            <div className="flight-row-left">
                                <div className="image-container" style={{backgroundImage: `url(${logo})`}} />
                            </div>
                            <div className="flight-row-middle">
                                {/*<img src="/images/temp/flight-row-middle.png" /> */}
                                
                                <div className="col-xs-4">
                                    <span className="f-time">{flightData.takeoff_hour}</span>
                                    <br />
                                    <span>{flightData.city_from_name} ({flightData.city_from_airport_code})</span>
                                </div>

                                <div className="col-xs-4">
                                    <span>total time: {flightData.flight_duration_format}</span>
                                    <br />
                                    <span>{flightData.nb_escales > 0 ? `${flightData.nb_escales} stops` : `Direct flight`}</span>
                                </div>
                                

                                <div className="col-xs-4">
                                    <span className="f-time">{flightData.landing_hour}</span>
                                    <br />
                                    <span>{flightData.city_to_name} ({flightData.city_to_airport_code})</span>
                                </div>
                                
                            </div>
                            <div className="flight-row-right"><img src="/images/temp/flight-row-right.png"  onClick={this.onToggleDetails} /></div>
                            

                        </div>
                        {
                            this.state.detailsOpen && 
                            <div className="tmp-flight-row-bgimg" onClick={this.onToggleDetails}>
                                &nbsp;

                            </div>
                        }
                    </div>
                    <div className="col-sm-3 col-md-2 no-padding">
                        <div className="price-box">
                            <div className="price-box__price">
                                <span className={`price__big ${priceText == "Selected" ? 'reduced' : 'reduced-a-bit'}`}>
                                    {priceText}
                                </span>
                                
                            </div>
                            
                            { cta &&
                            <div className="price-box__cta">
                                <Link to={ctaLink}>
                                    <button className="btn price-box__btn">{ctaLabel}</button>
                                </Link>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

