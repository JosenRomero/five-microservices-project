require('dotenv').config();
const dns = require('dns');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();
require('./database');
const URLShortener = require('./urlshortenerModel');

// Settings
app.set("port", process.env.PORT || 3000);

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(`${process.cwd()}/views/index.html`);
});

app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post('/api/shorturl', function(req, res) {

  try {

    let original_url = req.body.url;

    let url = new URL(original_url);

    dns.lookup(url.hostname, async (err, address, family) => {

      let short_url = Date.now().toString(36) + Math.random().toFixed(2).slice(2);

      const urlshortener = { original_url, short_url }

      const newValue = new URLShortener(urlshortener);

      await newValue.save();

      res.json(urlshortener);
  
    });

  } catch(err) {
    res.json({ error: 'invalid url' });
  }

});

app.get('/api/shorturl/:shortURL', async (req, res) => {

  try {

    const short_url = req.params.shortURL;

    const { original_url } = await URLShortener.findOne({ short_url });

    res.redirect(original_url);

  } catch(err) {
    res.status(404).send({ msgError: "URL not found" });
  }

});

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`)
});