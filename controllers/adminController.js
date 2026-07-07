const Gallery = require("../models/Gallery");

const dashboard = async (req, res) => {

    try {

        const galleryCount = await Gallery.countDocuments();

        res.render("admin/dashboard", {

            galleryCount

        });

    } catch (error) {

        console.log(error);

        res.send("Dashboard Error");

    }

};

module.exports = {

    dashboard

};