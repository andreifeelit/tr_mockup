import React from 'react';

import Incrementer from './Incrementer';

const PaxDropdown = (props) => {


    return (
        <div className="pax-drop">
            <i className="triangle-up" />
            <div className="pax-drop__row">
                <div className="col-xs-6 pax-drop__label">
                    <strong>Rooms</strong>
                </div>
                <div className="col-xs-6 pax-drop__counter">
                    <Incrementer defaultValue={1} />
                </div>
            </div>

            <div className="pax-drop__row">
                <div className="col-xs-6 pax-drop__label">
                    <strong>Passengers</strong>
                </div>
            </div>


            <div className="pax-drop__row">
                <div className="col-xs-6 pax-drop__label">
                    Adults (18+)
                </div>
                <div className="col-xs-6 pax-drop__counter">
                    <Incrementer defaultValue={1} />
                </div>
            </div>
            <div className="pax-drop__row">
                <div className="col-xs-6 pax-drop__label">
                    Seniors (65+)
                </div>
                <div className="col-xs-6 pax-drop__counter">
                    <Incrementer defaultValue={0} />
                </div>
            </div>
            <div className="pax-drop__row">
                <div className="col-xs-6 pax-drop__label">
                    Children (2-12)
                </div>
                <div className="col-xs-6 pax-drop__counter">
                    <Incrementer defaultValue={0} />
                </div>
            </div>

            <div className="pax-drop__row">
                <div className="col-xs-6 pax-drop__label">
                    Infants (0-2)
                </div>
                <div className="col-xs-6 pax-drop__counter">
                    <Incrementer defaultValue={0} />
                </div>
            </div>

            <div className="pax-drop__row">
                <div class="text-center pax-drop__close-btn">
                    <button onClick={props.onClose}>Close</button>
                </div>
            </div>
            
        </div>
    )
}

export default PaxDropdown;