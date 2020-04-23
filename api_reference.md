/{basename}/data/data.json
/{basename}/variants/{phenotype.name}

--------
Route GET api/phenotypes

Queries Phenotypes Collection

queryParams = {
    criteria: phenotype,
    value: 
}

phenotypes = gwasdb.phenotypes.find(queryParams) 

res.send({data: phenotypes})




-----


Route: GET api/variants/:slug

Queries Variants Collection:

queryParams = {
    phenotype: req.params.slug
}

return gwasdb.variants.find({queryParams})




-----
Route:  data/img/INT-WGS-nmr_mldlce-QQplot.html

Statically gets the file from the public folder.

----


Route: api/upload/variants. File: mr_wgs_p5e-8_24-03-2020.txt 

93003 documents
Populates "Variant Collection"

{"_id":{"$oid":"5e82f07436c252cd2a4d5b3b"},
"locus":"chr1:180588474",
"rsid":"rs116336539",
"REF":"G",
"ALT":"T",
"n":11381,
"AF":0.00084296,
"beta":-1.2632,
"se":0.22942,
"p":3.751E-08,
"phenotype":"nmr_ala"}

-----
231 document(s)

Route: api/upload/phenotypes. File: data.json 


Populates "Phenotype" Collection

{"id": 1, 
"project": "WGS", 
"category": "nmr", 
"name": "nmr_mldlce", 
"qqplot": "data/img/INT-WGS-nmr_mldlce-QQplot.html", 
"manhattan": "data/img/INT-WGS-nmr_mldlce-manhattan.html"}



----

To do:
- Change BrowserHistory to HashHistory
- 