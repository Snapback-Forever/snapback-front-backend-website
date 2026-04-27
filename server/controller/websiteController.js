import db from "../db/index.js"

const websiteController = {
    
    addWebsite: async (req, res) => {
      const { websiteName, websiteHttp, webSiteImageLink, aboutWebsite } = req.body;
      try {
        const newWebsite = new db.Website({
          websiteName,
          websiteHttp,
          webSiteImageLink,
          aboutWebsite
        });
        const savedWebsite = await newWebsite.save();
        res.json({
          ...savedWebsite.toObject(),
          message: "Website successfully added!"
        });
      } catch (err) {
        console.error(err);
        if (err.code === 11000) {
          return res.status(400).json({ message: "Duplicate website detected." });
        }
        if (err.name === 'ValidationError') {
          return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: "Error creating website entry" });
      }
    },

    getAllWebsites: async (req, res) => {
      try {
        const websites = await db.Website.find();
        res.json(websites);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error retrieving websites" });
      }
    },

    editWebsite: async (req, res) => {
      const { id } = req.params;
      const { websiteName, websiteHttp, webSiteImageLink, aboutWebsite } = req.body;
      try {
        const updatedWebsite = await db.Website.findByIdAndUpdate(
          id,
          { websiteName, websiteHttp, webSiteImageLink, aboutWebsite },
          { new: true, runValidators: true }
        );
        if (!updatedWebsite) {
          return res.status(404).json({ message: "Website not found" });
        }
        res.json({
          ...updatedWebsite.toObject(),
          message: "Website updated successfully"
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating website entry" });
      }
    },

    deleteWebsite: async (req, res) => {
      const { id } = req.params;
      try {
        const deleted = await db.Website.findByIdAndDelete(id);
        if (!deleted) {
          return res.status(404).json({ message: "Website not found" });
        }
        res.json({ message: "Website deleted successfully" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting website entry" });
      }
    }
   

}

export default websiteController