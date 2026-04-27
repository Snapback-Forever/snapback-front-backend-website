import mongoose from "mongoose";

const userMsg = new mongoose.Schema({

    firstName: {
        type: String
    },

    lastName: {
        type: String
    },

    email: {
        type: String,
        required: [true, "Provide Email"],
    },

    msgBody: {
        type: String,
        unique: true
    },

    answer: {
        type: String
    },

    msgType: {
        type: String,
        enum: ['userToAdmin', 'adminToAdmin'],
    },

    status: {
        type: String,
        enum: ['msgReviewed', 'userEmailed', 'msgCompleted'],
        default: 'msgReviewed'
    },

    msgNotFAQ: {
        type: Boolean,
    },

    statusChangedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    
    statusChangedByAccountName: {
     type: String
    },

}, {

    timestamps: true

})


export default mongoose.model("UserMsg", userMsg)