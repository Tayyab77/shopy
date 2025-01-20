const express = require('express');
const router = express.Router();
// internal
const slideimgController = require('../controller/slideimg.controller');

// get
router.get('/get/:id', slideimgController.getSingleSlideimg);
// add
router.post('/add', slideimgController.addSlideimg);
// add All Slideimg
router.post('/add-all', slideimgController.addAllSlideimg);
// get all Slideimg
router.get('/all', slideimgController.getAllSlideimg);
// get Product Type Slideimg
router.get('/show/:type', slideimgController.getProductTypeSlideimg);
// get Show Slideimg
router.get('/show', slideimgController.getShowSlideimg);
// delete slideimg
router.delete('/delete/:id', slideimgController.deleteSlideimg);
// edit slideimg
router.patch('/edit/:id', slideimgController.updateSlideimg);

module.exports = router;
