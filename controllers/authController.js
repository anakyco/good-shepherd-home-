const User = require("../models/user");
const bcrypt = require("bcrypt");

// =====================
// Register User
// =====================
const registerUser = async (req, res) => {

    try {

        const { fullName, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.send("Passwords do not match.");
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.send("Email already exists.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
            role: "user"
        });

        await newUser.save();

        res.redirect("/login");

    } catch (error) {
        console.log(error);
        res.send("Registration Failed.");
    }

};


// =====================
// Login User
// =====================
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.send("Invalid Email or Password");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.send("Invalid Email or Password");
        }

        // Save user session
        req.session.user = user;

        // Redirect according to role
        if (user.role === "admin") {
            return res.redirect("/admin/dashboard");
        }

        res.redirect("/dashboard");

    } catch (error) {
        console.log(error);
        res.send("Login Failed.");
    }

};


// =====================
// Logout
// =====================
const logoutUser = (req, res) => {

    req.session.destroy(() => {
        res.redirect("/login");
    });

};


// =====================
// Export
// =====================
module.exports = {
    registerUser,
    loginUser,
    logoutUser
};
