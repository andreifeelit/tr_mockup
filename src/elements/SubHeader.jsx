import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Sticky from 'react-stickynode';

import StepIndicator from "./StepIndicator";
import TotalPrice from "./TotalPrice";

class SubHeader extends Component {

    constructor(props) {
        super(props);

        this.state = {
            digestOpen: false
        }

        this.togglePriceDigest = this.togglePriceDigest.bind(this);
    }

    togglePriceDigest(){
        this.setState({
            digestOpen: !this.state.digestOpen
        });
    }

    render() {

        let fromAirport= 'Tel Aviv';
        let toAirport = 'Paris';

        return (
            <Sticky enabled={true} top={0} innerZ={900}>
                <div className="steps-price-container container">
                    <StepIndicator selectedStep={this.props.step} />
                    <TotalPrice price={this.props.totalPrice} onPriceClick={this.togglePriceDigest} digestOpen={this.state.digestOpen} />
                </div>

        { this.state.digestOpen &&
                <div className="price-digest ">
                <div className="container">
                    <div className="price-digest__row">
                        <div className="item-name col-xs-3">
                            <div>Hotel in Paris</div>
                        </div>
                        <div className="item-details col-xs-9">
                        <div className="item-details__row">
                            <div className="item-details__row--left col-xs-10  no-padding">
                                <div className="col-xs-9  no-padding">
                                    <h5>Apollo City Center <span className="stars"></span></h5>
                                    <p>1 Room | Double room including breakfast</p>
                                </div>
                                <span className="icons col-xs-3" style={{'paddingTop': '15px'}}><img src="/images/temp/icon-hotel+flight.png" /></span>
                            </div>
                            
                            <div className="item-details__row--actions col-xs-2">
                                <Link to="/step/hotel"><i className="icon-pencil"></i> edit</Link>
                            </div>
                        </div>
                        </div>
                    </div>


                    <div className="price-digest__row">
                        <div className="item-name col-xs-3">
                            <div>
                                Tel Aviv - Paris
                                <span>Round Trip</span>
                            </div>
                        </div>
                        <div className="item-details col-xs-9">
                            <div className="item-details__row">
                                <div className="item-details__row--left col-xs-10  no-padding">
                                    <span className="col-xs-1  no-padding"><strong>15:00</strong></span>
                                    <span className="col-xs-1">20/02</span>
                                    <span className="col-xs-2">{fromAirport}</span>
                                    <span className="arrow col-xs-1">&rarr;</span>
                                    <span className="col-xs-1"><strong>19:15</strong></span>
                                    <span className="col-xs-1">20/02</span>
                                    <span className="col-xs-2">{toAirport}</span>
                                    <span className="col-xs-3 icons"><img src="/images/temp/icon-flight4.png" /></span>
                                </div>
                               

                                <div className="item-details__row--actions col-xs-2  no-padding">
                                    <Link to="/step/outbound"><i className="icon-pencil"></i> edit</Link>
                                </div>
                            </div>
                            <div className="item-details__row">
                                <div className="item-details__row--left col-xs-10  no-padding">
                                    <span className="col-xs-1 no-padding"><strong>23:20</strong></span>
                                    <span className="col-xs-1">20/02</span>
                                    <span className="col-xs-2">{toAirport}</span>
                                    <span className="arrow col-xs-1">&rarr;</span>
                                    <span className="col-xs-1"><strong>05:50</strong></span>
                                    <span className="col-xs-1">20/02</span>
                                    <span className="col-xs-2">{fromAirport}</span>
                                    <span className="col-xs-3 icons"><img src="/images/temp/icon-flight3.png" /></span>
                                </div>

                                <div className="item-details__row--actions col-xs-2 ">
                                    <Link to="/step/outbound"><i className="icon-pencil"></i> edit</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="price-digest__row">
                        <div className="item-name col-xs-3">
                            <div>Activities in Paris</div>
                        </div>
                        <div className="item-details col-xs-9">
                        <div className="item-details__row">
                            <div className="item-details__row--left col-xs-10  no-padding">
                                <h5>Beyonce world tour </h5>
                                <p>Parc de Frace Stadium | 25.05</p>
                            </div>
                            

                            <div className="item-details__row--actions col-xs-2">
                                <Link to="/step/activity"><i className="icon-pencil"></i> edit</Link>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                </div>
        }
            </Sticky>
        );

    }

}

export default SubHeader;