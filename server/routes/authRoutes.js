import controllers from "../controller/index.js";
import express from "express"

const authRouter = express.Router()

authRouter
    .route("/register/user")
    .post(controllers.registerUser)

authRouter
    .route("/login/user")
    .post(controllers.loginUser)

authRouter
    .route("/changePassword/:userId/user")
    .post(controllers.changePassword);

authRouter
    .route("/adminChangePassword/:adminId/:userId/user")
    .post(controllers.adminChangePassword);

authRouter
    .route("/getSingleUser/:_id/user")
    .get(controllers.getUserById)

authRouter
    .route("/getAllUsers/user")
    .get(controllers.getAllUsers)

authRouter
    .route("/deleteUser/:userId/delete")
    .post(controllers.deleteUser)

authRouter
    .route("/editProfile/:userId/user")
    .post(controllers.updateProfile)

authRouter
    .route("/userDetails/user")
    .get(controllers.userDetails)

    authRouter
    .route("/addMemeImage/meme")
    .post(controllers.addMemeImage);

    authRouter
    .route("/getAllMemes/meme")
    .get(controllers.getAllMemes)

    authRouter
  .route("/removeMemeImage/:id/meme")
  .post(controllers.removeMemeImage)



export default authRouter