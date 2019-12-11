const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const exerciseSchema = new Schema({
    game_id: {type: Number , required: true},

    userID1: {type: String, required: true},
    userID2: {type:String},
    ans1: {type: String,
    default:"0"},
    ans2: {type: String,
        default:"0"},
    ans3: {type: String,
        default:"0"},
    ans4: {type: String,
        default:"0"},
    ans5: {type: String,
        default:"0"},
    ans6: {type: String,
        default:"0"},
    ans7: {type: String,
        default:"0"},
    ans8: {type: String,
        default:"0"},
    ans9: {type: String,
        default:"0"},
    ans10: {type: String,
        default:"0"},
    score:{ type: Number,
            default: 0
    }
}, {
    timestamps: true,
});

const Exercise = mongoose.model('Exercise',exerciseSchema);
module.exports = Exercise;