import React, { Component } from 'react';

class Incrementer extends Component {
    constructor(props){
        super(props);

        let startValue = this.props.defaultValue || 0;

        this.state = {
            value: startValue
        }
        
    } 
    
    render(){
        let counterDisplayType = this.props.counterDisplayType || 'input';
        
        return (
            <div className={`incrementer incrementer--${counterDisplayType}`}>
                <div className="incrementer__control">
                    <button onClick={ () => {
                        let newValue = this.state.value - 1;
                        newValue = newValue < 0 ? 0 : newValue;
                        this.setState({
                            value: newValue
                        });
                    }} className="incrementer_control--minus">-</button>
                </div>
                <div className="incrementer__value">
                {
                    counterDisplayType == 'input' ? 
                        <input type="text" readOnly value={this.state.value} />
                    
                    : (
                        counterDisplayType == 'days' ? 
                        (
                            <span className="incrementer__value--days">{this.state.value} Days</span>
                        )
                        : null
                    )
                }
                    </div>
                <div className="incrementer__control">
                    <button onClick={() => {this.setState({value: ++this.state.value})}}  
                    className="incrementer_control--plus">+</button>
                </div>
            </div>
        );
    }
}

export default Incrementer;

