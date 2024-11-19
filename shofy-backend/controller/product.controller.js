//File Name: backend\controller\product.controller.js

const Brand = require("../model/Brand");
const productServices = require("../services/product.service");
const Product = require("../model/Products");


// add product
exports.addProduct = async (req, res,next) => {
  console.log('product--->',req.body);
  try {
    const firstItem = {
      color: {
        name:'',
        clrCode:''
      },
      img: req.body.img,
    };
    const imageURLs = [firstItem, ...req.body.imageURLs];
    //Then we go in createProductService to create product
    const result = await productServices.createProductService({
      ...req.body,
      imageURLs: imageURLs,
    });

    console.log('product-result',result)
 
    res.status(200).json({
      success:true,
      status: "success",
      message: "Product created successfully!",
      data: result,
    });
  } catch (error) {
    console.log(error);
    next(error)
  }
};


// add all product
module.exports.addAllProducts = async (req,res,next) => {
  try {
    const result = await productServices.addAllProductService(req.body);
    res.json({
      message:'Products added successfully',
      result,
    })
  } catch (error) {
    next(error)
  }
}

// get all products
//Motive
// This function serves as an endpoint to retrieve all products from the database by 
// calling a service function. It returns the data to the client in a JSON format if 
// successful or forwards any errors to the error-handling middleware.

// Define an asynchronous function to get all products
exports.getAllProducts = async (req,res,next) => {
  try {
//Call the getAllProductsService function from productServices to retrieve product data  
    const result = await productServices.getAllProductsService();
// Send a successful response back to the client with the retrieved product data
    res.status(200).json({
      success:true, // Indicate success in the response

      data:result, // Attach the result data
    })
  } catch (error) {
  // Pass any caught errors to the next middleware for error handling
  //So, when next(error); is called, this middleware catches it, logs the error, 
  //and responds with a structured message for the client. This way, all errors are 
  //handled consistently across the application, keeping the codebase cleaner and 
  //improving user experience.
    next(error)
  }
}

// get all products by type
module.exports.getProductsByType = async (req,res,next) => {
  try {
    const result = await productServices.getProductTypeService(req);
    res.status(200).json({
      success:true, 
      data:result,
    })
  } catch (error) {
    console.log(error)
    next(error)
  }
}

// get offer product controller
module.exports.getOfferTimerProducts = async (req,res,next) => {
  try {
    const result = await productServices.getOfferTimerProductService(req.query.type);
    res.status(200).json({
      success:true, 
      data:result,
    })
  } catch (error) {
    next(error)
  }
}

// get Popular Product By Type
module.exports.getPopularProductByType = async (req,res,next) => {
  try {
    const result = await productServices.getPopularProductServiceByType(req.params.type);
    res.status(200).json({
      success:true, 
      data:result,
    })
  } catch (error) {
    next(error)
  }
}

// get top rated Products
module.exports.getTopRatedProducts = async (req,res,next) => {
  try {
    const result = await productServices.getTopRatedProductService();
    res.status(200).json({
      success:true, 
      data:result,
    })
  } catch (error) {
    next(error)
  }
}

// getSingleProduct
exports.getSingleProduct = async (req,res,next) => {
  try {
    const product = await productServices.getProductService(req.params.id)
    res.json(product)
  } catch (error) {
    next(error)
  }
}

// get Related Product
exports.getRelatedProducts = async (req,res,next) => {
  try {
    const products = await productServices.getRelatedProductService(req.params.id)
    res.status(200).json({
      success:true, 
      data:products,
    })
  } catch (error) {
    next(error)
  }
}

// update product
exports.updateProduct = async (req, res,next) => {
  try {
    const product = await productServices.updateProductService(req.params.id,req.body)
    res.send({ data: product, message: "Product updated successfully!" });
  } catch (error) {
    next(error)
  }
};

// update product
exports.reviewProducts = async (req, res,next) => {
  try {
    const products = await productServices.getReviewsProducts()
    res.status(200).json({
      success:true, 
      data:products,
    })
  } catch (error) {
    next(error)
  }
};

// update product
exports.stockOutProducts = async (req, res,next) => {
  try {
    const products = await productServices.getStockOutProducts();
    res.status(200).json({
      success:true, 
      data:products,
    })
  } catch (error) {
    next(error)
  }
};

// update product
exports.deleteProduct = async (req, res,next) => {
  try {
    await productServices.deleteProduct(req.params.id);
    res.status(200).json({
      message:'Product delete successfully'
    })
  } catch (error) {
    next(error)
  }
};

