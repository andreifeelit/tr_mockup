import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import { Route, withRouter } from 'react-router-dom';

class ScrollRoute extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.path === this.props.location.pathname && this.props.location.pathname !== prevProps.location.pathname) {
        
        let scrollPos = {
            hotel: 85,
            outbound: 454,
            inbound: 722,
            activity: 935,
            summary: 107
        };

        let scrollTo = 0; // fallback default to 0

        Object.keys(scrollPos).forEach( (key) => {
            if( this.props.location.pathname.includes(key) ){
               scrollTo = scrollPos[key]; 
            }
        });

        console.log("Scrolling to... ", scrollTo);
        window.scrollTo(0, scrollTo);
    }
  }

  render() {
    const { component: Component, ...rest } = this.props;

    
    if( this.props.hasOwnProperty('render') ){
        // special scenario where route is not passed a component but a render method.
        return <Route {...rest}  />;
    } else {
        // default behavior
        return <Route {...rest} render={props => (<Component {...props} />)} />;
    }
  }
}

export default withRouter(ScrollRoute);