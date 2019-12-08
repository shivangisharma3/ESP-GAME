const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const exerciseSchema = new Schema({
    username: {type: String, required: true},
    game_id: {type: Number , required: true},
    ans1: {type: Number},
    ans2: {type: Number},
    ans3: {type: Number},
    ans4: {type: Number},
    ans5: {type: Number},
}, {
    timestamps: true,
});

const Exercise = mongoose.model('Exercise',exerciseSchema);
module.exports = Exercise;