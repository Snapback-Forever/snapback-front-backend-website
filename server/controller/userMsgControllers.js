import db from "../db/index.js"

const userMsgController = {

    
    addUserMsg: async (req, res) => {
        const { firstName, lastName, email, msgBody, status, msgType } = req.body;
        try {
            const newUserMsg = new db.UserMsg({
                firstName,
                lastName,
                email,
                msgBody,
                status,
                msgType
            });
            const savedUserMsg = await newUserMsg.save();
            // Custom response message based on msgType
            let responseMessage;
            if (msgType === 'adminToAdmin') {
                responseMessage = "Message to admins has been sent.";
            } else {
                responseMessage = "Thank You For Contacting Snapback. We Send You An Email To The Email You Provided. Please Be Patient. Also Check Frequently Asked Questions In Case Your Question Has Been Previously Answered!";
            }
            res.json({
                ...savedUserMsg.toObject(),
                message: responseMessage
            });
        } catch (err) {
            console.error(err);
            // Duplicate key error handling for msgBody unique constraint
            if (err.code === 11000 && err.keyPattern && err.keyPattern.msgBody) {
                return res.status(400).json({ message: "You Have Already Sent This Message. When Admin Responds They Will Send You An Email. Double Check Your Spam Folder & Please Be Patient. Also Check Frequently Asked Questions In Case Your Question Has Been Previously Answered." });
            }
            if (err.name === 'ValidationError') {
                return res.status(400).json({ message: err.message });
            }
            res.status(500).json({ message: "Error creating user message" });
        }
    },

    getAllUserMsg: async (req, res) => {
        try {
            const allMsgs = await db.UserMsg.find({});
            res.json(allMsgs);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error fetching user messages" });
        }
    },

    getSingleUserMsg: async (req, res) => {
        const { id } = req.params;
        try {
            const msg = await db.UserMsg.findById(id);
            if (!msg) {
                return res.status(404).json({ message: "Message not found" });
            }
            res.json(msg);
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error fetching user message" });
        }
    },

    deleteUserMsg: async (req, res) => {
        const { id } = req.params;
        try {
            const deleted = await db.UserMsg.findByIdAndDelete(id);
            if (!deleted) {
                return res.status(404).json({ message: "Message not found" });
            }
            res.json({
                ...deleted.toObject(),
                message: "User message deleted successfully!"
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error deleting user message" });
        }
    },

    changeUserMsgStatus: async (req, res) => {

        const { msgId, userId } = req.params;
        const { newStatus, answer, msgNotFAQ } = req.body;

        const userMsg = await db.UserMsg.findById(msgId);

        if (!userMsg) return res.status(404).json({ error: 'Message not found' });
        if (userMsg.statusChangedBy && userMsg.statusChangedBy.toString() !== userId) {
            return res.status(403).json({ error: 'Only the last user who changed this status may make further changes.' });
        }
        const user = await db.User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });
        // --- ADD THIS: Update msgNotFAQ if provided ---
        if (typeof msgNotFAQ !== "undefined") {
            userMsg.msgNotFAQ = !!msgNotFAQ;
        }
        // Only require answer when changing to msgCompleted
        if (newStatus === 'msgCompleted') {
            if (!answer || answer.trim() === "") {
                return res.status(400).json({ error: 'Answer is required to complete this message.' });
            }
            userMsg.answer = answer; // Ensure UserMsg schema has 'answer' field
        }
        userMsg.status = newStatus;
        userMsg.statusChangedBy = userId;
        userMsg.statusChangedByAccountName = user.accountName;
        await userMsg.save();
        // Audit log and delete when message is completed
        if (newStatus === 'msgCompleted') {
            await db.AuditLog.create({
                performedByAccountName: user.accountName,
                userEmail: userMsg.email,
                serviceProvided: `Message: ${userMsg.msgBody}`,
                answer: userMsg.answer,
                msgNotFAQ: userMsg.msgNotFAQ
            });
            await userMsg.deleteOne();
            return res.json({ success: true, message: 'Audit log created and message deleted.' });
        }
        res.json({ success: true, newStatus });
    },

    getAllAuditReports: async (req, res) => {
        try {
            const auditLogs = await db.AuditLog.find(); // Retrieves all AuditLog documents
            res.status(200).json(auditLogs);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch audit reports." });
        }
    },

    deleteAuditLog: async (req, res) => {
        const { id } = req.params;
        try {
            const deleted = await db.AuditLog.findByIdAndDelete(id);
            if (!deleted) {
                return res.status(404).json({ message: "Message not found" });
            }
            res.json({
                ...deleted.toObject(),
                message: "Audit Log deleted successfully!"
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Error audit log message" });
        }
    },

}

export default userMsgController