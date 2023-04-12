var express = require('express');
var router = express.Router();
const moment = require('moment')

const fetch = require('node-fetch');
const Trip = require('../models/trips');

/* GET users listing. */
router.post('/searchTrips', function(req, res) {
  
  let { departure, arrival, date } = req.body

  if(!departure || departure === '' || !arrival || arrival === '' || !date || date === '') {
    res.json({result: false, trip : 'Trip not found' })
  } else {
      departure  = departure[0].toUpperCase() + departure.slice(1).toLowerCase()
      arrival  = arrival[0].toUpperCase() + arrival.slice(1).toLowerCase()
      Trip.find({departure: departure, arrival: arrival}).then(data => {
      
        let arr = []
    
        if(data){
    
          for(let trip of data) {
              let newDate = moment(trip.date).format('DD/MM/YYYY')
              if(newDate === date) {
                arr.push({departure : trip.departure, arrival: trip.arrival, date: trip.date, price: Number(trip.price)})
              }
            }
            res.json({result: true, trips: arr})
          }

      })
  }


  
})

module.exports = router;