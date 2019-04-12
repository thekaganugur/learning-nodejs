const express = require('express');

const app = express();
const port = 3000;

// app.get('/', (req, res, next) => {
//   res.send('GET req to root');
// });
// app.get('/users', (req, res, next) => {
//   res.send('GET req to users');
// });

app.use('/users', (req, res, next) => {
  res.send('GET req to users');
});
app.use('/', (req, res, next) => {
  res.send('GET req to root');
});

app.listen(port);
