const express = require('express');
const path = require('path');
const router = require('./router');
const app = express();

app.use(express.static(path.resolve(__dirname, './public')));
require('./config/handlebars.config')(app);
app.use(router);

app.listen(
  5000,
  console.log.bind(console, 'Server is working on http://localhost:5000')
);
