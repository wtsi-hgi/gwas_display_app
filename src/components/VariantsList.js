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
      dataField: "AF",
      text: "AF",
      sort: true,
    },

    {
      dataField: "beta",
      text: "Beta",
      sort: true,
    },

    {
      dataField: "standard_error",
      text: "Standard error",
      sort: true,
    },

    {
      dataField: "p_value",
      text: "p ",
      sort: true,
    },
    {
      dataField: "AC",
      text: "AC",
      sort: true,
    },

    {
      dataField: "AN",
      text: "AN",
      sort: true,
    },


    {
      dataField: "n_HomRef",
      text: "n_HomRef",
      sort: true,
    },

    {
      dataField: "n_Het",
      text: "n_Het",
      sort: true,
    },

    {
      dataField: "n_HomAlt",
      text: "n_HomAlt",
      sort: true,
    },

     {
      dataField: "n_pheno",
      text: "n_pheno",
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
          condensed
          classes = "table-responsive w-auto"
          hover
          keyField="p"
          style="word-wrap: break-word;min-width: 160px;max-width: 160px;"
          data={props.variants}
          columns={columns}
          filter={ filterFactory()}
        />
      </div>
      {/* 
      <div className="table-container">
        <table class="table is-bordered  is-striped is-narrow is-hoverable is-fullwidth .table-responsive">
          <thead>
            <tr>
              <th>Locus</th>
              <th>rsID</th>
              <th>REF</th>
              <th>ALT</th>
              <th>AF</th>
              <th>beta</th>
              <th>Standard error</th>
              <th>p_value </th>
              <th>AC</th>
              <th>AN</th>
              <th>n_HomRef</th>
              <th>n_Het</th>
              <th>n_HomAlt </th>
              <th>n_pheno </th>
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
                  <td> {variant.AF} </td>
                  <td> {variant.beta} </td>
                  <td> {variant.standard_error } </td>
                  <td> {variant.p_value } </td>
                  <td> {variant.AC} </td>
                  <td> {variant.AN} </td>
                  <td> {variant.n_HomRef } </td>
                  <td> {variant.n_Het } </td>
                  <td> {variant.n_HomAlt} </td>
                  <td> {variant.n_pheno} </td>
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
