import React from "react";
import axios from 'axios';
import SearchBar from './SearchBar';
import PhenotypeTable from './PhenotypeTable';
import Pagination from './Pagination';
// import DummyPhenos from '../dummyData' 

class FilterablePhenotypeTable extends React.Component {


  constructor(props){
        super(props);
        
        this.state = {
            filterText: '',
            projectSelection: 'WGS',
            allPhenotypes:[],
            currentPage: null,
            totalPages: null
        };

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.onPageChanged = this.onPageChanged.bind(this);
        this.pageLimit = 10
        
    }


   async componentDidMount(){
        const res = await axios.get('/gwas/api/phenotypes')
        console.log("Data Fetched From /gwas/api/phenotypes on FilterablePhenotypeTable Mount: " + JSON.stringify(res.data));
        this.setState({allPhenotypes: res.data.data})
    }

  handleFilterTextChange(filterText){

     this.setState({
        filterText:filterText
    });

  }

  onPageChanged = data => {
    const {filteredPhenotypes } = this.state;
    const { currentPage, totalPages} = data;
    
    this.setState({ currentPage, totalPages});
  }

  render(){

    const project = this.state.projectSelection
    const filterText = this.state.filterText
    const allPhenotypes = this.state.allPhenotypes

    let filteredPhenotypes = allPhenotypes.filter( (phenotype) => {
            if(phenotype.project !== project){
                return false;
            }
            if (phenotype.name.indexOf(filterText) === -1){
                return false;
            }
            
            return true;
          }  
    )

    if (filteredPhenotypes.length == 0){
       filteredPhenotypes = allPhenotypes
    }



    const currentPage = this.state.currentPage;
    const pageLimit = this.pageLimit
    const offset = (currentPage - 1) * pageLimit
    const currentPhenotypes = filteredPhenotypes.slice(offset, offset + pageLimit);
    console.log("FilterablePhenotyps: ", filteredPhenotypes)
    console.log("CurrentPhenotypes: ", currentPhenotypes)

    // const {filteredPhenotypes, currentPhenotypes, currentPage, totalPages } = this.state;
    const totalPhenotypes = filteredPhenotypes.length;
    if (totalPhenotypes === 0) return null;

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
        phenos = {currentPhenotypes} 
      />

      <div>
        <Pagination totalRecords={totalPhenotypes} pageLimit={this.pageLimit} pageNeighbours={1} onPageChanged={this.onPageChanged} />
      </div>
    </div>
        );
    }
}

export default FilterablePhenotypeTable;