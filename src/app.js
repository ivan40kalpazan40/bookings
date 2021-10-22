const express = require('express');
const path = require('path');
const initDb = require('./config/db.config');
const { DB_CONNECTION_URI } = require('./config/statics.config');
const router = require('./router');
const app = express();

app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.urlencoded({ extended: false }));
require('./config/handlebars.config')(app);
app.use(router);
initDb(DB_CONNECTION_URI)
  .then(() => {
    console.log('Connected to database!');
  })
  .then(() => {
    app.listen(
      5000,
      console.log.bind(console, 'Server is working on http://localhost:5000')
    );
  });
