const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('mongoose');
const userRoute = require('../src/routes/user');
const productRoute = require('./routes/product');
const orderRoute = require('./routes/orders');
const jwt = require('jsonwebtoken');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', userRoute);

app.use('/', productRoute);

app.use('/', orderRoute);

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});


