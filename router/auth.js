const express = require("express");
const path = require("path");
const router = express.Router();

const authController = require("../controllers/authController");

// =========================
// Register Page
// =========================
router.get("/register", (req, res) => {
    res.render("register"); 
});
// =========================
// Login Page
// =========================
router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/login.html"));
});

// =========================
// Admin Login Page
// =========================
router.get("/admin-login", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/admin-login.html"));
});

// =========================
// Authentication Routes
// =========================
router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/logout", authController.logoutUser);

// =========================
// Export Router
// =========================
module.exports = router;