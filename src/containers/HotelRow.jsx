import React, { Component } from 'react';

import { Link } from "react-router-dom";

import PriceBox from "../elements/PriceBox";
import Incrementer from "../elements/Incrementer";

// import Lightbox from 'react-image-lightbox';
import LightboxWrapper from '../elements/LightboxWrapper';


export default class HotelRow extends Component{

    constructor(props){
        super(props);

        this.state = {
            detailsOpen: false,
            lightboxOpen: false,
        };

        this.onToggleDetails = this.onToggleDetails.bind(this);
    }

    onToggleDetails(){
        this.setState({
            detailsOpen: !this.state.detailsOpen
        })
    }

    render(){

        let hotelImg = this.props.image || `/images/temp/hotelimg.png`;
        let hotelStarsImg = `/images/temp/stars.png`;
        let tripadvisorImg = `/images/temp/tripadvisor.png`;
        let marginTopClass = this.props.marginTop || 'margin-top-big';
        // console.log("HotelRow margintopclass=", marginTopClass);

        let cta = typeof this.props.cta != 'undefined' ? this.props.cta : true;
        // console.log("CTA=",cta);

        const { photoIndex, lightboxOpen } = this.state;
        const included = this.props.included || (this.props.price === 0);

        let images = []; 


        if( this.props.hasOwnProperty('allImages') ){
            this.props.allImages.map( (hotelImage) => {
                images.push({
                    src: `https://${hotelImage.cdn}${hotelImage.url_medium}`,
                    title: hotelImage.title,
                    description: hotelImage.text
                }); 
            });
        }


        return (
            <div> 
                <div className={`package-row hotel-row ${marginTopClass}`}>
                    <div className="col-sm-9 col-md-10 no-padding hotel-row--left">
                        <div className="hotel-row__image">
                            <img src={hotelImg} alt="banner"  />
                            <span className="hotel-row__image--trigger" onClick={() => this.setState({ lightboxOpen: true })} /> 
                        </div>

                        <div className="hotel-row__summary">
                           <h3 className="hotel-row__title">{ this.props.title || 'B.W. Apollo Center Hotel' }</h3>
                           <div className="hotel-row__rating">
                           
                            <span className="stars">
                                {
                                    [1,2,3,4,5].map( (starIndex) => {
                                        let starClass = (starIndex <= this.props.rating) ? 'icon-star' : 'icon-star-empty';
                                        return <i key={starIndex} className={starClass}></i>;
                                    })
                                }
                            </span>
                           
                           
                           
                           </div>
                           <div className="hotel-row__room-info">
                                
                                Room | { this.props.hasOwnProperty('rooms') ? this.props.rooms[0]['room_type'] : 'Standard room'}
                            
                            </div>
                           <div className="hotel-row__tripadvisor"><img src={tripadvisorImg} /></div>
                           <div className="hotel-row__link"><a onClick={() => {this.setState({detailsOpen: !this.state.detailsOpen});}}>More info and room selection &raquo;</a></div>
                        </div>
                    </div>
                    <div className="col-sm-3 col-md-2 no-padding">
                        <PriceBox isHotel={true} cta={cta} price={this.props.price} onSelect={this.props.onSelect} notFixedPrice={true} included={included} />
                    </div>
                </div>
                {
                    this.state.detailsOpen && <HotelRowDetails onToggleDetails={this.onToggleDetails} {...this.props} />
                }
                { 
                    this.props.showSaveExtra 
                    ?  
                    <div className="hotel-row__below">
                            <i className="fas fa-exclamation-circle"></i>
                            <span className="bold">Save extra 10%</span> - We found cheaper packages at lose dates
                            <a href="javascript:void(0);" className="btn">More details</a>
                    </div>
                    : 
                    null
                }

                {
                    lightboxOpen && 
                    <LightboxWrapper 
                        images={images} 
                        onClose={() => this.setState({ lightboxOpen: false })} 
                    /> 
                }
            </div>
        );
    }
}

const HotelRowDetails = (props) => {

    let hotelfacilityImg = `/images/temp/hotel-facility-icons.png`;

    return (
        <div className="hotel-details">
            <span onClick={props.onToggleDetails} className="close-btn">&times;</span>
            <div className="hotel-details__description">
                <h3>About the hotel</h3>
                <p className="hotel-details__address">
                    <span className="bold">Address - </span> 
                    {props.address}, {props.zip}, {props.zone}, {props.city}, {props.country}
                </p>

                <p className="hotel-details__text">
                    {props.short_description}
                </p>

                <p className="hotel-details__facilities">
                    <img src={hotelfacilityImg} alt="facilities" />
                </p>
            </div>

            <div className="hotel-details__rooms">
                <h3>Choose a desired room</h3>
                
                {
                    props.rooms.map( (hotelRoom) => {
                        return <HotelRoomRow roomCount={hotelRoom.selected_quantity} {...hotelRoom} />;
                    })
                }

            {/*}
                <HotelRoomRow roomCount={1} included={true} />
                <HotelRoomRow />
                <HotelRoomRow />
                <HotelRoomRow />
                <HotelRoomRow />
            {*/}

                <div className="hotel-details__save-btn">
                    <Link to="/step/outbound">
                        <button className="btn">Select This</button>
                    </Link>
                </div>
                
            </div>
        </div>
    );
}

const HotelRoomRow = (props) => {

    let label = `+ $${ Math.ceil(Math.random()* 40) }`;

    if( props.included ){
        label = "Selected";
    }

    let roomCount = props.roomCount || 0;

    return (
        <div className="room-row">
            <div className="left">
                <div className="room-type">
                    <span>{props.room_type} <i className="fa fa-question-sign" /></span>
                </div>
                <div className="room-capacity">
                    2 &times; <i className="icon-user" />
                </div>
                <div className="room-details">
                    <ul>
                        <li>Breakfast included (sample)</li>
                    </ul>
                </div>
            </div>
            <div className="right">
                <span className="extra-cost-label">${props.room_price_night} / night</span>
                <Incrementer defaultValue={roomCount} />
            </div>
        </div>
    );

}
