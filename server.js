const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
// 

const whitelist = ['pa10']

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  let user = req.header('X-Forwarded-User');
  console.log(user)
  if (whitelist.includes(user)){
    app.use(express.static(path.join(__dirname, 'build')));
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
} else {
    return res.send(req.headers)
}

  
});

app.listen(process.env.PORT || 8080);