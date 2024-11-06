//TypeScript is a strongly typed programming language, where you have to specify the
// variable type in advance.
import React from "react";
import Image from "next/image";
import { Rating } from "react-simple-star-rating";
// internal
import { IProduct } from "@/types/product-type";// Type definition for product
import ProductGridAction from "./product-grid-action"; // Component for product actions (e.g., add to cart)

// Main ProductGridItem component for displaying individual product details
//This line defines a functional component named ProductGridItem in React. It takes a single product prop 
//of type IProduct (as defined in TypeScript), allowing TypeScript to enforce the structure of the product data. 
//This approach ensures that product has specific attributes required within the component, such as title, price, 
//and reviews.
const ProductGridItem = ({ product }: { product: IProduct }) => {
  // Destructure key properties from the product object to access them directly by name
  const { _id,img, title, sku, price, reviews, status, quantity } = product || {}; //Destructure product properties
  // averageRating
  // Define a variable to store the calculated average rating for the product
  const averageRating =
    // Check if the reviews array exists and has at least one review
    reviews && reviews?.length > 0
        // If true, calculate the average by summing all ratings and dividing by the number of reviews
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
          // If there are no reviews, set the average rating to 0

      : 0;
  return (
      // Main container for the product item with rounded corners, white background, and gray border styling

    <div className="rounded-md bg-white border-gray6 border">
    {/* Image section for the product, positioned relative to allow for absolute positioning of action buttons */}

      <div className="relative">
      {/* Clickable image link with a light gray background color */}

        <a href="#" className="inline-block bg-[#F2F3F5]">
          <Image
      // Full-width responsive image with specified dimensions and alt text for accessibility

            className="w-full"
            src={img}
            width={279}
            height={297}
            alt="product img"
          />
        </a>
        {/* Absolute positioning of the action component for adding interactions like "Add to Cart" */}
        {/* <ProductGridAction id={_id}/> is a child component passed the product’s unique _id identifier as a prop.
        This component likely provides interactive options, such as "Add to Cart" or "Wishlist," that a user can perform on this specific product. */}
        <div className="absolute top-5 right-5 z-10">
          <ProductGridAction id={_id}/>
        </div>
      </div>
      {/* Details section with padding for product title, rating, and price information */}

      <div className="px-5 py-5">
      {/* Clickable product title with styling for text size, font, and hover effects */}

        <a
          href="#"
          className="text-lg font-normal text-heading text-hover-primary mb-2 inline-block leading-none"
        >
          {title}
        </a>
        {/* Container for displaying product rating using stars with spacing between rating icons */}

        <div className="flex items-center space-x-1 text-tiny mb-5">
          <span className="text-yellow flex items-center space-x-1">
            <Rating
        // Fractional rating display with stars, initial value set to average rating, and read-only mode enabled
      
              allowFraction
              size={18}
              initialValue={averageRating}
              readonly={true}
            />
          </span>
        </div>
        {/*Section to display product price with specific font size and weight */}
        <div className="leading-none mb-2">
          <span className="text-base font-medium text-black">
            ${price.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductGridItem;
