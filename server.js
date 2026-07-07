const express = require("express");
const session = require("express-session");
const path = require("path");
const authRouter = require("./router/auth");
const adminRouter = require("./router/admin");
const Gallery = require("./models/Gallery");
const contactController = require("./controllers/contactController");

require("dotenv").config();

const connectDB = require("./config/database");

const app = express();

// EJS Configuration
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: "goodshepherdsecretkey",
    resave: false,
    saveUninitialized: false
}));

const PORT = process.env.PORT || 3000;

// Static Files
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/", authRouter);
app.use("/admin", adminRouter);

// Home
app.get("/", (req, res) => {

    res.render("index", {

        success: req.query.success || false,
        error: req.query.error || false

    });

});
// About
app.get("/about", (req, res) => {
    res.render("about");
});

// Why We Are Here
app.get("/why", (req, res) => {
    res.render("why");
});

// Gallery
app.get("/gallery", async (req, res) => {

    try{

        const gallery = await Gallery.find().sort({uploadedAt:-1});

        res.render("gallery",{

            gallery

        });

    }

    catch(err){

        console.log(err);

        res.send("Unable to load Gallery.");

    }

});

// Donate
app.get("/donate", (req, res) => {
    res.render("donate");
});

// Blog
app.get("/blog", (req, res) => {
    res.render("blog");
});

// Admin Login
app.get("/admin-login", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "admin-login.html"));
    
    
});


// User Dashboard
app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "dashboard.html"));
});

// Admin Dashboard
app.get("/admin-dashboard", (req, res) => {
    res.render("admin/dashboard");

});
// Contanct Message
// Contact Message
app.post("/contact", contactController.saveMessage);

app.get("/contact", (req, res) => {

    res.render("contact", {

        success: req.query.success || false,
        error: req.query.error || false

    });

});

// Connect to MongoDB
connectDB();

// Start Server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});