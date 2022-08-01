const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
// app.use(express.static('public'));
app.set('view engine', 'ejs');
// app.set('views', './views')

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('GET to Home Page');
});

app.post('/:val', (req, res) => {
  const param = req.params.val;
  let value = req.body instanceof Array ? req.body[0][param] : req.body[param];

  if (value) {
    res.render('pages/index', { show: value });
  } else {
    res.send(`${param} does not exist in posted json as key.`);
  }
});

app.post('/', (req, res) => res.send('No parameter name after in URL after /'));

app.get('*', (req, res) => res.redirect('/'));

app.listen(PORT, () => console.log('server started'));
