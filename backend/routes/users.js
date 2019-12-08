const router = require('express').Router();
let User =require('../models/user.model');

router.route('/').get((req,res)=>{
    res.send("ok");
});
router.route('/login/verify').get((req,res)=>{
  const token=req.query.token;
  User.find({
    _id: token
  }, (err, sessions) => {
    if (err) {
      console.log(err);
      return res.send({
        success: false,
        message: 'Error: Server error'
      });
    }
    if (sessions.length != 1) {
      return res.send({
        success: false,
        message: 'Error: Invalid'
      });
    } else {
      // DO ACTION
      return res.send({
        success: true,
        message: 'Good'
      });
    }
  });
});
router.route('/logout').get((req,res)=>{
  const token=req.query.token;
  User.find({
    _id: token
  }, (err, sessions) => {
    if (err) {
      console.log(err);
      return res.send({
        success: false,
        message: 'Error: Server error'
      });
    }
    if (sessions.length != 1) {
      return res.send({
        success: false,
        message: 'Error: Invalid'
      });
    } else {
      // DO ACTION
      return res.send({
        success: true,
        message: 'Logout Sucessful'
      });
    }
  });
});
router.route('/add').post((req,res)=>{
    const username =req.body.username;
    const password =req.body.password;
    //res.json(username);
    const newUser= new User({username,password});
    newUser.save()
        .then(()=> res.send({success:true,message:'User created'}))
        .catch(err => res.status(400).send({success: false,message:'error'}))
});
router.route('/login').post((req,res)=>{
    const username =req.body.username;
    const password=req.body.password;
    User.findOne({username}, function(err, user) {
        if (err) {
          console.error(err);
          res.status(500).send({
            success: false,
            message: 'Error: server error'
          });
        } else if (!user) {
          console.log("Login Unsuccessful");
          res.status(401).send({
              success: false,
              message: 'Error: Invalid username'
          });
        }
          else
          {
              user.comparePassword(password,function(err,isMatch){
                  if(err) {
                      console.error(err);
                      res.status(500).send({
                        success: false,
                        message: 'Error: server error'
                    });
                  }
                  else if(!isMatch)
                  {
                    console.log("Login Unsuccessful");
                    res.status(401).send({
                        success: false,
                        message: 'Error: Invalid password'
                    });
                  }
                  else
                  {
                      console.log("Login Successful");
                      res.send({
                        success: true,
                        message: 'Successful',
                        token: user._id
                    });
                  }
              })
          }
        })
});
module.exports =router;