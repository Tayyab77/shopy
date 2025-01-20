const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const SlideimgSchema = mongoose.Schema({
  img: {
    type: String,
    required: false,
  },
  parent: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  children: [{ type: String }],
  productType: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: false,
  },
  products: [{
    type: ObjectId,
    ref: "Products"
  }],
  status: {
    type: String,
    enum: ['Show', 'Hide'],
    default: 'Show',
  },
}, {
  timestamps: true
});

const Slideimg = mongoose.model('Slideimg', SlideimgSchema);
module.exports = Slideimg;
