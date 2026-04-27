import express from "express"
import authRouter from "./authRoutes.js"
import userMsgRouter from "./userMsgRoutes.js"
import websiteRouter from "./websiteRoutes.js"

const routes = express.Router()

routes.use("/auth", authRouter)
routes.use("/userMsg", userMsgRouter)
routes.use("/web", websiteRouter)


export default routes