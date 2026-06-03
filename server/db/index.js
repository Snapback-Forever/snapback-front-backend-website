import connect from "./connect.js";
import AuditLog from "./models/aditLogSchemaModel.js"
import AdminMsg from "./models/adminMsg.js";
import QuestionsAnswers from "./models/questionsAnswers.js";
import User from "./models/userModel.js"
import UserMsg from "./models/userMsg.js";
import Website from "./models/website.js";
import Meme from "./models/memes.js";

export default { connect, User, AuditLog, UserMsg, AdminMsg, QuestionsAnswers, Website, Meme }