

let axios = require('axios');
let fs = require('fs');
let config = require("./upload_config")

// require('axios-debug-log');
// fs.readFile(file)



function tsvToJSON(tsv){
 
  var lines=tsv.split("\n");
 
  var result = [];
 
  var headers=lines[0].split("\t");
 
  for(var i=1;i<lines.length;i++){
 
    var obj = {};
    var currentline=lines[i]
    if (!currentline.length){
      continue;
    }

    currentline = currentline.split("\t");
  
    
      
    for(var j=0;j<headers.length;j++){
      obj[headers[j]] = currentline[j];
    }
 
    result.push(obj);
 
  }
  
  //return result; //JavaScript object
  return JSON.stringify(result); //JSON
}


function getJSON(datatype, filepath){
    let jsonData;
    if (datatype == "variants"){
        let text = fs.readFileSync(filepath, "utf8");
        jsonData = JSON.parse(tsvToJSON(text));
    } else {
        jsonData = require(filepath);
    }
    return jsonData
}







// 






function sendUploadRequest(url, user, jsonData, datatype){


(async function () {
    let x = await axios({
     url: url + datatype,
     method: 'POST',
     data: jsonData,
     headers: {
        'Content-Type': "application/json",
        // "Authorization": authHeader,
        "X-Forwarded-User": user

     },
     'maxContentLength': Infinity,
     'maxBodyLength': Infinity
})
.then(response => {
            console.log(response)
            if (response.status == 200){
                // console.log("Upload successful" + JSON.stringify(response.data));
            } else {
                console.log("There was a problem. Upload failed" + response);
            }
        })
.catch((error) => {
            console.log("There was a problem. Upload failed." + error);
        })
})()

}




// let credentials =  config.user + ':' + config.password
// console.log("credentials ", credentials)
// let buff = new Buffer(credentials);
// let authHeader =  "Basic " + buff.toString('base64');
let jsonData = getJSON(config.datatype, config.path);
sendUploadRequest(config.url, config.user, jsonData, config.datatype)


