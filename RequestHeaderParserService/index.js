require('dotenv').config();
const express = require('express');
const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(`${__dirname}/views/index.html`);
});

// API endpoint

app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get('/api/whoami', function(req, res) {
  let ipaddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || "";
  let language = req.headers['accept-language'];
  let software = req.headers['user-agent'];
  res.json({ ipaddress, language, software });
});

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`)
});
