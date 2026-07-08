const Gallery = require("../models/gallery");

// Upload New Image
const uploadImage = async (req, res) => {

    try {

        const { title, description, category } = req.body;

        const newImage = new Gallery({

            title,

            description,

            category,

            image: "/uploads/gallery/" + req.file.filename

        });

        await newImage.save();

        res.redirect("/admin-gallery");

    } catch (error) {

        console.log(error);

        res.send("Image Upload Failed.");

    }

};


// Display All Images
const getGallery = async (req, res) => {

    try {

        const images = await Gallery.find().sort({ uploadedAt: -1 });

        res.json(images);

    } catch (error) {

        res.send(error);

    }

};


// Delete Image
const deleteImage = async (req, res) => {

    try {

        await Gallery.findByIdAndDelete(req.params.id);

        res.redirect("/admin-gallery");

    } catch (error) {

        res.send(error);

    }

};

module.exports = {

    uploadImage,

    getGallery,

    deleteImage

};
