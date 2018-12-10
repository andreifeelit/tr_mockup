import React from 'react';
import { Link } from "react-router-dom";

const SelectedItemTopBar = (props) => {

    let type = props.isFor || 'Hotel';
    let flightType = props.flightType || 'Outbound';
  
    

    let leftText = type === 'Hotel' ? 'Hotel in Paris' : `${flightType} flight to Paris`;
    let updateLink = type === 'Hotel' ? '/step/hotel' : `/step/${flightType.toLowerCase()}`;
  
    if( type === 'Activity' ){
        leftText = 'Booked Activities';
        updateLink = '/step/activity';
    }

    return (
      <div className="item-top-bar">
        <div className="left">{leftText}</div>
        <div className="right">
          <Link to={updateLink}>
          
            <i className="icon-pencil"></i> edit
            
          </Link>
        </div>
      </div>
    );
  
}

export default SelectedItemTopBar;