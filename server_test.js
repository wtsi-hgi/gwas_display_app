const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const whitelist = require('./test_whitelist')
const db = require('./db');

let environment = process.env.NODE_ENV || 'development';
const config = require('./config')(environment)
console.log("Config" + JSON.stringify(config));
db.connect(config);

app.get('/ping', function (req, res) {
 return res.send('pong');
});


function checkUser(req, res, next){
  let user = req.header('cookie');
  console.log("User: " + user);
  if (whitelist.includes(user)){
    console.log("Authenticated User. Request Url: " + req.url);
    next();
    // res.sendFile(path.join(__dirname, 'build', 'index.html'));
} else {
    return res.send("Dear " + user + ", you to not have permission to access this application. Please seek authorization from Darth V.Iyer." )
}
    
}
// 





app.use(checkUser);
app.use('/gwas',express.static(path.join(__dirname, 'build')))

const router = require('./routes');
app.use('/gwas/api', router)

app.listen(process.env.PORT || 8080);