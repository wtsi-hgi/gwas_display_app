import React from "react";
import axios from 'axios';
import SearchBar from './SearchBar';
import PhenotypeTable from './PhenotypeTable';

class FilterablePhenotypeTable extends React.Component {


  constructor(props){
        super(props);
        
        this.state = {
            filterText: '',
            projectSelection: 'WGS',
            phenotypes:[],
        };

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        
    }


   async componentDidMount(){
        const res = await axios.get('/gwas/api/phenotypes')
        console.log("Data Fetched From /gwas/api/phenotypes on FilterablePhenotypeTable Mount: " + JSON.stringify(res.data));
        this.setState({phenotypes: res.data.data})

    }

  handleFilterTextChange(filterText){
    this.setState({
        filterText:filterText
    });
  }

  render(){
    return (
      <div className="box">

      <section className="hero is-primary">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">
              GWAS results
            </h1>
            <h2 className="subtitle">
              Interval WGS and WES projects
            </h2>
          </div>
        </div>
      </section>

      <div className="box">
      <div className="buttons">
        <button id="WGSbutton" className="button is-rounded is-link" onClick={ () => this.setState({ projectSelection: 'WGS'})} >WGS -  Whole Genome</button>
        <button id="WESbutton" className="button is-rounded is-warning" onClick={ () => this.setState({ projectSelection: 'WES'})  } >WES - Whole Exome</button>
      </div>
      </div>

      <span className="tag is-primary is-light"> {this.state.projectSelection}</span>
   
     
      <SearchBar 
          filterText={this.state.filterText}
            onFilterTextChange= {this.handleFilterTextChange}
        />
      <PhenotypeTable 
        phenos = {this.state.phenotypes} 
        project={this.state.projectSelection}
        filterText = {this.state.filterText}
      />
  
    </div>
        );
    }
}

export default FilterablePhenotypeTable;