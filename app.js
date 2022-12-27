const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');

const app = express();

dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3002;

app.post('/signup', (req, res) => {
  const { firstName, lastName, email } = req.body;

  if (!firstName || !lastName || !email) {
    res.redirect('/failure.html');
    return;
  }

  const data = {
    members: [
      {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const postData = JSON.stringify(data);

  fetch(`https://us21.api.mailchimp.com/3.0/lists/bf148662cf`, {
    method: 'POST',
    headers: {
      Authorization: `auth ${process.env.API_Key}`
    },
    body: postData
  })
    .then(res.statusCode === 200 ?
      res.redirect('/success.html') :
      res.redirect('/failure.html'))
    .catch(err => console.log(err))
})

app.listen(PORT, console.log(`Server started on ${PORT}`));
