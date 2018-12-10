import React from 'react';
import { Link } from "react-router-dom";

const StepIndicator = (props) => {

    let stepAttributes = {
        '1': {
            'content': '1',
            'extraClass': ''
        },
        '2': {
            'content': '2',
            'extraClass': ''
        },
        '3': {
            'content': '3',
            'extraClass': ''
        },
        '4': {
            'content': '4',
            'extraClass': ''
        }
    };

    let selectedStep = typeof props.selectedStep != 'undefined' ? props.selectedStep : 1;

    stepAttributes[`${selectedStep}`]['extraClass'] = 'step--selected';
    for( let i=1; i < selectedStep; i++ ){
        stepAttributes[`${i}`]['content'] = 'checkmark';
        stepAttributes[`${i}`]['extraClass'] = 'step--completed';
    }

    return (
        <div className="steps-container">
            <div className={`step ${stepAttributes['1']['extraClass']}`}>
                <div className="step__number">{
                    stepAttributes['1']['content'] == 'checkmark' ? 
                    <i className="icon-ok"></i>
                    :
                    1
                }</div>
                <div className="step__label">
                    <Link to="/step/hotel">
                        <h5>Choose hotel</h5>
                        <p>in Paris</p>
                    </Link>
                </div>
            </div>

            <div className={`step ${stepAttributes['2']['extraClass']}`}>
                <div className="step__number">{
                    stepAttributes['2']['content'] == 'checkmark' ? 
                    <i className="icon-ok"></i>
                    :
                    2
                }</div>
                
                {
                    stepAttributes['2']['extraClass'] == 'step--completed' ? 
                    <div className="step__label">
                        <Link to="/step/outbound">
                            <h5>Choose flight</h5>
                            <p>TelAviv - Paris | roundtrip</p>
                        </Link>
                    </div>
                    :
                    <div className="step__label">
                            <h5>Choose flight</h5>
                            <p>TelAviv - Paris | roundtrip</p>
                    </div>
                }
            </div>

            <div className={`step ${stepAttributes['3']['extraClass']}`}>
                <div className="step__number">
                    {
                    stepAttributes['3']['content'] == 'checkmark' ? 
                        <i className="icon-ok"></i>
                    :
                        3
                    }
                </div>
                {
                    stepAttributes['3']['extraClass'] == 'step--completed' ? 
                        <Link to="/step/activity">
                            <div className="step__label">
                                <h5>Select activities</h5>
                                <p>fun things to do</p>                    
                            </div>
                        </Link>
                        : 
                        <div className="step__label">
                            <h5>Select activities</h5>
                            <p>fun things to do</p>                    
                        </div>
                }
                
            </div>

            <div className={`step ${stepAttributes['4']['extraClass']}`}>
                <div className="step__number">{
                    stepAttributes['4']['content'] == 'checkmark' ? 
                    <i className="icon-ok"></i>
                    :
                    4
                }</div>
                <div className="step__label">
                    <h5>Order summary</h5>
                    <p>review your items</p>
                </div>
            </div>
        </div>
    );

}

export default StepIndicator;