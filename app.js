require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser')
const request = require('request');
const path = require('path');

const app = express();

let PORT = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/signup.html');
})

app.post('/', (req, res) => {
    const { firstName, lastName, email } = req.body;
    if (!firstName || !lastName || !email) {
      res.redirect('/failure.html');
      return;
    }
})

const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  };

const jsonData = JSON.stringify(data);

const options = {
  url: 'https://us21.api.mailchimp.com/3.0/lists/bf148662cf',
  method: 'POST',
  headers: {
    Authorization: 'auth' + process.env.API_Key
  },
    body: postData
}

request(options, (err, response, body) => {
    if(err){
        res.redirect('/failure.html');
    } else {
        if(response.statusCode === 200){
            res.redirect('/success.html');
        } else {
            res.redirect('/failure.html');
        }
    }
})

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})