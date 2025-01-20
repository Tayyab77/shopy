const ApiError = require('../errors/api-error');
const Slideimg = require('../model/Slideimg');
const Products = require('../model/Products');

// create slideimg service
exports.createSlideimgService = async (data) => {
  const slideimg = await Slideimg.create(data);
  return slideimg;
}

// create all slideimg service
exports.addAllSlideimgService = async (data) => {
  await Slideimg.deleteMany();
  const slideimg = await Slideimg.insertMany(data);
  return slideimg;
}

// get all show slideimg service
exports.getShowSlideimgServices = async () => {
  const slideimg = await Slideimg.find({ status: 'Show' }).populate('products');
  return slideimg;
}

// get all slideimg
exports.getAllSlideimgServices = async () => {
  const slideimg = await Slideimg.find({});
  return slideimg;
}

// get type of slideimg service
exports.getSlideimgTypeService = async (param) => {
  const slideimgs = await Slideimg.find({ productType: param }).populate('products');
  return slideimgs;
}

// delete slideimg service
exports.deleteSlideimgService = async (id) => {
  const result = await Slideimg.findByIdAndDelete(id);
  return result;
}

// update slideimg
exports.updateSlideimgService = async (id, payload) => {
  const isExist = await Slideimg.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(404, 'Slideimg not found!');
  }

  const result = await Slideimg.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
}

// get single slideimg
exports.getSingleSlideimgService = async (id) => {
  const result = await Slideimg.findById(id);
  return result;
}
