const router = require('express').Router();
let Flight =require('../models/flights.model');

router.route('/').get((req,res)=>{
    res.send("ok");
});

// ADDING FLIGHTS
router.route('/add').post((req,res)=>{
    const flight_num =req.body.flight_num;
    const src =req.body.src;
    const dest =req.body.dest;
    const newFlight= new Flight({flight_num,src,dest});
    newFlight.save()
        .then(()=>res.send('Flight saved!!'))
        .catch(err => res.status(400).json('Error: '+ err));
});

router.route('/search').get((req,res)=>{
    const source =req.query.src;
    const destination = req.query.dest;
    console.log(source)
    console.log(destination)
    Flight.aggregate([
      {$lookup:
       {
         from: 'flights',
         localField: 'dest',
         foreignField: 'src',
         as: 'conn'
       }
      },
      {$match: {'src':source,'conn.dest':destination} }
       ]).
        then(conn => res.json(conn)).
        catch(error => console.error('error', error));
    /*
    
      Flight.find({src:source,dest:destination}, function(err, flights) {
        if (err) {
          console.error(err);
          res.status(500).json({
            error: 'Internal error please try again'});
        }
        else
          {   console.log(flights)
              res.json(flights);
          }
        })
    */
});
module.exports =router;