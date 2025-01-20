//***backen\routes\cloudinary.routes */
const express = require('express');
//The express.Router() is used to define a modular set of routes that are handled by 
//the controller functions.
const router = express.Router();
// internal
const uploader = require('../middleware/uploder');
const { cloudinaryController } = require('../controller/cloudinary.controller');
//multer: A middleware for handling multipart/form-data, primarily used for uploading files.
const multer = require('multer');

const upload = multer();
//add image
// This POST route allows uploading a single image. It uses multer to handle the image upload,
// which is then processed by cloudinaryController.saveImageCloudinary.
router.post('/add-img',upload.single('image'), cloudinaryController.saveImageCloudinary);

//add image
router.post('/add-multiple-img',upload.array('images',5), cloudinaryController.addMultipleImageCloudinary);

//delete image
router.delete('/img-delete', cloudinaryController.cloudinaryDeleteController);

module.exports = router;