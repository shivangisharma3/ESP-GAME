const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const flightSchema = new Schema({
    flight_num: {type: Number ,unique: true, required: true},
    src: {type: String},
    dest: {type: String},
    //dep_time: {type: Number},
    //arr_time: {type: Number},
}, {
    timestamps: true,
});

const Flight = mongoose.model('Flight',flightSchema);
module.exports = Flight;