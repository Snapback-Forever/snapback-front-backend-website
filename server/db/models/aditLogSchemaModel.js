
import mongoose from "mongoose";

const auditLogSchema = new mongoose.Schema({

    performedByAccountName: {
        type: String,
    },

    userEmail: {
        type: String,
        required: [ true, "Provide User Email" ],
       
    },

    serviceProvided: {
        type: String
    },

    answer: { 
        type: String 
    },

    msgNotFAQ: {
        type: Boolean,
    },

},{
    timestamps: true
});

export default mongoose.model("AuditLog", auditLogSchema);