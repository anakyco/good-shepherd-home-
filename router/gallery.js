const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload");

const galleryController = require("../controllers/galleryController");


// Public Gallery
router.get("/gallery-data", galleryController.getGallery);


// Upload Image
router.post(

    "/gallery/upload",

    upload.single("image"),

    galleryController.uploadImage

);


// Delete Image
router.get(

    "/gallery/delete/:id",

    galleryController.deleteImage

);

module.exports = router;