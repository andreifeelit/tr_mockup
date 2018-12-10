import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Sticky from 'react-stickynode';
import { Link } from "react-router-dom";

import HotelRow from './HotelRow';
import FlightRow from './FlightRow';
import ActivityRow from './ActivityRow';
import SelectedItemTopBar from "../elements/SelectedItemTopBar";


import SubHeader from "../elements/SubHeader";

import {flights} from '../constants';

class Summary extends Component{

  
  componentDidUpdate() {
    this.scrollToRef('hugeh1');
  }

  scrollToRef( theRef ){
    const refElement = ReactDOM.findDOMNode(this.refs.theRef);
    window.scrollTo(0, refElement.offsetTop+50);
  }

    render() {

        return (
          <div>

          <SubHeader step={4} price={this.props.totalPrice} />

          <div className="container">

            
            <SelectedItemTopBar isFor="Hotel" />
            <HotelRow marginTop="no" cta={false} included={true} />

            
            <div>
              <SelectedItemTopBar isFor="Flight" flightType="Outbound" />
              <FlightRow marginTop="no" included={true} cta={false} flightType="outbound" flightData={flights[0]} />
            </div>
            
            <div>
              <SelectedItemTopBar isFor="Flight" flightType="Inbound" />
              <FlightRow marginTop="no" included={true} cta={false} flightType="inbound" flightData={flights[1]} />
            </div>

            <div>
              <SelectedItemTopBar isFor="Activity" />
              <ActivityRow marginTop="yes" included={true} cta={false} activityIndex={1} />
            </div>


            <div className="spacer" />
           
            <div className="summary-cta">
              <button className="btn btn-lg price-box__btn">Continue to pay</button>
              <div className="summary-info">
                <p><strong>Total</strong> </p>
                <span className="huge">$530</span> 
                
              </div>
            </div>

          </div>
          </div>
        );

    }
}

export default Summary;