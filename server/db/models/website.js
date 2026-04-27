import mongoose from "mongoose";

const websites = new mongoose.Schema({

    websiteName: {
        type: String
    },

    websiteHttp: {
        type: String
    },

    webSiteImageLink: {
        type: String
    },

    aboutWebsite: {
        type: String
    }

}, {

    timestamps: true

})


export default mongoose.model("Websites", websites)