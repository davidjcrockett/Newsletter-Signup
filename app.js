const express = require('express');
const bodyParser = require('body-parser')
const request = require('request');

const app = express();

let PORT = 4000;

app.use(bodyParser.urlencoded({ extended: false }))

app.get("/", (req, res) => {
    res.send("Homepage")
})

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})