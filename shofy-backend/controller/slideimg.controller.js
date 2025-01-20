const slideimgServices = require("../services/slideimg.service");

// add slideimg
exports.addSlideimg = async (req, res, next) => {
  try {
    const result = await slideimgServices.createSlideimgService(req.body);
    res.status(200).json({
      status: "success",
      message: "Slideimg created successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// add all slideimg
exports.addAllSlideimg = async (req, res, next) => {
  try {
    const result = await slideimgServices.addAllSlideimgService(req.body);
    res.json({
      message: "Slideimg added successfully",
      result,
    });
  } catch (error) {
    next(error);
  }
};

// get all show slideimg
exports.getShowSlideimg = async (req, res, next) => {
  try {
    const result = await slideimgServices.getShowSlideimgServices();
    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

// get all slideimg
exports.getAllSlideimg = async (req, res, next) => {
  try {
    const result = await slideimgServices.getAllSlideimgServices();
    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

// get product type slideimg
exports.getProductTypeSlideimg = async (req, res, next) => {
  try {
    const result = await slideimgServices.getSlideimgTypeService(req.params.type);
    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

// delete slideimg
exports.deleteSlideimg = async (req, res, next) => {
  try {
    const result = await slideimgServices.deleteSlideimgService(req.params.id);
    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

// update slideimg
exports.updateSlideimg = async (req, res, next) => {
  try {
    const result = await slideimgServices.updateSlideimgService(req.params.id, req.body);
    res.status(200).json({
      status: "success",
      message: "Slideimg updated successfully",
      result,
    });
  } catch (error) {
    next(error);
  }
};

// get single slideimg
exports.getSingleSlideimg = async (req, res, next) => {
  try {
    const result = await slideimgServices.getSingleSlideimgService(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
