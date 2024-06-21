const express = require('express');

const logger = require('./config/winston');
const errorHandler = require('./middlewares/errorHandler');
const app = express();

const indexRoutes = require('./routes/indexRoutes')

app.use(express.json())
app.use('/api',indexRoutes)

app.use(errorHandler);


module.exports = app;