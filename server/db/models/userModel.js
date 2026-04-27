import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    accountName: {
        type: String,
        required: [ true, "Provide AccountName" ],
        unique: true,
        trim: true,
        lowercase: true,
    },

    firstName: {
        type: String
    },

    lastName: {
        type: String
    },

    email: {
        type: String,
        required: [ true, "Provide Email" ],
        unique: true
    },

    password: {
        type: String,
        required: [ true, "Provide Password" ],
        minLength: 8,
        trim: true
    },

    isLogin: {
        type: Boolean,
        default: false
    },

    admin: {
        type: Boolean,
        default: false
    },

    creator: {
        type: Boolean,
        default: false
    },

    lastLogin: {
        type: String
    },

}, {

    timestamps: true

})

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password

    return userObject
}

export default mongoose.model("User", userSchema)