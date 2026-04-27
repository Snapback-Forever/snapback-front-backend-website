import db from "../db/index.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import config from "../config.js"

const authController = {

    // ✅
    registerUser: async (req, res) => {
        let { accountName, firstName, lastName, email, password, password2, admin, isLogin } = req.body;
        // Ensure required fields are present
        if (!accountName || !email || !password) {
            return res.status(400).json({ message: "Missing required fields." });
        }
        // Normalize and sanitize accountName and email
        accountName = accountName.trim().replace(/\s+/g, '-').toLowerCase();
        email = email.trim().toLowerCase();
        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "➡️➡️ Invalid email format. Please enter a valid email address like 'example@example.com'. ⬅️⬅️" });
        }
        // Password strength validation
        if (password.length < 8) {
            return res.status(400).json({ message: "➡️➡️ Password must be at least 8 characters ⬅️⬅️" });
        }
        if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).test(password)) {
            return res.status(400).json({ message: "➡️➡️ ALL PASSWORDS MUST CONTAIN - at least 8 characters -- 1 uppercase letter -- 1 lowercase letter && --1 number ⬅️⬅️" });
        }
        if (password !== password2) {
            return res.status(400).json({ message: "The passwords do not match, please re-enter" });
        }
        try {
            // Check if accountName already exists
            const accountNameExists = await db.User.findOne({ accountName });
            if (accountNameExists) {
                return res.status(409).json({ message: "Account name already exists." });
            }
            // Check if email already exists
            const emailExists = await db.User.findOne({ email });
            if (emailExists) {
                return res.status(409).json({ message: "Email already exists." });
            }
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
            // Create new user
            const newUser = new db.User({
                accountName,
                firstName,
                lastName,
                email,
                password: hashedPassword,
                admin: !!admin,
                isLogin: !!isLogin
            });
            const savedUser = await newUser.save();
            // Optionally use toJSON method to exclude password from response
            return res.status(201).json({
                message: "User registration successful!",
                user: savedUser.toJSON()
            });
        } catch (err) {
            // Duplicate key error handling
            if (err.code === 11000) {
                if (err.keyPattern && err.keyPattern.accountName) {
                    return res.status(409).json({ message: "Account name already exists." });
                }
                if (err.keyPattern && err.keyPattern.email) {
                    return res.status(409).json({ message: "Email already exists." });
                }
                return res.status(409).json({ message: "Account name or email already exists." });
            }
            return res.status(500).json({ message: err.message || "Server error. Please try again." });
        }
    },

    // ✅
    loginUser: async (req, res) => {
        let { email, password } = req.body;
        // Normalize input for email and accountName rule
        const normalizedEmail = email.trim().toLowerCase();
        const normalizedAccountName = email.trim().replace(/\s+/g, '-').toLowerCase();
        try {
            // Look for a user where email or accountName matches
            const user = await db.User?.findOne({
                $or: [
                    { email: normalizedEmail },
                    { accountName: normalizedAccountName }
                ]
            });
            if (!user) {
                return res.json({ error: `➡️➡️ ⁉️ ${email} is not in database, please register ⬅️⬅️` });
            }
            // Optional: Blocked user check
            const isBlocked = await db.Blocked?.findOne({ email: user.email.trim().toLowerCase() });
            if (isBlocked) {
                return res.json({ error: "This Email Has Been Blocked By Admin" });
            }
            // Check password
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.json({ error: "➡️➡️ ⛔ Oh No! Something went wrong! Please check email & password, & try again. ⬅️⬅️" });
            }
            // Successful login, update lastLogin
            await db.User.updateOne(
                { _id: user._id },
                { $set: { lastLogin: new Date() } }
            );
            // Token and cookie
            const tokenData = { id: user._id, email: user.email };
            const token = jwt.sign(tokenData, config.TOKEN, { expiresIn: "1d" });
            const cookieOptions = { httpOnly: true, secure: true };
            const userSafe = user.toJSON();
            return res.cookie("token", token, cookieOptions).json({ data: userSafe, token });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Server error during login." });
        }
    },

    // ✅
    changePassword: async (req, res) => {
        const userId = req.params.userId;
        const { password, passwordNew, password2 } = req.body;
        // console.log(req.body)

        // Basic input validation
        if (!password || !passwordNew || !password2) {
            return res.status(400).json({ message: "All fields are required." });
        }
        try {
            const user = await db.User.findOne({ _id: userId });
            if (!user) {
                // Use same status and message as incorrect password to avoid user enumeration
                return res.status(401).json({ message: "Invalid credentials." });
            }

            const validCurrentPassword = await bcrypt.compare(password, user.password);
            // console.log("PASS", validCurrentPassword)
            if (!validCurrentPassword) {
                return res.status(401).json({ message: "Invalid credentials." });
            }
            const isSamePassword = await bcrypt.compare(passwordNew, user.password);
            if (isSamePassword) {
                return res.status(400).json({ message: "You cannot reuse your current password." });
            }
            if (passwordNew.length < 8) {
                return res.status(400).json({ message: "➡️➡️ Password must be at least 8 characters ⬅️⬅️" });
            }
            if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).test(passwordNew)) {
                return res.status(400).json({ message: "➡️➡️ ALL PASSWORDS MUST CONTAIN - at least 8 characters -- 1 uppercase letter -- 1 lowercase letter && --1 number ⬅️⬅️" });
            }
            if (passwordNew !== password2) {
                return res.status(400).json({ message: "⛔ New passwords do not match." });
            }
            // Hash new password and update
            const hashedPassword = await bcrypt.hash(passwordNew, 10);
            user.password = hashedPassword;
            await user.save();
            return res.status(200).json({ message: "✅ Password changed successfully!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error during password change." });
        }
    },

    // ✅
    adminChangePassword: async (req, res) => {
        const { userId, adminId } = req.params;
        const { passwordNew, password2 } = req.body;
        try {
            // Validate input
            if (!userId || !adminId) {
                return res.status(400).json({ error: "Missing userId or adminId." });
            }
            // Find target user
            const user = await db.User?.findOne({ _id: userId });

            if (!user) {
                return res.status(404).json({ error: "⛔ No user found with that User." });
            }
            // Validate password
            if (passwordNew?.length < 8) {
                return res.status(400).json({ error: "➡️➡️ Password must be at least 8 characters ⬅️⬅️" });
            }
            if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/).test(passwordNew)) {
                return res.status(400).json({ error: "➡️➡️ ALL PASSWORDS MUST CONTAIN - at least 8 characters -- 1 uppercase letter -- 1 lowercase letter && --1 number ⬅️⬅️" });
            }
            if (passwordNew !== password2) {
                return res.status(400).json({ error: "⛔ New passwords do not match." });
            }

            // Hash the new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(passwordNew, salt);
            user.password = hashedPassword;
            await user.save();
            // Find admin and check privileges
            const adminUser = await db.User?.findById(adminId);
            if (!adminUser || !adminUser.admin) {
                return res.status(403).json({ error: "⛔ No admin found with that ID, or user is not an admin." });
            }

            // Audit log for password change
            await db.AuditLog.create({
                performedByAccountName: adminUser.accountName,
                userEmail: user.email,
                serviceProvided: "ADMIN_CHANGED_PASSWORD"
            });
            res.json({ message: "✅ Password changed successfully!" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    },

    // ✅
    getUserById: (req, res) => {
        let { _id } = req.params
        db
            .User
            ?.findById({ _id })
            .then(data => {
                if (data) {
                    db
                        .User
                        ?.findById({ _id: data._id })
                        .select("-password")
                        .exec()
                        .then(data => res.json(data))

                        .catch(err => console.log(err))
                } else {
                    res.json({ message: "Something went horribly wrong!!!" })
                }
            })
            .catch(err => console.log(err))
    },

    // ✅
    getAllUsers: (req, res) => {
        db
            .User
            ?.find()
            .then(data => {
                if (!data) {
                    return res.json({ message: "There are no users in the database." })
                } else {
                    return res.json(data)
                }
            }).catch(err => console.log(err))

    },

    // ✅
    deleteUser: async (req, res) => {
        const { userId } = req.params;
        try {
            const result = await db.User.deleteOne({ _id: userId });
            if (result.deletedCount === 0) {
                return res.status(404).json({ message: "User not found." });
            }
            res.json({ message: "User deleted successfully." });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error during user deletion." });
        }
    },

    // ✅
    updateProfile: async (req, res) => {
        const { userId } = req.params;
        const { email, firstName, lastName } = req.body;
        try {
            const user = await db.User.findById(userId);
            if (!user) {
                return res.status(404).json({ message: "User not found." });
            }
            // If updating email, validate format and uniqueness
            if (email) {
                const emailTrimmed = email.trim().toLowerCase();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
                if (!emailRegex.test(emailTrimmed)) {
                    return res.status(400).json({ message: "Invalid email format." });
                }
                // Check if email is already used by someone else
                const emailExists = await db.User.findOne({ email: emailTrimmed, _id: { $ne: userId } });
                if (emailExists) {
                    return res.status(409).json({ message: "Email is already in use." });
                }
                user.email = emailTrimmed;
            }
            if (firstName !== undefined) user.firstName = firstName;
            if (lastName !== undefined) user.lastName = lastName;
            await user.save();
            // Use your custom toJson to hide sensitive fields
            res.json({ message: "Profile updated successfully.", user: user.toJSON() });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error during profile update." });
        }
    }

}

export default authController