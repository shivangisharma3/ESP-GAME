const router = require('express').Router();
let User =require('../models/user.model');

router.route('/').get((req,res)=>{
    res.send("ok");
});
router.route('/add').post((req,res)=>{
    const username =req.body.username;
    //res.json(username);
    const newUser= new User({username});
    newUser.save()
        .then(()=> res.json('User added !'))
        .catch(err => res.status(400).json('Error: '+ err));
});
router.route('/login:id').post((req,res)=>{
    const username =req.params.username;
    User.findOne({username}, function(err, user) {
        if (err) {
          console.error(err);
          res.status(500).json({
            error: 'Internal error please try again'});
        } else if (!user) {
          res.status(401).json({
              error: 'Incorrect email or password'});
          }
          else
          {
              res.json('Hello user !'+id);
          }
        })
});
module.exports =router;