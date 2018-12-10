import React, {Component} from 'react';

import FilterList from '../elements/FilterList';
import FilterSlider from '../elements/FilterSlider';




class FilterGroup extends Component{ 

    constructor(props){
        super(props);


        let filterSections = [];

        if (this.props.entity == 'hotels'){
            filterSections = this.fixHotelFiltersData( this.props.filters );
        } else {
            // parse and prepare flights sections

            console.log("filter group received flight filters:", this.props.filters);

            filterSections = this.fixFlightFiltersData( this.props.filters );

            console.log("filter group AFTER FIXING incoming filters:", filterSections);
        }
       
        this.state = {
            filters: {
               ...filterSections
            }
        }

        
        this.fixHotelFiltersData = this.fixHotelFiltersData.bind(this);

        this.updateFilterList = this.updateFilterList.bind(this);
        this.updateFilterSlider = this.updateFilterSlider.bind(this);

        this.renderFiltersHotels = this.renderFiltersHotels.bind(this);
        this.renderFiltersFlights = this.renderFiltersFlights.bind(this);

        this.applyFilters = this.applyFilters.bind(this);
    }

    applyFilters() {

        // save filters in redux state

        // make api call with wrapped data.

        // close popup

    }

    fixFlightFiltersData( incomingFilters, flightType = 'outbound' ){

        let filterSections = {
            time_takeoff: null,
            time_landing: null,
            airline: null,
            stops: null,
            time_flight: null,
            price: null
        }

        // takeoff time
        filterSections['time_takeoff'] = {
            titleName: "Takeoff time",
            type: "slider",
            minValue: +incomingFilters.filters.hours[flightType].takeoff_min,
            maxValue: +incomingFilters.filters.hours[flightType].takeoff_max,
            value: {
                min: +incomingFilters.filters.hours[flightType].takeoff_min,
                max: +incomingFilters.filters.hours[flightType].takeoff_max
            }
        }
        // landing time
        filterSections['time_landing'] = {
            titleName: "Landing",
            type: "slider",
            minValue: +incomingFilters.filters.hours[flightType].landing_min,
            maxValue: +incomingFilters.filters.hours[flightType].landing_max,
            value: {
                min: +incomingFilters.filters.hours[flightType].landing_min,
                max: +incomingFilters.filters.hours[flightType].landing_max
            }
        }
        // airline
        let iteratedObj = incomingFilters.filters.companies[flightType];
        filterSections['airline'] = {
            titleName: "Airline",
            type: "checkbox_collection",
            propertyPath: null,
            elements: []
        }
        Object.keys(iteratedObj).map( (airlineCode) => {
            filterSections['airline'].elements.push({
                name: iteratedObj[airlineCode].name,
                value: false,
                propertyValue: airlineCode,
                length: `$${iteratedObj[airlineCode].total_per_pax}`
            });
        } );

        // stops
        filterSections['stops'] = {
            titleName: "Stops",
            type: "checkbox_collection",
            propertyPath: null,
            elements: []
        }
        let stopOptionLabels = {
            nonStop: "Direct flights, no stops",
            oneStop: "One stop",
            twoMoreStops: "Two stops or more"
        }
        Object.keys(incomingFilters.filters.stops).map( (stopOption) => {
            if( incomingFilters.filters.stops[stopOption].enable ){
                filterSections['stops'].elements.push({
                    name: stopOptionLabels[stopOption],
                    value: false,
                    propertyValue: stopOption
                });
            }
        });

        // flight time
        filterSections['time_flight'] = {
            titleName: "Flight time",
            type: "slider",
            minValue: +incomingFilters.filters.duration.min,
            maxValue: +incomingFilters.filters.duration.max,
            value: {
                min: +incomingFilters.filters.duration.min,
                max: +incomingFilters.filters.duration.max
            }
        }

        // price
        filterSections['price'] = {
            titleName: "Price",
            type: "slider",
            minValue: +incomingFilters.filters.price.min,
            maxValue: +incomingFilters.filters.price.max,
            value: {
                min: +incomingFilters.filters.price.min,
                max: +incomingFilters.filters.price.max
            }
        }
        
        return filterSections;


    }

    fixHotelFiltersData( incomingFilters ){

        let filterSections = {
            rating: null,
            name: null,
            services: null,
            room_board: null,
            price: null
        };

        console.log('Filterhotels constructor:', this.props);

        incomingFilters.map( (filterSection) => {
           
            let tempElements = [];

            if( filterSection.propertyPath === 'name' ){
                // build elements list
                
                filterSection.autocomplete_list.map( (hotelName) => {
                    tempElements = [
                        ...tempElements,
                        {
                            name: hotelName,
                            value: false, 
                            propertyValue: hotelName,
                            length: null
                        }
                    ];
                });
                filterSections.name = {
                    ...filterSection,
                    elements: tempElements
                }


            }

            if( filterSection.propertyPath === 'rating' ){

                Object.keys(filterSection.length).map( (noOfStars) =>{

                    
                    let starsHtml = (
                        <span className="stars">
                        {[...Array(--noOfStars)].map((e, i) => <i className="icon-star" key={i}></i>)}    
                        <i className="icon-star"></i> 
                        </span>
                    );
                    
                    if( filterSection.length[noOfStars] > 0 ){
                        // include only options that have actual results
                        tempElements = [
                            ...tempElements,
                            {
                                name: starsHtml,
                                value: false,
                                propertyValue: noOfStars,
                                length: filterSection.length[noOfStars]
                            }
                        ];
                    }
                } );

                filterSections.rating = {
                    ...filterSection,
                    elements: tempElements
                }
            }

            if( filterSection.propertyPath === 'facilities' ){
                filterSections.services = {
                    ...filterSection
                }
            }

            if( filterSection.propertyPath === 'room_board' ){
                filterSections.room_board = {
                    ...filterSection
                }
            }

            if( filterSection.propertyPath === 'et_price.price_ttc_room_all_night' ){
                filterSections.price = {
                    ...filterSection
                }
            }

        });

        console.log('FIXED hotel sections=', filterSections);
        return filterSections;
    }



    updateFilterList( filterKey, index ){
        // updating state of filter in main container
        console.log("UPDATING FILTER: ", filterKey);
        console.log("element index:", index);
        
        console.log("current state:", this.state.filters[filterKey]['elements']);
        let currentFilter = this.state.filters[filterKey];

        currentFilter['elements'][index]['value'] = !currentFilter['elements'][index]['value'];
        
        this.setState({
            filters: {
                ...this.state.filters,
                [filterKey]: currentFilter
            }
        });



        console.log("New elements state:", this.state.filters[filterKey].elements);

    }

    updateFilterSlider( filterKey, value ){


        console.log("UPDATING FILTER (slider): ", filterKey);

        console.log("current state:", this.state.filters[filterKey]['value']);

        let currentFilter = this.state.filters[filterKey];

        currentFilter['value'] = value;

        this.setState({
            filters: {
                ...this.state.filters,
                [filterKey]: currentFilter
            }
        });

        console.log("New element state:", this.state.filters[filterKey]['value'] );

    }



    renderFiltersHotels(){

        const renderFilterComp = (filterKey) => {

            // temporary comparison with propertyPath. Will use filter unique keys (identifiers) in the near future.
            if( this.state.filters[filterKey].propertyPath === 'et_price.price_ttc_room_all_night'){
                return <FilterSlider 
                            onChange={this.updateFilterSlider}
                            filterKey={filterKey}
                            options={this.state.filters[filterKey]}
                        />
            } else {
                return <FilterList 
                        onChange={this.updateFilterList} 
                        filterKey={filterKey} 
                        options={this.state.filters[filterKey]} />;
            }

        }

        return (
                <div className="filters__main">
                    <div className="col-sm-3">
                        <div className="filter-wrapper f-rating-hotel">
                            {renderFilterComp('rating')}
                        </div>
                        <div className="filter-wrapper f-accomodation-hotel">
                            
                        </div>
                        <div className="filter-wrapper f-price-hotel">
                            {renderFilterComp('price')}
                        </div>
                        
                    </div>
                    <div className="col-sm-3">
                        <div className="filter-wrapper f-name-hotel">
                            {renderFilterComp('name')}
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="filter-wrapper f-services-hotel">
                            {renderFilterComp('services')}
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="filter-wrapper f-room-board-hotel">
                            {renderFilterComp('room_board')}
                        </div>
                    </div>
                </div>
        );
    }

    renderFiltersFlights(){

        const renderFilterComp = (filterKey) => {

            if( this.state.filters[filterKey].type === 'slider'){
                return <FilterSlider 
                            onChange={this.updateFilterSlider}
                            filterKey={filterKey}
                            options={this.state.filters[filterKey]}
                        />
            } else {
                return <FilterList 
                        onChange={this.updateFilterList} 
                        filterKey={filterKey} 
                        options={this.state.filters[filterKey]} />;
            }

        }

        return (
                <div className="filters__main">
                    <div className="col-sm-3">
                        <div className="filter-wrapper f-time_takeoff-flight">
                            {renderFilterComp('time_takeoff')}
                        </div>
                        <br />
                        <div className="filter-wrapper f-time_landing-flight">
                            {renderFilterComp('time_landing')}
                        </div>
                        
                    </div>
                    <div className="col-sm-3">
                        <div className="filter-wrapper f-airline-flight">
                            {renderFilterComp('airline')}
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="filter-wrapper f-stops-flight">
                            {renderFilterComp('stops')}
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="filter-wrapper f-time_flight-flight">
                            {renderFilterComp('time_flight')}
                        </div>
                        <br />
                        <div className="filter-wrapper f-price-flight">
                            {renderFilterComp('price')}
                        </div>
                    </div>
                </div>
        );
    }




    render() {
        
        return (
            <div className="filters">
                <div className="filters__header">
                    <span className="pull-right">close</span>
                    <h2>Filter {this.props.entity} by</h2>
                    
                </div>
                { 
                    this.props.entity == 'flights' ? 
                        this.renderFiltersFlights()
                        :
                        this.renderFiltersHotels()
                }
                <div className="filters__footer text-right">
                    <button className="btn">Apply filters</button>
                </div>
            </div>
        );
    }
}

export default FilterGroup;