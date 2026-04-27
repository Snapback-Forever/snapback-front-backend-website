import controllers from "../controller/index.js";
import express from "express"

const websiteRouter = express.Router();

// Add a new website
websiteRouter.post("/add", controllers.addWebsite);

// Get all websites
websiteRouter.get("/getWebsites", controllers.getAllWebsites);

// Edit website (update by ID)
websiteRouter.post("/editWebsite/:id", controllers.editWebsite);

// Delete website (delete by ID)
websiteRouter.post("/deleteWebsite/:id", controllers.deleteWebsite);

export default websiteRouter;