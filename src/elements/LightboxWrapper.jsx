import React, { Component } from 'react';

import Lightbox from 'react-image-lightbox';


class LightboxWrapper extends Component {


    constructor(props){
        super(props);

        this.state = {
            photoIndex: 0
        }

    }

    render(){

        let {images} = this.props;

        let {photoIndex} = this.state;

        let nodeImageTitle = <h3 className="lightbox-title">{images[photoIndex]['title']}</h3>;
        let nodeImageDescription = <span>{images[photoIndex]['description']}</span>;

        return <Lightbox
            mainSrc={images[photoIndex]['src']}
            
            imageTitle={nodeImageTitle}
            imageCaption={nodeImageDescription}
            
            nextSrc={images[(photoIndex + 1) % images.length]['src']}
            prevSrc={images[(photoIndex + images.length - 1) % images.length]['src']}
            onCloseRequest={this.props.onClose}
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
        />;
    }
}

export default LightboxWrapper;