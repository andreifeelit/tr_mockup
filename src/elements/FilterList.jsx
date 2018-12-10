import React, {Component} from 'react';

class FilterList extends Component {

    constructor(props){
        super(props);






        this.handleMarkAll = this.handleMarkAll.bind(this);
        this.handleSearch = this.handleSearch.bind(this);

    }

    handleMarkAll(){
        // mark them
    }

    handleSearch(){
        // filter the filter options.(filter inception)
        
    }

    render() {

        let filterTitle = this.props.options.titleName;
        let markAllLabel = 'Mark All';
        let hasAutocomplete = false;
        

        let elements = this.props.options.elements;

        return (
            <div className="filter">
                <div className="filter__header text-left">
                    <div className="col-xs-8 no-padding">
                        <span className="filter__title">{filterTitle}</span>
                    </div>
                    <div className="col-xs-4 no-padding text-right">
                        <a className="filter__markall" onClick={this.handleMarkAll}>{markAllLabel}</a>
                    </div>
                </div>

                <div className="filter__body">
                    {
                        hasAutocomplete && 
                        <input type="text" onChange={this.handleSearch} className="filter__search" />
                    }

                    <div className="filter__list scroll-styled">
                        {
                            elements.map( (filterItem, index) => {

                                let labelLength = (filterItem.length) ? ` (${filterItem.length})` : '';
                                let tempId = `${filterTitle}_${filterItem.propertyValue}`;

                                return (
                                    <div className="filter__row checkbox" key={tempId}>
                                        <input type="checkbox" id={tempId} className="filter__cb" 
                                            defaultChecked={filterItem.value}
                                            onChange={() => { this.props.onChange(this.props.filterKey, index)}} />
                                        <label htmlFor={tempId} className="filter__label">{filterItem.name}{labelLength}</label>
                                    </div>
                                );

                            })
                        }
                    </div>
                </div>
            </div>
        );
    
    }
}

export default FilterList;