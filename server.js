const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const whitelist = require('./whitelist')
// 


app.get('/ping', function (req, res) {
 return res.send('pong');
});


function checkUser(req, res, next){
  let user = req.header('X-Forwarded-User');
  console.log("User: " + user);
  if (whitelist.includes(user)){
    console.log("Authenticated User. Request Url: " + req.url);
    next();
    // res.sendFile(path.join(__dirname, 'build', 'index.html'));
} else {
    console.log("Unauthenticated User: " + req.headers);
    console.log("Request Url: " + req.url);
    return res.send(req.headers)
}
    
}

app.use(checkUser);
app.use('/gwas',express.static(path.join(__dirname, 'build')))

app.listen(process.env.PORT || 8080);