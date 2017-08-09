const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');



var db = mongoose.connect('mongodb://admin:123456@ds137441.mlab.com:37441/datamining');

var app = express();
app.use(cors());
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const Good = require('./models/goodModel');
const Shelf = require('./models/shelfModel');

const goodRouter = require('./routes/goodRoutes')(Good);
const shelRouter = require('./routes/shelfRoutes')(Shelf);

app.use('/api/shelves/', shelRouter);
app.use('/api/goods', goodRouter);

app.listen(port, () => {
  console.log(`The server is listening in port ${port}`);
});