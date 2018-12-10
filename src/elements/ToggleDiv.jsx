import React, {Component} from 'react';

class ToggleDiv extends Component {

    constructor(props){
        super(props);

        this.state ={
            flag: this.props.defaultFlag || false
        }

        this.toggleIt = this.toggleIt.bind(this);
    }

    toggleIt() {
        this.setState({
            flag: !this.state.flag
        });
    }

    render(){

        let option1Class = this.state.flag === false ? `toggle-switch__option--selected` : '';
        let option2Class = this.state.flag === true ? `toggle-switch__option--selected` : '';

        return (
            <div className="toggle-switch">
                <div onClick={this.toggleIt} className={`toggle-switch__option ${option1Class}`}>
                    {this.props.labels[0]}
                </div>
                <div onClick={this.toggleIt} className={`toggle-switch__option ${option2Class}`}>
                    {this.props.labels[1]}
                </div>
            </div>
        );
    }

}

export default ToggleDiv;