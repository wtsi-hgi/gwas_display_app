import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class SearchBar extends React.Component{
    constructor(props){
        super(props);
        this.handleFilterTextChange =this.handleFilterTextChange.bind(this);
    }

    handleFilterTextChange(e){
        this.props.onFilterTextChange(e.target.value);
    }

    render(){
        const filterText = this.props.filterText;
        return (
<form>
    <p>
    <input className="input is-info"
    type="text"
    placeholder="Search phenotypes" 
    value={filterText}
    onChange={this.handleFilterTextChange}
    />
    </p>
</form>
        );
    }
}

export default SearchBar;
