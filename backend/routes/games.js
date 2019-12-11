const router = require('express').Router();
let Game =require('../models/game.model');
let Exercise =require('../models/exercise.model');
let UserSession =require('../models/user_session.model');
let Glob=require('./global');
//global._ = require('underscore');

var a = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

router.route('/begin').get((req,res)=>{
    var count=Glob.getCount();
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
      else if (sessions.length != 1) {
        return res.send({
          success: false,
          message: 'Error: Invalid'
        });
      } else {
        // DO ACTION
        if(count%2==0)
        {
            //console.log("ok1");
            var n;
            var r=[];
            for (n=1; n<=5; ++n)
            {
            var i = Math.floor((Math.random() * (15-n)) + 1);
            r.push(a[i]);
            a[i] = a[15-n];
            }
            const begin=false;
            const q1=Number(r[0]);
            const q2=Number(r[1]);
            const q3=Number(r[2]);
            const q4=Number(r[3]);
            const q5=Number(r[4]);
            const game_id=Number(count);
            const game=new Game({game_id,begin,q1,q2,q3,q4,q5});
            const exercise= new Exercise();
            exercise.game_id=count;
            exercise.userID1=token;
            //console.log(game)
            game.save()
                .then(()=> {
                //console.log("okt1");    
                exercise.save()
                    .then(()=> {
                        res.send({success:true,message:'game created',game_token:game_id,
                        q1t: q1,q2t:q2,q3t:q3,q4t:q4,q5t:q5,begint:false
                      })
                        Glob.setCount(count+1);
                    })
                    .catch(err => res.status(400).send({success: false,message:'error1'}))                 
            })
                .catch(err => res.status(400).send({success: false,message:'error2'}))   
        }
        else
        {
            var id=count-1;
            var q1,q2,q3,q4,q5;
            //console.log("second condition");
            Exercise.findOneAndUpdate({
                game_id:id
            },{
            $set: {
                userID2:token
            }
            },{}, (err, sessions) => {
            if (err) {
                console.log(err);
                return res.send({
                success: false,
                message: 'Error: Server error1'
                });
            }})
            Game.findOneAndUpdate({
                game_id:id
            },{
            $set: {
                begin:true
            }
            },{}, (err, sessions) => {
            if (err ||sessions== null) {
                console.log(err);
                return res.send({
                success: false,
                message: 'Error: Server error2'
                });
            }
            q1=sessions.q1
            q2=sessions.q2
            q3=sessions.q3
            q4=sessions.q4
            q5=sessions.q5
            Glob.setCount(count+1);
            
            return res.send({
              success: true,
              message: 'Good',
              game_token: id,
              q1t: q1,
              q2t: q2,
              q3t: q3,
              q4t: q4,
              q5t: q5,
              begint: true
            });
          })
        
      }}
    });
  });

module.exports =router;