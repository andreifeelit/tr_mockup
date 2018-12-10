import React, { Component } from 'react';

import { Link } from "react-router-dom";

import PriceBox from "../elements/PriceBox";
import Incrementer from "../elements/Incrementer";

export default class ActivityRow extends Component{

    constructor(props){
        super(props);

        this.state = {
            selected: false
        }

        this.onToggleSelected = this.onToggleSelected.bind(this);
    }

    onToggleSelected(){
        this.setState({
            selected: !this.state.selected
        });
    }

    render(){

        let activities = [
            {
                title: 'Beyonce at Apollo City',
                img: 'activity1.png',
                description: 'See the queen of R&B Live performing her latest album, Album X at the trendiest venue in town.'
            },
            {
                title: 'Eiffel Tower Tour',
                img: 'activity6.jpg',
                description: 'No matter how much you may want to avoid mainstream attractions, you have to see this. Act smart and get your ticket in advance now. Guides available in 12 languages.'
            },
            {
                title: 'PSG - Barcelona in CHL',
                img: 'activity7.jpg',
                description: 'This epic Champions League match will take place while you are in Paris. It is a sign! We still have tickets. Get one now and make your friends jealous.'
            },
            {
                title: 'Baby Justin Bieber',
                img: 'activity3.png',
                description: 'If you want to see Justin you can see him perform in a large shirt, a headset and some weird hair due.'
            },
            {
                title: 'Le Petit Casino',
                img: 'activity4.png',
                description: 'Feeling lucky? Everybody can win at this casino that guarantees fun at any time of day. The closest to Vegas you will ever feel in Paris.'
            },
            {
                title: 'Coldplay LIVE',
                img: 'activity2.png',
                description: 'See an electrifying concert with Chris Martin and band. Something you should not missout out on.'
            },
        ];

        let activityIndex = this.props.activityIndex || Math.floor( Math.random() * 4 );

        // console.log('activityIndex=', activityIndex);
        let activityImg = activities[activityIndex - 1].img;
        let marginTopClass = this.props.marginTop || 'margin-top-big';
        // console.log("ActivityRow margintopclass=", marginTopClass);

        let cta = typeof this.props.cta != 'undefined' ? this.props.cta : true;
        let ctaLink = '/summary';
        let ctaLabel = this.state.selected ? 'Remove this' : 'Add this';
        let selectedClass = this.state.selected ? 'row--selected' : '';

        let included = this.props.included || false;
        // console.log("CTA=",cta);

        return (
            <div> 
                <div className={`package-row hotel-row ${marginTopClass} ${selectedClass}`}>
                    <div className="col-sm-9 col-md-10 no-padding hotel-row--left">
                        <div className="hotel-row__image hotel-row__image--activity">
                            <img src={`/images/temp/${activities[activityIndex - 1].img}`} alt="banner" />
                        </div>

                        <div className="hotel-row__summary">
                           <h3 className="hotel-row__title">{activities[activityIndex - 1].title}</h3>
                           <div className="hotel-row__room-info">{activities[activityIndex - 1].description}</div>
                           <div className="hotel-row__link"><a>More info about event &raquo;</a></div>
                        </div>
                    </div>
                    <div className="col-sm-3 col-md-2 no-padding">
                        
                        <div className="price-box"> 
                            { 
                                !included ? 
                                    <div className="price__big reduced">
                                        + $89 <span className="price-note">/ person</span>
                                    </div>
                                    : 
                                    <div className="price__big reduced">Selected</div>
                            }

                            {/*
                            
                                { !included && <Incrementer /> }
                            
                            */}

                            <br />
                            {
                                cta && 
                                <div className="price-box__cta">
                                        <button onClick={this.onToggleSelected} className="btn price-box__btn">{ctaLabel}</button>
                                </div>
                            }
                            
                        </div>
                    </div>
                </div>
               
            </div>
        );
    }
}