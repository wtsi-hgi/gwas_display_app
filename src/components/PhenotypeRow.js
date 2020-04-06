import React from "react";
import { Link } from "react-router-dom";
import VariantsPage from "./VariantsPage";

class PhenotypeRow extends React.Component{
    render(){
         
        const phenotype=this.props.phenotype;
        const name = phenotype.name;
        const id= phenotype.id;
        return (
            <>

            <tr>
                <td>  {id}</td>
                <td>   <Link to={"/variants/" + phenotype.name}> {name}</Link>   </td>
                <td><a  href = {phenotype.manhattan} download> manhattan plot </a></td>
                <td><a href = {phenotype.qqplot}> qq plot </a></td>
                
            </tr>

          </>
        );
    }
}

export default PhenotypeRow;

