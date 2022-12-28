const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const request = require("request");
const dotenv = require('dotenv');

const app = express();

dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3002;

app.post("/signup", (req, res) => {
  let email = req.body.email;

  const data = {
    members:[{
      email_address: email,
      status: "subscribed",
    }]
  }

  const jsonData= JSON.stringify(data);

  const subscribeURL = `https://us21.api.mailchimp.com/3.0/lists/bf148662cf`;

  const options = {
    url: subscribeURL,
    method:'POST',
    headers: {
      Authorization: `auth ${process.env.API_Key}`
    },
    body: jsonData
  }

    request(options, (err, response, body) => {
        if (err) {
           return res.redirect('/failure.html')
        }

        if(response.statusCode === 200){
            console.log("true")
            res.redirect("/success.html");
        } else{
            console.log("false")
            res.redirect("/failure.html");
        }
        console.log(jsonData)

    });

});

app.get('/success', (req, res) => {
  res.sendFile(__dirname + "/success.html")
})

app.get('/failure', (req, res) => {
  res.sendFile(__dirname + "/failure.html")
})

app.post("/failure",function(req,res){
   res.redirect("/");
})

app.listen(PORT, console.log(`Server started on ${PORT}`));
