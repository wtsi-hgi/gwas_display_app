

// This script can be used to convert a json to tsv. Please modify the source data. 

const fs = require('fs')
var data = require('./data.json')
let destination = './data.tsv'



let line = "";

for (var [key] of Object.entries(data[0])){
    line = line + key + '\t'
}

line = line + '\n'

fs.appendFile(destination, line, (err) => {
    if (err) throw err;
    console.log("Appended: ", line)
})


newData = data.splice(1)
console.log("Data", newData)

for (var row of newData){
    console.log("Row: " , row);

    let line = ""

    for (const [key, value] of Object.entries(row)){
        line = line + value + '\t'
    }
    line = line.slice(0, -1) // Remove last tab
    line = line + "\n"

    fs.appendFile(destination, line, (err) => {
    if (err) throw err;
    console.log("Appended: ", line)
})

}




