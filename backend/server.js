const express = require('express');
const cors= require('cors');
const mongoose=require('mongoose');
require('dotenv').config();
const app= express();
const port= process.env.Port || 5000;
app.use(cors());
app.use(express.json());
process.env['count']=0;
const uri =process.env.ATLAS_URI;
//mongoose.Promise = global.Promise
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true}
);
const connection =mongoose.connection;
connection.once('open',()=>{
    console.log('MongoDb database connection :Successful')
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const gamesRouter = require('./routes/games');

app.use('/users',usersRouter);
app.use('/exercises',exercisesRouter);
app.use('/games',gamesRouter);
/*app.get('/',(req,res)=>{
    res.send("Multiplayer Game");
});*/

app.listen(port,()=>{
    console.log(`Server is running on port: ${port}`);
});
