const router = require('express').Router();
let User =require('../models/user.model');
let UserSession =require('../models/user_session.model');
router.route('/').get((req,res)=>{
    res.send("ok");
});
router.route('/login/verify').get((req,res)=>{
  const token=req.query.token;
  UserSession.find({
    userID: token,
    isDeleted: false
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
  UserSession.findOneAndDelete({
    userID: token,
    isDeleted: false},
     {} , (err, sessions) => {
    if (err) {
      console.log(err);
      return res.send({
        success: false,
        message: 'Error: Server error'
      });
    }
    else if(sessions==null)
    {
        //console.log(token);
        return res.send({
          success: false,
          message: 'No match'
        });
      
    }
   else {
      // DO ACTION
      //console.log(sessions);
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
            message: 'Error: server error1'
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
                        message: 'Error: server error2'
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
                    const userSession = new UserSession();
                    userSession.userID = user._id;
                    userSession.save((err, doc) => {
                      if (err) {
                        console.log(err);
                        return res.send({
                          success: false,
                          message: 'Error: server error3'
                        });
                      }
                      console.log("Login Successful");
                      res.send({
                        success: true,
                        message: 'Successful',
                        token: user._id
                    });
                  })
                  }
              })
          }
        })
});
module.exports =router;