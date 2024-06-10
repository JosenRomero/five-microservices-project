const express = require('express');
const app = express();

// Settings
app.set("port", process.env.PORT || 3000);

const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));

app.use(express.static('public'));

app.get("/", function(req, res) {
  console.log(__dirname)
  res.sendFile(`${__dirname}/views/index.html`);
})

// utils

// Return: A number representing the timestamp of the given date. If dateString fails to be parsed as a valid date, NaN is returned.
const dateToTimestamp = (dateString) => Date.parse(dateString)

// Return: A string representing the given date using the UTC time zone. Returns "Invalid Date" if the date is invalid.
const timestampToDate = (value) => new Date(value).toUTCString();

// API endpoints

app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date", function (req, res) {

  let result;
  let dateString = req.params.date;
  let timestamp = dateToTimestamp(dateString);

  let unix = timestamp;
  let utc = timestampToDate(timestamp);

  if(!timestamp) {
    unix = dateString;
    utc = timestampToDate(Number(dateString));
  }

  if(utc === "Invalid Date") result = { error : "Invalid Date" }
  else result = { unix, utc}

  res.json(result);
});

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`)
});
