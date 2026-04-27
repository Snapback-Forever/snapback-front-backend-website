import mongoose from "mongoose";

const adminMsg = new mongoose.Schema({

    accountName: {
        type: String
    },

    email: {
        type: String,
        required: [ true, "Provide Email" ],
        unique: true
    },

    msgBody: {
        type: String
    },

}, {

    timestamps: true

})


export default mongoose.model("AdminMsg", adminMsg)