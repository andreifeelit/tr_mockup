import React, { Component } from 'react';


const Modal = (props) => {

    let modalImg = `/images/temp/popup-${props.img || 'hotel'}-filters.png`;

    return (
        <div className="modal-container">
            <div className="modal">
                <span className="close-btn" onClick={props.onClose}>&times;</span>
                <img src="" />
            </div>
        </div>
    );

}

export default Modal;