"use client";
import React, { useState } from "react";
import { useGetAllProductsQuery } from "@/redux/product/productApi";
import ErrorMsg from "../../common/error-msg";
import ProductGridItem from "./product-grid-item";
import Pagination from "../../ui/Pagination";
import { Search } from "@/svg";
import Link from "next/link";
import usePagination from "@/hooks/use-pagination";

const ProductGridArea = () => {
  //In this code snippet, the component ProductGridArea uses a custom hook 
  //useGetAllProductsQuery() to fetch product data, and it destructures(Destructuring 
  //is a technique that allows you to unpack values from arrays or objects into separate 
  //variables) the result 
  //into three variables: data (renamed to products), isError, and isLoading. 
  //Here’s what each part is doing:
  const { data: products, isError, isLoading } = useGetAllProductsQuery();
  //products?.data checks: if products exists; if it does, it accesses its data property. 
  //If products is undefined, it safely returns undefined without causing an error.
//usePagination is a custom hook (or function) that handles pagination logic.
//1.usePagination is a custom hook (or function) that handles pagination logic.
//2.10: This number specifies the number of items per page
  const paginationData = usePagination(products?.data || [], 10);
 // The line const { currentItems, handlePageClick, pageCount } = paginationData; 
 //destructures properties from paginationData, which is likely a custom hook or 
 //function that manages pagination.
//currentItems contains the current set of items displayed on the page (e.g., a subset of 
//products).
//handlePageClick is a function to handle user clicks for page navigation, updating the 
//displayed items.
//pageCount represents the total number of pages available based on the item count and items per page.
//This setup allows easy control of pagination within the component.
//It makes displaying paginated items straightforward and interactive.
  const { currentItems, handlePageClick, pageCount } = paginationData;
  //This line initializes a state variable searchValue with an empty string, setting it up 
  //to store the user's search input. The setSearchValue function updates searchValue as 
  //the user types.
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectValue, setSelectValue] = useState<string>("");

  // search field
  //This function updates the searchValue state with the current text input whenever the 
  //user types in the search field. It takes the event from an input field and sets 
  //searchValue to the input's value.
  const handleSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  // handle select input
  const handleSelectField = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setSelectValue(e.target.value);
  };

  // decide what to render
  // Initializes content variable to null. It will later hold JSX elements based on conditions.
  let content = null;

  // Sets content to show a "Loading..." message while data is being fetched.
  if (isLoading) {
    content = <h2>Loading....</h2>;
  }
  // If loading is complete but there was an error, displays an error message.
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
//  // If loading is complete, there’s an error, and the products list is empty, shows "No Products Found" message.
  if (!isLoading && isError && products?.data.length === 0) {
    content = <ErrorMsg msg="No Products Found" />;
  }
//If no loading or error and products are successfully loaded, creates a reversed copy of `currentItems`.

  if (!isLoading && !isError && products?.success) {
    let productItems =[...currentItems].reverse();

    // search field
      // Check if searchValue exists and filter products by the search field
    if (searchValue) {
      productItems = productItems.filter((p) =>
        p.title.toLowerCase().includes(searchValue.toLowerCase())
      );
// Filters `productItems` based on `searchValue`, matching titles that include the search text, case-insensitive.

    }
  // Check if selectValue exists and filter products by selected product type

    if (selectValue) {
  // Further filters `productItems` by `selectValue`, showing items of the selected product type.
   productItems = productItems.filter((p) => p.productType === selectValue);
    }

    content = (
      <>
       {/* Main product grid container */}
        <div className="relative mx-8 mb-5">
             {/* Product grid layout with responsive columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 ">
             {/* Map through each product and render ProductGridItem component */}
            {productItems.map((prd) => (
              <ProductGridItem key={prd._id} product={prd} />
            ))}
          </div>
        </div>

     {/* Bottom section: Display product count and pagination */}
        {/* bottom  */}
        <div className="flex justify-between items-center flex-wrap mx-8">
      {/* Showing number of current items vs total items */}    
          <p className="mb-0 text-tiny">
            Showing {currentItems.length} of{" "}
            {products?.data.length}
          </p>
            {/* Pagination controls */}
          <div className="pagination py-3 flex justify-end items-center mx-8 pagination">
            <Pagination
              handlePageClick={handlePageClick}
              pageCount={pageCount}
            />
          </div>
        </div>
      </>
    );
  }
  return (
    <div className="bg-white rounded-t-md rounded-b-md shadow-xs py-4">
      {/* Top section with search and filter functionality */}
      <div className="tp-search-box flex items-center justify-between px-8 py-8 flex-wrap">
        {/* Search input field */}
        <div className="search-input relative">
          <input
          // Function to handle search input changes
            onChange={handleSearchProduct}
            className="input h-[44px] w-full pl-14"
            type="text"
            placeholder="Search by product name"
          />
          {/* Search button with icon */}
          <button className="absolute top-1/2 left-5 translate-y-[-50%] hover:text-theme">
            <Search />
          </button>
        </div>
         {/* Filter and Add Product buttons */}
        <div className="flex sm:justify-end sm:space-x-6 flex-wrap">
           {/* Dropdown for category selection */}
          <div className="search-select mr-3 flex items-center space-x-3 ">
            <span className="text-tiny inline-block leading-none -translate-y-[2px]">
              Categories :{" "}
            </span>
            {/* Handle category selection */}
            <select onChange={handleSelectField}>
                <option value="">Categories</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="beauty">beauty</option>
                <option value="jewelry">jewelry</option>
              </select>
          </div>
           {/* Add Product button linking to add-product page */}
          <div className="product-add-btn flex ">
            <Link href="/add-product" className="tp-btn">
              Add Product
            </Link>
          </div>
        </div>
      </div>
      {content} {/* Render the content created above based on conditions */}
    </div>
  );
};

export default ProductGridArea;
//from here it will go to product-grid-item

// Exactly! The flow works as follows:

// Preparation Stage (Front-end components):

// In product-grid-area.tsx, useGetAllProductsQuery is called at the top of the file to prepare for product fetching.
// This starts the data retrieval process and allows the component to use the products data once it’s returned from the API.
// productItems.map prepares each product’s data, passing it to ProductGridItem.
// ProductGridItem and ProductGridAction set up the product details and action buttons layout, all before any API data is
// Actually displayed.API Call (Back-end interaction):

// Once useGetAllProductsQuery is called, it triggers getAllProducts in productApi.
// This query makes a direct request to the backend (/products endpoint) to fetch all product data.
// The API then sends back the product list, which is mapped and displayed in the grid format in product-grid-area.tsx.
// So, the front-end component setup acts as a preparatory phase that defines where and how the data will display, and
//  only after this does the actual API call fetch the necessary data for rendering.











