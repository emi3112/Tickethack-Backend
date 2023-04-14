var express = require('express');
var router = express.Router();
const moment = require('moment')

const fetch = require('node-fetch');
const Cart = require('../models/carts');

router.post('/newCart', (req, res) => {

    let departure = req.body.departure
    let arrival = req.body.arrival
    let date = req.body.date
    let price = req.body.price

    Cart.findOne({departure, arrival, date, price}).then(data => {
        if(!data) {
            const newCart = new Cart({
                departure: req.body.departure,
                arrival: req.body.arrival,
                date: req.body.date,
                price: req.body.price
            })
        
            newCart.save().then(data => {
                res.json({result: true, carts: newCart})
            })
        } else {
            res.json({result: false, error: 'Trip already saved'})
        }
    })
})

router.delete('/deleteCart/:date', (req, res) => {
    Cart.deleteOne({date: req.params.date}).then(data => {
        console.log(data);
        console.log('REQ.PARAMS.DATE ===> ', typeof(req.params.date));
        console.log('DATA.DATE ===> ', typeof(data.date));
        console.log('DATA.DELETEDCOUNT ===> ', data.deletedCount);


        if(data.deletedCount > 0){
            res.json({result : true})
        } else {
            res.json({result: false})
        }
    })
})

router.get('/showCarts', (req, res) => {
    Cart.find().then(data => {
        res.json({result: true, carts: data})
    })
})

module.exports = router;