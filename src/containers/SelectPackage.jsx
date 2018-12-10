import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {withRouter} from 'react-router-dom';

import PackageRow from './PackageRow';


import {packages as packPrices} from '../constants';


class SelectPackage extends Component{

    constructor(props){
      super(props);

      this.onPackageSelection = this.onPackageSelection.bind(this);
    }

    onPackageSelection( priceSelected ){

      this.props.updateTotal( priceSelected, true );
      this.props.history.push("/step/hotel");
    }

    render() {

        return (
            <div className="container">

            <h1 className="huge text-center">Our suggested packages</h1>
            <p className="subH1 text-center">you can select a pre made package or <Link to="/step/hotel">build your own package</Link></p>
  
            {
              packPrices.map( (packPrice) => <PackageRow onSelect={this.onPackageSelection} key={packPrice.id} {...packPrice} /> )
            }
            
  
            <div className="build-custom-package">
              <h2 className="col-xs-9">
                You couldn't find the package youre looking for? Build your own!
              </h2>
              <div className="col-xs-3">
                <Link className="btn" to="/step/hotel">Build Package</Link> 
              </div>
            </div>
          </div>
        );

    }
}

export default withRouter(SelectPackage);