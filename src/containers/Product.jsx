import React, {Component} from 'react';
import { Link } from "react-router-dom";

import {withRouter} from 'react-router-dom';

import ScrollableAnchor, { configureAnchors, goToAnchor } from 'react-scrollable-anchor';

import 'react-dates/initialize';
import { DateRangePicker} from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import Incrementer from '../elements/Incrementer';
import ToggleDiv from '../elements/ToggleDiv';
import PaxDropdown from '../elements/PaxDropdown';

import PriceBox from "../elements/PriceBox";
import Lightbox from 'react-image-lightbox';


const images = [
    '/images/temp/hotel-rooms/1.jpg',
    '/images/temp/hotel-rooms/2.jpg',
    '/images/temp/hotel-rooms/3.jpg',
    '/images/temp/hotel-rooms/4.jpg'
  ];

configureAnchors({offset: -50, scrollDuration: 500});

const someimages = [
    '/images/temp/gallery/6.jpg',
    '/images/temp/gallery/1.jpg',
    '/images/temp/gallery/2.jpg',
    '/images/temp/gallery/3.jpg',
    '/images/temp/gallery/4.jpg',
    '/images/temp/gallery/5.jpg',
    '/images/temp/gallery/7.jpg',
];

const detailpanes = [
    {
        id: 1,
        title: 'About',
        detailComponent: 'DetailPaneAbout'
    },
    {
        id: 2,
        title: 'Nearby',
        detailComponent: 'DetailPaneNearby'
    },
    {
        id: 3,
        title: 'Opinion',
        detailComponent: 'DetailPaneOpinion'
    },
];

class Product extends Component{

    constructor(props) {
    
        super(props);

        this.state = {
            showingRooms: false,
            openedPane: 1,

            startDate: null,
            startDateId: "product-form-start-date",
            endDate: null,
            endDateId: "product-form-end-date",
            focusedInput: null,
            tooltipOffsetRight: 4.7,

            showPaxDrop: false
        }

        this.onBookClick = this.onBookClick.bind(this);
        this.onProductHotelClick = this.onProductHotelClick.bind(this);
        this.checkAvailabilityClick = this.checkAvailabilityClick.bind(this);
        this.barClick = this.barClick.bind(this);
        this.openPane = this.openPane.bind(this);
    }

    onBookClick(){
        if( this.state.showingRooms ){
            this.props.history.push("/step/outbound");
        } else {
            goToAnchor('check-availability-btn');
        }
    }

    onProductHotelClick() {
        this.props.history.push("/step/outbound");
    }

    checkAvailabilityClick() {
        if( this.state.showingRooms ) return; 

        this.setState({
            showingRooms: true
        });
        goToAnchor('bar-chart');
    }


    barClick( event ){

        let element = event.target;
        var dim = element.getBoundingClientRect();
        var x = event.clientX - dim.left;
        // var y = event.clientY - dim.top;

        if( x > 892 ){ 
            this.setState({
                tooltipOffsetRight: -3.1
            });
        } else {

            let n = Math.ceil( -(x - 892) / 40);

            let futureOffset = -3.1 + (n * 3.9);

            this.setState({
                tooltipOffsetRight: futureOffset
            });

        }
    }

    openPane( paneId, force = false ) {

        if( paneId == this.state.openedPane && !force ){
            // if we toggle the already opened pane then all will be closed
            this.setState({
                openedPane: 0
            });
        } else {
            this.setState({
                openedPane: paneId
            });

            let paneSelected = detailpanes.find( (pane) => pane.id == paneId);
            if( paneSelected ){
                let paneAnchor = `pane-${paneSelected.title}`;
                console.log("scrolling to pane with anchor=", paneAnchor);
                goToAnchor(paneAnchor);
            }
        }

    }


    render() {

        let tooltipOffsetStyle = {
            right: `${this.state.tooltipOffsetRight}rem`
        };

        return (
        <div className="product-page">
        <div className="container">
            <h1 className="huge">Four Seasons Resort Koh Samui</h1>
            <p className="subH1">
            Motu Tehotu, Bora Bora, French Polynesia
                <span className="stars">
                    <i className="icon-star"></i>
                    <i className="icon-star"></i>
                    <i className="icon-star"></i>
                    <i className="icon-star"></i>
                    <i className="icon-star-empty"></i>
                </span>
            </p>
        
        </div>

        <div className="product-menu">
            <div className="container">
                <ul>
                    <li onClick={ () => {
                        if( this.state.showingRooms ){
                            goToAnchor('list-of-rooms');
                        } else {
                            goToAnchor('check-availability-btn');
                        }
                    }}>Rooms and availability</li>
                    <li onClick={() => this.openPane(1, true)}>About Us &amp; Hotel Facilities</li>
                    <li onClick={() => this.openPane(2, true)}>Nearby</li>
                    <li onClick={() => this.openPane(3, true)}>Opinion</li>
                </ul>
            </div>
        </div>

        <div className="container no-padding product-under-menu">
            <div className="col-sm-8 no-padding">
                <div className="gray-label">Team recommendation</div>
                <div className="gray-label">Most popular</div>
            </div>
            <div className="col-sm-4 no-padding text-right">
                <div className="product__price">
                    <span className="price-from">from</span>
                    <span className="price-value">$850</span>
                </div>

                <div className="price-cta">
                    <button onClick={this.onBookClick} className="btn">Book</button>
                </div>  
            </div>
        </div>

        <div className="container no-padding">
            <Gallery />
        </div>

        
        <div className="container no-padding product-form-container">
            <div className="destination-area">
                <input type="text" name="destination" placeholder="Paris, France" />
            </div> 
            <div className="dates-area">
                <div className="dates-area__datepicker">
                    <DateRangePicker
                        startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                        startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                        endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                        endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                        onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                        focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                        onFocusChange={focusedInput => this.setState({ focusedInput })}
                        
                        noBorder={true}
                        displayFormat="DD/MM/YY"
                        customArrowIcon="-"
                        hideKeyboardShortcutsPanel={true}
                        customInputIcon={<i className="icon-calendar-empty calendar-icon"></i>}
                        
                        />
                </div>
                <div className="dates-area__duration">
                    <Incrementer counterDisplayType="days" defaultValue={7} />
                </div>
            </div>
            <div className="pax-area">
                <input type="text" name="pax" placeholder="Passengers" onClick={()=>{this.setState({showPaxDrop:!this.state.showPaxDrop})}} />
                {
                    this.state.showPaxDrop && <PaxDropdown onClose={() => this.setState({showPaxDrop: false})} />
                }
            </div>

            <div className="hotel-switch-area">
                <ToggleDiv labels={['Hotel + Flight', 'Hotel only']} />
                {/*}
                <div className="hotel-switch">
                    <div className="hotel-switch__option hotel-switch__option--selected">
                        Hotel + Flight
                    </div>
                    <div className="hotel-switch__option">
                        Hotel only
                    </div>
                </div>
                {*/}
            </div>

            <div className="cta-area">
                <button 
                    id="check-availability-btn"
                    onClick={this.checkAvailabilityClick} 
                    className="home-form__submit">Check availability</button>
            </div>


            
        </div>

        {
            this.state.showingRooms &&
            <div id="bar-chart" className="container no-padding product-bar-chart-container">
                <div className="product-bar-chart-header">
                    <div className="col-sm-10 text-left">
                        <p><strong>Price Review</strong>
                        <br />
                        The prices shown are the starting prices
                        </p>
                    </div>
                    <div className="col-sm-2 text-right">
                        <ToggleDiv labels={['monthly', 'daily']} />
                    </div>
                </div>
                <div className="product-bar-chart-only" onClick={this.barClick}>
                    <img style={tooltipOffsetStyle} className="product-bar-chart-tooltip" src="/images/temp/product-page-bar-chart-tooltip.png" alt="temp" />
                </div>
            </div>
        }

        {
            this.state.showingRooms && 
            <div className="container no-padding" id="list-of-rooms">
                <ProductHotelRow onSelect={this.onProductHotelClick} />
                <ProductHotelRow onSelect={this.onProductHotelClick} />
                <ProductHotelRow onSelect={this.onProductHotelClick} />
                <ProductHotelRow onSelect={this.onProductHotelClick} />
            </div>
        }

            <div className="container no-padding">
                {
                    detailpanes.map( (dpane) => <DetailPane open={ this.state.openedPane == dpane.id } key={dpane.id} onSelect={() => this.openPane(dpane.id) } {...dpane} /> )
                }
            </div>
            
        

        </div>
        );
    }

}

class ProductHotelRow extends Component{

    constructor(props){
        super(props);

        this.state = {
            detailsOpen: false,
            photoIndex: 0,
            lightboxOpen: false,
        };

       
    }

    

    render(){

        let hotelImg = this.props.image || `/images/temp/hotelimg.png`;
        // let hotelStarsImg = `/images/temp/stars.png`;
        // let tripadvisorImg = `/images/temp/tripadvisor.png`;
        let marginTopClass = this.props.marginTop || 'margin-top-big';
        // console.log("HotelRow margintopclass=", marginTopClass);

        let cta = typeof this.props.cta != 'undefined' ? this.props.cta : true;
        // console.log("CTA=",cta);

        const { photoIndex, lightboxOpen } = this.state;
        // const included = this.props.included || (this.props.price === 0);


        return (
            <div className="product-hotel-row-wrapper"> 
                <div className={`package-row hotel-row ${marginTopClass}`}>
                    <div className="col-sm-8 col-md-9 no-padding hotel-row--left">
                        <div className="hotel-row__image">
                            <img src={hotelImg} alt="banner"  />
                            <span className="hotel-row__image--trigger" onClick={() => this.setState({ lightboxOpen: true })} /> 
                        </div>

                        <div className="hotel-row__summary">
                           <h3 className="hotel-row__title">{ this.props.title || 'Superior Room (Garden Wing)' }</h3>
                           <div className="hotel-row__room-info">
                                Double / twin beds <br />
                                Suitable for 2 adults <br />
                                No cancellation fee
                            </div>
                            <div className="hotel-row__room-info--tiny">
                            Nam metus dolor, laoreet sit amet ipsum sed, dapibus luctus dui. Nullam scelerisque aliquet tellus. Vestibulum molestie imperdiet tristique.
                            </div>
                           <div className="hotel-row__link"><a href="javascript:void(0);">Learn more &raquo;</a></div>
                        </div>
                    </div>
                    <div className="col-sm-4 col-md-3 no-padding">
                        <PriceBox 
                            isHotel={true} 
                            cta={cta} 
                            price={500} 
                            tinyText={`Price per vacation, hotel+flight. For 2 people in a double room`}
                            ctaLabel={`Continue to select a flight`}
                            onSelect={this.props.onSelect} 
                            included={false} />
                    </div>
                </div>
               

                {lightboxOpen && (
                    <Lightbox
                      mainSrc={images[photoIndex]}
                      nextSrc={images[(photoIndex + 1) % images.length]}
                      prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                      onCloseRequest={() => this.setState({ lightboxOpen: false })}
                      onMovePrevRequest={() =>
                        this.setState({
                          photoIndex: (photoIndex + images.length - 1) % images.length,
                        })
                      }
                      onMoveNextRequest={() =>
                        this.setState({
                          photoIndex: (photoIndex + 1) % images.length,
                        })
                      }
                    />
                  )}
            </div>
        );
    }
}


class Gallery extends Component {
    constructor(props){
        super(props);

        this.state = {
            images: someimages,
            selected: 0
        }
    }

    onThumbClick( img ){
        this.setState( {
            selected: this.state.images.indexOf(img)
        });
    }

    render() {

        return <div className="gallery">
            <div className="gallery__main">
                <img src={ this.state.images[ this.state.selected ]} alt="" />
            
                <div className="gallery__overlay gallery__overlay--rating">
                
                </div>

                <div className="gallery__overlay gallery__overlay--facilities">
                
                </div>
            </div>

            <div className="gallery__thumbs">
            
                {
                    this.state.images
                        .filter( (img, index) => img != this.state.images[ this.state.selected ] )
                        .map( (fImg, index) => <GalleryThumb key={index} img={fImg} onClick={ () => this.onThumbClick(fImg)} />)
                }

            </div>
        </div>;
    }
}

const GalleryThumb = (props) => {

    return (
        <div onClick={props.onClick} className="gallery__thumb">
            <img src={props.img} alt="thumb" />
        </div>
    )
}


const DetailPaneAbout = (props) => {
    return (
        <div>
            <h4>General Knowledge</h4>
            <p>
            Amari Koh Samui has health facilities like a gym. Having a spa here will be just what you need. Among the services offered here, the hotel offers help services booking tickets for performances and tours and quick cacaoat. This hotel offers a dry cleaning service, babysitting service and more. Pool umbrellas are part of Amari Koh Samui. A beach bar makes the place ideal for water lovers and swimming. You can choose to dine at one of 2 restaurants. Come here without a car? A paid shuttle service from the airport will help you move around. Here you can choose one from 197. You read a lot about parking when you plan your trip; Here you can make use of free parking. Number of pools instead of accommodations.
            </p>

            <h4>Room information</h4>
            <p>
            You can not control the weather outside, but thanks to the air conditioning in the rooms here, it will be pleasant inside. This accommodation does not offer rooms where you can smoke. A private bathroom is a welcome addition in a bathroom instead of this accommodation. You can only find a shower in the bathrooms instead of hosting it. The insurer here includes a coffee and tea kit. This hotel offers rooms with useful facilities such as a minibar. As part of the services here you can make use of a hairdryer. Whether you are using social networks, having news or checking emails: Free WIFI wireless internet is available to all guests here.Inplace of hosting this is more convenient with premium beds.Children beds and free crib is a convenient service to be found here.
            </p>

            <hr className="white-line" />

            <p>
                <img src="/images/temp/facility-icons-with-detail.png" alt="facilities" />
            </p>
        </div>
    );
}

const DetailPaneNearby = (props) => {
    return (
        <div>

            <h4>Nice to know</h4>
            <p>
            Amari Koh Samui is a short drive from Chaweng Lake. From here, Samui Crocodile Farm can be reached easily. Chaweng Thai Boxing Stadium is a nearby stadium.
            </p>
            
            <p>
            7 minutes walk to Chaweng Beach
            <br />18 minutes walk from Samui Crocodile Farm
            <br />29 minutes walk to Bang Rak Beach
            <br />29 minutes walk to Tesco Lotus Koh Samui
            <br />33 minutes walk from Samui Football Gol
            </p>
        </div>
    );
}

const DetailPaneOpinion = (props) => {
    return (
        <div>
            <h4>Popular opinions</h4>
            <p> 
            The following text is very random and is most likely the same as some paragraph from another pane. 
            </p>
            <p>
            You can not control the weather outside, but thanks to the air conditioning in the rooms here, it will be pleasant inside. This accommodation does not offer rooms where you can smoke. A private bathroom is a welcome addition in a bathroom instead of this accommodation. You can only find a shower in the bathrooms instead of hosting it. The insurer here includes a coffee and tea kit. This hotel offers rooms with useful facilities such as a minibar. As part of the services here you can make use of a hairdryer. Whether you are using social networks, having news or checking emails: Free WIFI wireless internet is available to all guests here.Inplace of hosting this is more convenient with premium beds.Children beds and free crib is a convenient service to be found here.
            </p>
        </div>
    );
}



const DetailPane = (props) => {

    //let DetailComponent = props.detailComponent;
    let openClass = props.open ? 'pane--open' : 'pane--closed';

    // console.log("detail component is=", DetailComponent);

    const renderDetails = ( detComp ) => {
        switch( detComp ){
            case 'DetailPaneAbout': return <DetailPaneAbout />;
            case 'DetailPaneNearby': return <DetailPaneNearby />;
            case 'DetailPaneOpinion': return <DetailPaneOpinion />;
            default: return null;
        }
        return null;
    }

    return (
        
            <ScrollableAnchor id={`pane-${props.title}`}>
            <div className={`pane ${openClass}`}>
                <div className={`pane-header`} onClick={props.onSelect}>
                    <span className="pane-icon"></span>
                    <span className="pane-title">{props.title}</span>
                </div>

                <div className="pane-text">
                   { renderDetails( props.detailComponent ) }
                </div>
            </div>
            </ScrollableAnchor> 
    );

}


export default withRouter(Product);