import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { Link } from "react-router-dom";

import Sticky from 'react-stickynode';
import StickyFooter from 'react-sticky-footer';

import HotelRow from './HotelRow';
import FlightRow from './FlightRow';
import ActivityRow from './ActivityRow';
import SelectedItemTopBar from "../elements/SelectedItemTopBar";

import SubHeader from "../elements/SubHeader";
import ShowMore from "../elements/ShowMore";

import {flights} from '../constants';


class SelectActivity extends Component{
  
  componentDidUpdate() {
    const hugeh1 = ReactDOM.findDOMNode(this.refs.hugeh1);
    window.scrollTo(0, hugeh1.offsetTop);
  }
  
    render() {

        return (
          <div>

          <SubHeader step={3} price={this.props.totalPrice} />

          <div className="container">

            
            <SelectedItemTopBar isFor="Hotel" />
            <HotelRow marginTop="no" cta={false} price={0} />

            
            <div>
              <SelectedItemTopBar isFor="Flight" flightType="Outbound" />
              <FlightRow marginTop="no" included={true} cta={false} flightType="outbound" flightData={flights[0]} />
            </div>
            
            <div>
              <SelectedItemTopBar isFor="Flight" flightType="Inbound" />
              <FlightRow marginTop="no" included={true} cta={false} flightType="inbound" flightData={flights[1]}  />
            </div>


            <div className="spacer" />
            <h1 ref="hugeh1" className="huge text-center">Enhance your stay with experiences</h1>
            {/* <p className="subH1 text-center">a second line with more text and even a <a href="">link to nowhere</a></p> */}
  
            <ActivityRow activityIndex={2} />
            <ActivityRow activityIndex={1} />
            <ActivityRow activityIndex={3} />
            <ActivityRow activityIndex={4} />
            <ActivityRow activityIndex={5} />


            <ShowMore />
            
            <div className="spacer" />
            

           
            

            <div className="hotel-details__save-btn">
                <Link to="/summary">    
                    <button className="btn">Continue to summary</button>
                </Link>
            </div>

            
          </div>

          <StickyFooter
              bottomThreshold={750}
              normalStyles={{
                display: 'none'
              }}
              stickyStyles={{
                width: '100%',
                padding: "0"
              }}
          >
            
            <div className="activity-sticky">
              <div className="container">
              <div className="summary-cta">
                <Link to="/summary">
                  <button className="btn btn-lg price-box__btn">Continue to summary</button>
                </Link>
                <div className="summary-info">
                  <p><strong>Total</strong> </p>
                  <span className="huge">$530</span> 
                  
                </div>
              </div>
              </div>
            </div>
          </StickyFooter>
          
          </div>
        );

    }
}

export default SelectActivity;