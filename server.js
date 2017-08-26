const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

var reactViews = require('express-react-views');

var db = mongoose.connect('mongodb://admin:123456@ds137441.mlab.com:37441/datamining');

var app = express();
app.use(cors());
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.engine('jsx', reactViews.createEngine());
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');



const goodRouter = require('./routes/goodRoutes')();
const shelRouter = require('./routes/shelfRoutes')();
const transactionRouter = require('./routes/transactionRoutes')();
const homeRouter = require('./routes/homeRoutes')();

app.use('/', homeRouter);
app.use('/api/shelves', shelRouter);
app.use('/api/goods', goodRouter);
app.use('/api/transactions', transactionRouter);

app.listen(port, () => {
  console.log(`The server is listening in port ${port}`);
});