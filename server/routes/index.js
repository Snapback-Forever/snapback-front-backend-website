import express from "express"
import authRouter from "./authRoutes.js"
import userMsgRouter from "./userMsgRoutes.js"
import websiteRouter from "./websiteRoutes.js"
import uploadImages from "./uploadImageRoutes.js"

const routes = express.Router()

routes.use("/auth", authRouter)
routes.use("/userMsg", userMsgRouter)
routes.use("/web", websiteRouter)
routes.use("/upload", uploadImages); 


export default routes