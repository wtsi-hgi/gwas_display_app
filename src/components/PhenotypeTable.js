import React from "react";
import { Link } from "react-router-dom";

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
export default PhenotypeTable;