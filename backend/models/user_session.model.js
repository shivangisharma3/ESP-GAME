const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const user_sessionSchema = new Schema ({
    userID: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true,
});
const UserSession=mongoose.model('UserSession',user_sessionSchema);
module.exports= UserSession