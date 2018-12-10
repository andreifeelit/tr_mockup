import React, {Component} from 'react';
import { Link } from "react-router-dom";

import 'react-dates/initialize';
import { DateRangePicker, SingleDatePicker, DayPickerRangeController } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

import PaxDropdown from '../elements/PaxDropdown';
import ShowMore from '../elements/ShowMore';

const offers = [
    {
        location: 'Paris',
        wide: true,
        title: 'A romantic vacation in Paris',
        subtitle: 'April',
        price: 1250
    },
    {
        location: 'Sydney',
        wide: false,
        title: 'Sydney vacation',
        subtitle: '',
        price: 2100
    },
    {
        location: 'London',
        wide: false,
        title: 'Shopping in London',
        subtitle: '',
        price: 780
    },
    {
        location: 'New-York',
        wide: false,
        title: 'New York vacation',
        subtitle: '',
        price: 1890
    },
    {
        location: 'Venice',
        wide: false,
        title: 'Family vacation in Venice',
        subtitle: '',
        price: 655
    },
    {
        location: 'Rome',
        wide: false,
        title: 'Romantic weekend in Rome',
        subtitle: '',
        price: 510
    }
];

const homeicons = [
    {
        id: 1,
        title: 'Support and service',
        text: 'Online customer service is available for you every day and every hour'
    },
    {
        id: 2,
        title: 'Convenient and fast',
        text: 'Convenient and quick interface for closing the corners On vacation and all with complete transparency'
    },
    {
        id: 3,
        title: 'Financial services',
        text: 'We promise the lowest price Do not believe? Learn more'
    },
    {
        id: 4,
        title: 'Selection of options',
        text: 'Over 100,000 flights and more There are a total of 30,000 hotels to choose from'
    }
];

class Home extends Component{

    constructor(props) {
    
        super(props);

        this.state = {
            showRooms: false
        }
    }

    render() {

        return (
            <div>

                <div className="home-hero">
                    <div className="home-hero__form container">
                        <h1 className="huge text-center">Your vacation starts here</h1>
                        <HomeForm />
                        
                    </div>
                </div>


                <div className="container">

                    <h1 className="huge text-center">Our vacation packages</h1>

                    <div className="home-circles">
                        <HomeCircleLink title="Most Popular" active={true} />
                        <HomeCircleLink title="Multi Packages" />
                        <HomeCircleLink title="Sports Packages" />
                        <HomeCircleLink title="Music Packages" />
                        <HomeCircleLink title="Summer Packages" />
                        <HomeCircleLink title="Shopping Packages" />
                    </div>



                    <div className="home-offer-row">
                        <HomeOffer {...offers[0]} />
                    </div>

                    <div className="home-offer-row">
                        <HomeOffer {...offers[1]} />
                        <HomeOffer {...offers[2]} />
                        <HomeOffer {...offers[3]} />
                    </div>

                    <div className="home-offer-row">
                        <HomeOffer {...offers[4]} />
                        <HomeOffer {...offers[5]} />
                    </div>


                    <ShowMore />


                    <div className="home-icons">

                    {
                        homeicons.map( (homeicon) => <HomeIcon key={homeicon.id} {...homeicon} />)
                    }

                    </div>
                </div>
            </div>
        );

    }
}


const HomeOffer = (props) => {

    let wideClass = props.wide === true ? 'home-offer--wide' : '';

    let styleBg = {
        backgroundImage: `url(/images/temp/home/${props.location.toLowerCase()}.jpg)`
    }

    return (
        <div style={styleBg} className={`home-offer home-offer--${props.location} ${wideClass}`}>
            <div className="home-offer__details ">
                <div className="home-offer__cta">
                <Link to="/step/hotel-detail">
                    <button className="btn">Book</button>
                </Link>
                </div>    
                <div className="home-offer__title">
                    {props.title} 
                    {
                        props.subtitle && 
                        <span className="home-offer__subtitle"><br />{props.subtitle}</span>
                    }
                    
                </div>
                <br />
                <div className="home-offer__price">
                    <span className="price-from">from</span>
                    <span className="price-value">${props.price}</span>
                </div>

                
            </div>
        </div>
    )

}

const HomeCircleLink = (props) => {

    let activeClass = props.active ? 'home-circle--active' : '';

    return (
        <div className="home-circle-container">
        <div className={`home-circle ${activeClass}`}>
            <div className="home-circle__content">
                {props.title}
            </div>
            {
                props.active && 
                <i className="triangle-down" />
            }
        </div>
            
        </div>
    )

}

const HomeIcon = (props) => {

    
    return (
        <div className={`home-icon`}>
            <div className="home-icon__image">
                <img src={`/images/temp/home/home-icon-${props.id}.png`} alt="icon" />
            </div>
            <div className="home-icon__title">
                {props.title}
            </div>
            <div className="home-icon__text">
                {props.text}
            </div>
        </div>
    )
}


class HomeForm extends Component {
    constructor(props){
        super(props);

        this.state = {
            date: null,
            focused: false,
            showPaxDrop: false
        };
    }

    render() {
        return (
            <div className="home-form">

                <div className="pax-area">
                    <div className="has-float-label">
                        <input id="pax" type="text" placeholder="2 Passengers, 1 Room" onClick={()=>{this.setState({showPaxDrop:!this.state.showPaxDrop})}}/>
                        <label htmlFor="pax">Passengers</label>
                    </div>
                    {
                       this.state.showPaxDrop && <PaxDropdown onClose={() => this.setState({showPaxDrop: false})} />
                    }
                </div>

                <div className="date-area">
                <SingleDatePicker
                    date={this.state.date} // momentPropTypes.momentObj or null
                    onDateChange={date => this.setState({ date })} // PropTypes.func.isRequired
                    focused={this.state.focused} // PropTypes.bool
                    onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                    noBorder={true}
                    hideKeyboardShortcutsPanel={true}
                    customInputIcon={<i className="icon-calendar-empty calendar-icon"></i>}
                    placeholder="Departure date"
                    id="home-form-input-date" // PropTypes.string.isRequired,
                    />
                </div>

                <div className="city-area destination-area">
                    <div className="has-float-label">
                        <input id="destination" type="text" placeholder="Paris, Berlin"/>
                        <label htmlFor="destination">Destination</label>
                    </div>
                </div>

                <div className="city-area departure-area">
                    <div className="has-float-label">
                        <input id="departure" type="text" placeholder="Tel-Aviv (TLV)"/>
                        <label htmlFor="departure">From</label>
                    </div>
                </div>

                <div className="cta-area">
                    <Link to="/step/packages">
                        <button className="home-form__submit">Go</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Home;