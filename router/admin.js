const express = require("express");
const router = express.Router();
const path = require("path");
const adminController = require("../controllers/adminController");
const contactController = require("../controllers/contactController");

// Redirect /admin to /admin/dashboard
router.get("/", (req, res) => {
    res.redirect("/admin/dashboard");
});

// Admin Dashboard
router.get("/dashboard", adminController.dashboard);

// Gallery
router.get("/gallery", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/admin/gallery.html"));
});

// Blog
router.get("/blog", (req, res) => {
    res.send("Blog Management Page");
});

// Residents
router.get("/residents", (req, res) => {
    res.send("Residents Management Page");
});

// Staff
router.get("/staff", (req, res) => {
    res.send("Staff Management Page");
});

// Volunteers
router.get("/volunteers", (req, res) => {
    res.send("Volunteer Management Page");
});

// Donations
router.get("/donations", (req, res) => {
    res.send("Donation Management Page");
});

// Messages
router.get("/messages", (req, res) => {
    res.send("Contact Messages");
});

// Settings
router.get("/settings", (req, res) => {
    res.send("Website Settings");
});

module.exports = router;