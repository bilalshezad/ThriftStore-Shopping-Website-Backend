const express = require('express');
const { AddShoes, getMenShoes, getWomenShoes, getAllShoes, getSneaker, getJogers, getConverse, getSlides, getUrbanShoes, getgender, getCategories, getAllsnekears, getSizes, getAlljogers, getAllConverse, getAllSlides, getSingleProduct, getAllUrbanShoes, deleteShoes, updateShoes } = require('../controllers/shoesController');
const Router = express.Router();
Router.post('/admin/addshoes' , AddShoes)
Router.put('/admin/shoes/:id', updateShoes)
Router.delete('/admin/shoes/:id', deleteShoes)
// Router.get('products/get/menshoes' , getMenShoes)
// Router.get('products/get/womenshoes' , getWomenShoes)
Router.get('/products/getallshoes' , getAllShoes);
Router.get('/products/getallsneakers' , getAllsnekears);
Router.get('/products/getalljogers' , getAlljogers)
Router.get('/products/getallconverse' , getAllConverse)
Router.get('/products/getallslides' , getAllSlides)
Router.get('/products/getallurbanshoes' , getAllUrbanShoes)
Router.get('/products/getsneakers' , getSneaker);
Router.get('/products/getconverse' , getConverse);
Router.get('/products/getslides' , getSlides);
Router.get('/products/getcategories' , getCategories);
Router.get('/products/getjogers' , getJogers)
Router.get('/products/getgender' , getgender)
Router.get('/products/getsize' , getSizes)
Router.get('/products/geturbanshoes' , getUrbanShoes)
Router.get("/products/:id", getSingleProduct);


module.exports = Router