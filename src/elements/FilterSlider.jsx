import React from 'react';
import ReactDOM from 'react-dom';
import InputRange from 'react-input-range';

// import "react-input-range/lib/css/index.css";

const FilterSlider = (props) => {

    // let sliderType = this.props.sliderType || 'single';
    console.log("slider comp props: ", props);

    let range = { 
        min: props.options.minValue, 
        max: props.options.maxValue 
    };


    let filterTitle = props.options.titleName;

    let step = Math.ceil((range.max - range.min) / 100);
    
    console.log("slider construct range=", range);
    console.log("slider construct value=", props.options.value); 

    console.log("using a step of: ", step);

    return (
        <div className="filter">
            <div className="filter__header text-left">
                <div className="col-xs-8 no-padding">
                    <span className="filter__title">{filterTitle}</span>
                </div>
                <div className="col-xs-4 no-padding text-right">
                   
                </div>
            </div>
            <div className="filter__body">
                <InputRange
                    step={step}
                    minValue={range.min}
                    maxValue={range.max}
                    value={props.options.value}
                    onChange={ value => props.onChange( props.filterKey, value )} />
            </div>
        </div>
    );
  
}

export default FilterSlider;