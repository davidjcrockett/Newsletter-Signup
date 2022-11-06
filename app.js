const express = require('express');
const bodyParser = require('body-parser')
const request = require('request');
const path = require('path');

const app = express();

let PORT = 4000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.render("Homepage")
})

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})