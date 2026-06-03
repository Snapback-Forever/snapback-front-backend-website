import authController from "./authControllers.js";
import userDetails from "./userDetails.js";
import userMsgController from "./userMsgControllers.js";
import websiteController from "./websiteController.js";

const controllers = {

    registerUser: authController.registerUser,
    loginUser: authController.loginUser,
    changePassword: authController.changePassword,
    adminChangePassword: authController.adminChangePassword,
    getUserById: authController.getUserById,
    getAllUsers: authController.getAllUsers,
    deleteUser: authController.deleteUser,
    updateProfile: authController.updateProfile,
    addMemeImage: authController.addMemeImage,
    getAllMemes: authController.getAllMemes,
    removeMemeImage: authController.removeMemeImage,

    userDetails: userDetails.userDetails,
    
    addUserMsg: userMsgController.addUserMsg,
    getAllUserMsg: userMsgController.getAllUserMsg,
    getSingleUserMsg: userMsgController.getSingleUserMsg,
    deleteUserMsg: userMsgController.deleteUserMsg,
    changeUserMsgStatus: userMsgController.changeUserMsgStatus,
    getAllAuditReports: userMsgController.getAllAuditReports,
    deleteAuditLog: userMsgController.deleteAuditLog,

    addWebsite: websiteController.addWebsite,
    getAllWebsites: websiteController.getAllWebsites,
    editWebsite: websiteController.editWebsite,
    deleteWebsite: websiteController.deleteWebsite,


}

export default controllers