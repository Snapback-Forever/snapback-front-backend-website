import mongoose from "mongoose";

const questionAnswers = new mongoose.Schema({

    question: {
        type: String
    },

    answer: {
        type: String
    },

    adminResponding: {
        type: String
    },

}, {

    timestamps: true

})


export default mongoose.model("QuestionAnswers", questionAnswers)