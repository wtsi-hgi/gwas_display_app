import React from "react";
import PropTypes from "prop-types";

function VariantsList(props) {
  return (
    <>
     <div class="table-container"> 
      <table class="table is-bordered  is-striped is-narrow is-hoverable">
        <thead>
          <tr>
            <th>Locus</th>
            <th>rsID</th>
            <th>REF</th>
            <th>ALT</th>
            <th>n</th>
            <th>AF</th>
            <th>beta</th>
            <th>Standard error</th>
            <th>p</th>
            <th>Phenotype</th>
          </tr>
        </thead>
        <tbody>
          {props.variants.map((variant) => {
            return (
              <tr key={variant._id.$oid}>
                <td>{variant.locus}</td>
                <td>{variant.rsid} </td>
                <td> {variant.REF} </td>
                <td> {variant.ALT} </td>
                <td> {variant.n} </td>
                <td> {variant.AF} </td>
                <td> {variant.beta} </td>
                <td> {variant.se} </td>
                <td> {variant.p} </td>
                <td> {variant.phenotype} </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </>
  );
}

VariantsList.propTypes = {
  variants: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.object.isRequired,
      rsid: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default VariantsList;
