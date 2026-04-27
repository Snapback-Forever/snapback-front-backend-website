import config from "../config.js";
import mongoose from "mongoose";

const connect = (app) => {
    mongoose
        .connect(config.MONGO_URI)
        .then(() => {
            // console.log("the goose is on the lose")

            app.listen(config.PORT, () => {
                // console.log(`Tiny ears Listen on ${config.PORT}  `)
            })
        })
}

export default connect