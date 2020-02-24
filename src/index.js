import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';

import * as serviceWorker from './serviceWorker';

//class Plots extends React.Component{
//    render(){
//        const phenotype =this.props.phenotype;
//        return(
//            <>
//            <a href = {phenotype.manhattan}> manhattan plot </a>
//            <a href = {phenotype.manhattan}> manhattan plot </a>
//            </> 
 //       )
 //   }/
//}
//const PHENOTYPES=[
 //   {category: 'nmr',
 //    name:'nmr_acace', 
  //   tableloc:'/lustre/scratch119/humgen/projects/interval_wgs/analysis/hail_analysis/gwas/nmr_results/gwas_tables/INT-WGS-nmr_acace.tsv.bgz',
  //   manhattan:'/data/img/INT-WGS-nmr_acace-manhattan.html',
  //   qqplot:'/data/img/INT-WGS-nmr_acace-QQplot.html'},

//{category: 'nmr', 
//name:'nmr_ace', 
//tableloc:'/lustre/scratch119/humgen/projects/interval_wgs/analysis/hail_analysis/gwas/nmr_results/gwas_tables/INT-WGS-nmr_ace.tsv.bgz',
//manhattan:'/data/img/INT-WGS-nmr_ace-manhattan.html',
//qqplot:'/data/img/INT-WGS-nmr_ace-QQplot.html'}
//]

class PhenotypeRow extends React.Component{
    render(){
         
        const phenotype=this.props.phenotype;
        const name = phenotype.name;
        const id= phenotype.id;
        return (
            <>

            <tr>
                <td>{id}</td>
                <td> {name}</td>
                <td><a  href = {phenotype.manhattan} download> manhattan plot </a></td>
                <td><a href = {phenotype.qqplot}> qq plot </a></td>
            </tr>

          </>
        );
    }
}
class PhenotypeTable extends React.Component{
    render(){
        const filterText =this.props.filterText;
        const project = this.props.project;
        const rows = [];

        this.props.phenos.forEach( (phenotype) => {
            if(phenotype.project !== project){
                return;
            }
            if (phenotype.name.indexOf(filterText) === -1){
                return;
            }
            
                rows.push(
                    <PhenotypeRow phenotype={phenotype}
                    key={phenotype.id} />
                );
            }
        
        )

        return (
           <>
         
        <table class="table is-hoverable ">
            <thead>
                <tr>
                    <th>id</th>
                    <th>Phenotype</th>
                    <th> Manhattan Plot</th>
                    <th> QQ plot </th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
        </>
            );
}
}

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


  

class FilterablePhenotypeTable extends React.Component {
    constructor(props){
        super(props);

        this.state ={
            filterText: '',
            projectSelection: 'WGS',
            phenotypes:[],
        };
        axios.get('/data/data.json').then(
            res => {
                
                this.setState({phenotypes: res.data})
            }
        );
        this.handleFilterTextChange=this.handleFilterTextChange.bind(this);
        
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

<span class="tag is-primary is-light"> {this.state.projectSelection}</span>

     
   
     
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



ReactDOM.render(<FilterablePhenotypeTable  />, document.getElementById('container'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
