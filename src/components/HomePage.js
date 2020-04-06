import React from "react";
import { Link } from "react-router-dom";
import FilterablePhenotypeTable from "./FilterablePhenotypeTable";

function HomePage() {
  return (
    <div className="jumbotron">
      {" "}
      {/* jumbotron is bootsrrap css class */}
      <h1> Interval GWAS results</h1>
      <p> Interval WGS and WES gwas results web app</p>
      {/* <a href="/about"> About </a> this calls back to the server */}
     {/*} <Link to="/wgs" className="btn btn-primary">
        WGS{" "}
      </Link>{" "}
      <Link to="/wes" className="btn btn-primary">
        WES{" "}
      </Link>{" "}
      <Link to="/variants" className="btn btn-primary">
        Variant Tables{" "}
      </Link>{" "}
  */}
      <FilterablePhenotypeTable />
      {/* this uses just client server routing */}
    </div>
  );
}








export default HomePage;
