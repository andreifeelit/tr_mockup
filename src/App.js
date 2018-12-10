import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import ScrollToTop from 'react-scroll-up';
import ScrollRoute from './elements/ScrollRoute';

import Header from './containers/Header';
import Home from './containers/Home';
import Product from './containers/Product';
import SelectPackage from './containers/SelectPackage';
import SelectFlight from './containers/SelectFlight';
import SelectHotel from './containers/SelectHotel';
import SelectActivity from './containers/SelectActivity';
import Summary from './containers/Summary';
import Footer from './containers/Footer';

import {flights} from './constants';

import './App.css';
import 'react-image-lightbox/style.css'; 

import rawJson from './berlin-raw.json';


class App extends Component {

  constructor(props){
    super(props);



    this.state = {
      totalPrice: 0,
      selectedHotel: null,
      selectedOutbound: null,
      selectedInbound: null, 
      rawJson: null
    }

    this.updateTotal = this.updateTotal.bind(this);
    this.selectFlight = this.selectFlight.bind(this);

    
  }

  componentWillMount() {

    if( this.state.rawJson === null ){

      let rawJsonData = rawJson[2]["testData"];

      this.setState({
        rawJson: rawJsonData
      });
    }

  }

  

  updateTotal( priceDiff, reset = false) {
    
    let newPriceTotal = reset ? priceDiff : this.state.totalPrice + priceDiff;

    this.setState({
      totalPrice:  newPriceTotal,
    });

    if( reset ){ 
      this.setState({
        selectedOutbound: null,
        selectedInbound: null
      });
    }
  }

  selectFlight( type, id ){

    let flight = flights.filter( (item) => item.id == id )[0];

    if( type == 'outbound' ){
      this.setState({selectedOutbound: id});
    } else {
      this.setState({selectedInbound: id});
    }

    this.updateTotal(flight.price);

  }

  render() {
    return (
      <Router>
      <div>
          <Header />

          <Route exact path="/" render={ () => <Home updateTotal={this.updateTotal} {...this.state} />} />
          
          <ScrollRoute path="/step/packages" render={ (props) => <SelectPackage {...props} updateTotal={this.updateTotal} {...this.state}  />} />
          <ScrollRoute path="/step/hotel-detail" render={ (props) => <Product {...props} updateTotal={this.updateTotal} {...this.state}  />} />
          <ScrollRoute path="/step/hotel" render={ (props) => <SelectHotel {...props} updateTotal={this.updateTotal} {...this.state}  />} />
          
          
          <ScrollRoute path="/step/outbound" exact render={ (props) => <SelectFlight {...props} onSelectFlight={this.selectFlight} {...this.state} />} />
          <ScrollRoute path="/step/inbound" exact render={ (props) => <SelectFlight {...props} onSelectFlight={this.selectFlight} {...this.state} />} />
          <ScrollRoute path="/step/activity" exact render={ (props) => <SelectActivity {...props} {...this.state} /> } />
          
          <ScrollRoute path="/summary" exact render={ () => <Summary {...this.state} />} />

          <ScrollToTop showUnder={160}>
            <span className="scroll-to-top"><i className="icon-angle-up"></i></span>
          </ScrollToTop>
          <Footer />
      </div>
      </Router>
    );
  }
}

export default App;
