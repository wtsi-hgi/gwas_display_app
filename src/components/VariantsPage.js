import React, { useState, useEffect } from "react";
import VariantsList from "./VariantsList.js";
import { Link } from "react-router-dom";
import axios from 'axios';
// import datajson from "../data/variants_nmr.json";
// import datajson2 from "../data/test_variants.json";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";


let variantsjson;


//const variantsjson = JSON.parse(JSON.stringify(datajson));

function VariantsPage(props) {
  const [variants, setVariants] = useState([]);

  const slug = props.match.params.slug; //pulled from the path /variants/slug
 

  

  useEffect(async () => {
    // <Route path="/course/:slug" component={ManageCoursePage} />

    await axios.get('/api/variant/' + slug).then(res => {
        console.log("Response: " + JSON.stringify(res));
        variantsjson = res.data;
      }).catch (err => {console.log("Error fetching variant data: " + err);})

    if (slug) {
      const filtered_variants = variantsjson.filter(
        (variant) => variant.phenotype === slug
      );
      console.log("Filetered: " + filtered_variants);
      setVariants(filtered_variants);
    }
  }, [props.match.params.slug]); //dependency array to re run only when this changes.

  //useState(() => {
  //   setVariants(newArray);
  //  axios.get(JSON.parse(JSON.stringify( "/data/test_variants.json")))
  //api.getAllVariants()
  //  .then(res => {
  //  setVariants(res.data);
  // })
  // .catch(err => {});
  //}, []);


  return (
    <>
      <h2>Variants Table for {props.match.params.slug} </h2>
      <Link to={"/"}> Back </Link>
     
    <VariantsList variants={variants} /> 
    </>
  );
}

export default VariantsPage;
