const express = require('express');
const bodyParser = require('body-parser')
const request = require('request');
const path = require('path');

require('dotenv').config()

const app = express();

const API_URL = process.env.API_URL
const API_Key = process.env.API_Key

let PORT = 4000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.render("Homepage")
})

app.post('/signup', (req, res) => {
    const {firstName, lastName, email } = req.body;
    if(!firstName || !lastName || !email) {
        res.redirect('/failure.html');
        return;
    }
})

const data = 

const options = {
    url: API_URL,
    method: 'POST',
    headers: {
        Authorization: API_Key
    },
    body: postData,
}

request(options, (err, response, body) => {

})

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})