import controllers from "../controller/index.js";
import express from "express"

const userMsgRouter = express.Router()

userMsgRouter
    .route("/addUserMsg")
    .post(controllers.addUserMsg)

userMsgRouter
    .route("/deleteUserMsg/:id")
    .post(controllers.deleteUserMsg);

userMsgRouter
    .route("/getAllUserMsg")
    .get(controllers.getAllUserMsg);

userMsgRouter
    .route("/getSingleUserMsg/:userMsgId")
    .get(controllers.getSingleUserMsg)

userMsgRouter
    .route("/changeUserMsgStatus/:msgId/:userId")
    .post(controllers.changeUserMsgStatus)

userMsgRouter
    .route("/getAllAuditReports")
    .get(controllers.getAllAuditReports)

userMsgRouter
    .route("/deleteAuditLog/:id")
    .post(controllers.deleteAuditLog)


export default userMsgRouter