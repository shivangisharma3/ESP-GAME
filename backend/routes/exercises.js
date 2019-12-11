const router =require('express').Router();
let Exercise = require('../models/exercise.model');
let Game = require('../models/game.model');


router.route('/update').post((req,res)=>{
    const game_id =req.body.game_id;
    const level =req.body.level;
    const begin= req.body.begin;
    const value=req.body.value;
    Exercise.findOne({
        game_id:game_id
    },(err,user)=>{
        if(err){
        console.error(err);
          res.status(500).send({
            success: false,
            message: 'Error: server error1'
          });
        } else if (user==null) {
          console.log("No game");
          res.status(401).send({
              success: false,
              message: 'Error: Game not found'
          });
        }
        else
          {
              //const n=user.score;
              if(begin==false)
              {
                    if(level==1)
                    {
                        user.ans1=value;
                        
                    }
                    if(level==2)
                    {
                        user.ans2=value;
                    }
                    if(level==3)
                    {
                        user.ans3=value;
                    }
                    if(level==4)
                    {
                        user.ans4=value;
                    }
                    if(level==5)
                    {
                        user.ans5=value;
                    }
                    //console.log(user);
                    
                    const tempn=level+1
                    user.save()
                    .then(()=>{
                    res.send({
                        success: true,
                        levelv:tempn
                    });
                })
                .catch(err => res.status(400).send({success: false,message:'error'}))
              }
              else
              {
                const n=user.score
                if(level==1)
                {
                    user.ans6=value;
                    if(user.ans6==user.ans1)
                    {
                        user.score=n+10;
                    }
                }
                if(level==2)
                {
                    user.ans7=value;
                    if(user.ans7==user.ans2)
                    {
                        user.score=n+10;
                    }
                }
                if(level==3)
                {
                    user.ans8=value;
                    if(user.ans8==user.ans3)
                    {
                        user.score=n+10;
                    }
                }
                if(level==4)
                {
                    user.ans9=value;
                    if(user.ans4==user.ans9)
                    {
                        user.score=n+10;
                    }
                }
                if(level==5)
                {
                    user.ans10=value;
                    if(user.ans5==user.ans10)
                    {
                        user.score=n+10;
                    }
                }
                //console.log(user);
                const tempn=level+1
                user.save()
                .then(()=>{
                res.send({
                    success: true,
                    score: user.score,
                    levelv:tempn
                });
                })
                .catch(err => res.status(400).send({success: false,message:'error'}))

              }
              

          }

    })
});
module.exports = router;
