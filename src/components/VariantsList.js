import React from "react";
import PropTypes from "prop-types";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

function VariantsList(props) {
  const columns = [
    {
      dataField: "locus",
      text: "Locus",
      sort: true,
      filter: textFilter()
    },
    {
      dataField: "rsid",
      text: "rsID",
      sort: true,
      filter: textFilter()
    },
    {
      dataField: "REF",
      text: "REF",
      sort: true,
    },
    {
      dataField: "ALT",
      text: "ALT",
      sort: true,
    },
    {
      dataField: "n",
      text: "n",
      sort: true,
    },
    {
      dataField: "AF",
      text: "AF",
      sort: true,
    },
    {
      dataField: "beta",
      text: "beta",
      sort: true,
    },
    {
      dataField: "se",
      text: "standard error",
      sort: true,
    },
    {
      dataField: "p",
      text: "p-value",
      sort: true,
    },
    {
      dataField: "phenotype",
      text: "Phenotype",
    },
  ];

  return (
    <>
      <div className="Table">
        <BootstrapTable
          bootstrap4
          headerClasses="thead-dark"
          striped
          hover
          condensed
          keyField="p"
          data={props.variants}
          columns={columns}
          filter={ filterFactory()}
        />
      </div>
      {/* 
      <div className="table-container">
        <table class="table is-bordered  is-striped is-narrow is-hoverable is-fullwidth">
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
      */}
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
