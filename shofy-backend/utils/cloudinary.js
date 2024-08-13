const dotenv = require("dotenv");
const cloudinaryModule = require("cloudinary");
const { secret } = require("../config/secret");

dotenv.config();
const cloudinary = cloudinaryModule.v2;

cloudinary.config({
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_api_key,
  api_secret: process.env.cloudinary_api_secret,
});

module.exports = cloudinary;