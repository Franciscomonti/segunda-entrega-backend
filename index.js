const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
require('dotenv').config()

const app = express();

dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;


const routerProduct = require('./app/routes/product.js');
const routerCart = require('./app/routes/cart.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', routerProduct);
app.use('/api/carts', routerCart);


mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.iimmmkt.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`, (error) => {  
    if (error) {
        console.log('error al conectar')
    }else {
        console.log('success al conectar')
    }
})

const PORT = 8080;

const server =app.listen(PORT, () => {
    console.log(`corriendo en el servidor http://localhost:${PORT}`)
});

server.on('error', ()=> { console.log('error: ' + error)});


