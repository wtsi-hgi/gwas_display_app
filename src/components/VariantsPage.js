import React, { useState, useEffect } from "react";
import VariantsList from "./VariantsList.js";
import { Link } from "react-router-dom";
import axios from "axios";

import datajson from "../data/variants_nmr.json";
let variantsjson=JSON.parse(JSON.stringify(datajson));


function VariantsPage(props) {
  const [variants, setVariants] = useState(0);

  //useEffect(() => {
  //  axios.get(JSON.parse(JSON.stringify( "/data/test_variants.json")))
    //api.getAllVariants()
    //  .then(res => {
      //  setVariants(res.data);
     // })
     // .catch(err => {});
  //}, []);

  return (
    <>
      <h2>Variants Table</h2>
      <Link className="btn btn-primary" to="/variant">
        Add Variant{" "}
      </Link>
      <VariantsList variants={variants} />
    </>
  );
}

export default VariantsPage;
