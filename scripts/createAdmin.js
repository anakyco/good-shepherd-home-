require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("../models/User");

async function createAdmin() {

    try {

        await mongoose.connect(process.env.MONGODB_URI);

        const adminExists = await User.findOne({
            email: "admin@goodshepherd.org"
        });

        if (adminExists) {
            console.log("❌ Administrator already exists.");
            process.exit();
        }

        const hashedPassword = await bcrypt.hash("Admin@12345", 10);

        const admin = new User({

            fullName: "System Administrator",

            email: "admin@goodshepherd.org",

            password: hashedPassword,

            role: "admin"

        });

        await admin.save();

        console.log("✅ Administrator created successfully.");

        console.log("---------------------------");

        console.log("Email: admin@goodshepherd.org");

        console.log("Password: Admin@12345");

        process.exit();

    } catch (error) {

        console.log(error);

        process.exit();

    }

}

createAdmin();