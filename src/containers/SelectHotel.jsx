import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import Sticky from 'react-stickynode';

import {withRouter} from 'react-router-dom';

import HotelRow from "./HotelRow";
import SubHeader from "../elements/SubHeader";
import ShowMore from "../elements/ShowMore";

import FilterGroup from "./FilterGroup";

import hotels_all from '../geneva-hotels';



class SelectHotel extends Component{

  constructor(props) {
    super(props);

    this.onSelect = this.onSelect.bind(this);

    let jsonStepDetails = this.props.rawJson["steps"]["step_0"];
    let cdnUrl = this.props.rawJson['img_cdn_static'];
    
    let hotels = [];
    // jsonStepDetails['hotels']['list'].map( (jsonHotel) => {
    hotels_all['hotels'].map( (jsonHotel) => {

      if( !jsonHotel.hasOwnProperty('default_img') ){
        console.log('BAD LIST ITEM=', jsonHotel);
        return null;
      } 

      let tempHotel = {
        visible: true,

        rawData: jsonHotel,
        id: jsonHotel.id,
        title: jsonHotel.name,
        rating: jsonHotel.rating,
        address: jsonHotel.address,
        zip: jsonHotel.zip,
        zone: jsonHotel.zone,
        city: jsonHotel.cityName,
        country: jsonHotel.countryName,
        short_description: jsonHotel.short_description,
        cdn: cdnUrl,
        image: `https://${jsonHotel['default_img']['cdn']}/${jsonHotel['default_img']['url_medium']}`,
        allImages: jsonHotel.img,
        price: jsonHotel.hotel_price,
        price_currency: jsonHotel.hotel_price_currency,
        rooms: jsonHotel['room_types']['selected']
      };

      hotels.push(tempHotel);

    });

    console.log('rawjson=', jsonStepDetails);

    this.hotels = hotels;


    let idObjFilters = hotels_all['filters']['sections'].map( (filterOptions, index) => {
      return {
        id: `f_${index}`,
        ...filterOptions
      }
    });

    this.filters = hotels_all['filters']['sections'];

    console.log(this.filters);



    this.handleFilter = this.handleFilter.bind(this);
    this.filterItems = this.filterItems.bind(this);
    this.getTargetPropertyPath = this.getTargetPropertyPath.bind(this);


  }

  handleFilter() {

    this.filters.forEach( (filterOptions) => {

      if( filterOptions['type'] === 'checkbox_collection' ){

          // apply this filter
          this.filterItems( this.hotels, filterOptions);
      }

    });


  }

  filterItems( items, filterOptions) {

    let {propertyPath} = filterOptions;
    
    return items.map( (item) => {
      
    });

  }

  getTargetPropertyPath( item, propertyPath ){

    let attributeDepth = propertyPath.split('.');
    let target = item;
    for( let i = 0; i < attributeDepth.length; i++ ){
      target = target[ attributeDepth[i] ];
    }

    return target;

  }


  onSelect( price ){
    this.props.updateTotal( price );
    this.props.history.push("/step/outbound");
  }

    render() {

        return (
          <div>

          <SubHeader step={1} price={this.props.totalPrice} />


          <div className="container">

            
            <h1 ref="hugeh1" className="huge text-center">Choose your hotel in Paris</h1>
            <p className="subH1 text-center"><Link to="/step/inbound">continue without a hotel</Link></p>
  
            <hr />

            <FilterGroup filters={this.filters} entity="hotels" />


            <hr />
            {
              this.hotels.map( (hotel) => <HotelRow key={hotel.id} onSelect={this.onSelect} {...hotel} /> )
            }

            {/* }
            <HotelRow price={0}    onSelect={this.onSelect} />
            <HotelRow price={76}   onSelect={this.onSelect} />
            <HotelRow price={142}  onSelect={this.onSelect} showSaveExtra={true} />
            <HotelRow price={109}  onSelect={this.onSelect}/>
            <HotelRow price={212}  onSelect={this.onSelect} showSaveExtra={true} />
            {*/}

            <ShowMore />

          </div>
          </div>
        );

    }
}

export default withRouter(SelectHotel);