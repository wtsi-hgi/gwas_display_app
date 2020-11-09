import React from "react";
import { Link } from "react-router-dom";
import PhenotypeRow from './PhenotypeRow';
import BootstrapTable from "react-bootstrap-table-next";

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import "bootstrap/dist/css/bootstrap.min.css";
class PhenotypeTable extends React.Component{
    render(){
       /* const columns = [
            {
              dataField: "id",
              text: "id",
              sort: true,
              filter: textFilter()
            },
            {
              dataField: "name",
              text: "Phenotype",
              sort: true,
              filter: textFilter()
            },
            {
              dataField: "manhattan",
              text: "Manhattan plot",
              sort: true,
            },
            {
                dataField: "qqplot",
                text: "QQ-plot",
                sort: true,
              },
        ] */
        // const filterText =this.props.filterText;
        // const project = this.props.project;
        const rows = [];

        this.props.phenos.forEach( (phenotype) => {
            
                rows.push(
                    <PhenotypeRow phenotype={phenotype}
                    key={phenotype.id} />
                );
            }
        
        )

        return (
           <>
         
        {/*  <BootstrapTable
          bootstrap4
          headerClasses="thead-dark"
          striped
          hover
          condensed
          keyField="p"
          data={this.props.phenos}
          columns={columns}
          filter={ filterFactory()}
        />
        */}

      
         


        <table className="table is-hoverable ">
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
export default PhenotypeTable;