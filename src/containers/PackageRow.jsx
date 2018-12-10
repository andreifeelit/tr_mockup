import React, { Component } from 'react';

import PriceBox from "../elements/PriceBox";

export default class PackageRow extends Component{

    constructor(props){
        super(props);

    }

    render(){

        let bannerUrl = `/images/banners/rbanner${Math.floor(Math.random()*5)+1}.jpg`;

        return (
            <div> 
                <div className="package-row__above">
                    
                    <h5>Standard Package</h5> <h3>Package to Paris</h3>
                </div>
                <div className="package-row">
                    <div className="col-sm-9 col-md-10 no-padding">
                        <div className="package-row__banner">
                            <img src={bannerUrl} alt="banner" />
                        </div>

                        <div className="package-row__items">

                            <PackageRowFlights />
                            <PackageRowHotel />
                            
                            { Math.random() > 0.4 ? <PackageRowCar /> : null } 
                        
                            { Math.random() > 0.6 ? <PackageRowActivity /> : null } 

                        </div>
                    </div>
                    <div className="col-sm-3 col-md-2 no-padding">
                        <PriceBox price={this.props.price} onSelect={this.props.onSelect} />
                    </div>
                </div>
            </div>
        );
    }

}


const PackageRowFlights = (props) => {

    let tempImg = `/images/temp/rpkg-item-flights.jpg`;

    return (
        <div className="package-row__item package-row__item--flights">
            <img src={tempImg} className="tempfleximg" />
        </div>
    );
}

const PackageRowHotel = (props) => {

    let tempImg = `/images/temp/rpkg-item-hotel.jpg`;

    return (
        <div className="package-row__item package-row__item--hotel">
            <img src={tempImg} className="tempfleximg" />
        </div>
    );
}

const PackageRowCar = (props) => {

    let tempImg = `/images/temp/rpkg-item-car.jpg`;

    return (
        <div className="package-row__item package-row__item--car">
            <img src={tempImg} className="tempfleximg" />
        </div>
    );
}

const PackageRowActivity = (props) => {

    let tempImg = `/images/temp/rpkg-item-activity.jpg`;

    return (
        <div className="package-row__item package-row__item--activity">
            <img src={tempImg} className="tempfleximg" />
        </div>
    );
}


