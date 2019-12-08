const router =require('express').Router();
let Exercise = require('../models/exercise.model');
let Game = require('../models/game.model');

router.route('/add').post((req,res)=>{
    const username =req.body.username;
    const game_id =Number(req.body.game_id);
    const q1=Number(req.body.q1);
    const q2=Number(req.body.q2);
    const q3=Number(req.body.q3);
    const q4=Number(req.body.q4);
    const q5=Number(req.body.q5);
    const newExercise= new Exercise({username,game_id});
    const newGame= new Game({game_id,q1,q2,q3,q4,q5});
    newGame.save()

        .then(()=>newExercise.save()
                    .then(()=>res.send('Game saved!!'))
                    .catch(err => res.status(400).json('Error: '+ err))
        )
        .catch(err => res.status(400).json('Error: '+ err));
});
router.route('/update/:id').post((req,res)=>{
    var num=Number(req.body.n);
    var x=Number(req.body.x);
    
    Exercise.findById(req.params.id)
        .then( exercise=>{
            if(num==1)
            {
                exercise.ans1=x;
            }
            if(num==2)
            {
                exercise.ans2=x;
            }
            if(num==3)
            {
                exercise.ans3=x;
            }
            if(num==4)
            {
                exercise.ans4=x;
            }
            if(num==5)
            {
                exercise.ans5=x;
            }
            exercise.save()
                .then(()=>res.send("Updated ans"))
                .catch(err => res.status(400).json('Error1: '+ err))

        })
        .catch(err => res.status(400).json('Error2: '+ err));
});


module.exports = router;
