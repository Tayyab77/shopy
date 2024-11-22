"use client";
import Link from "next/link";
import React, { useState } from "react";
import ProductTableHead from "./prd-table-head";
import ProductTableItem from "./prd-table-item";
import Pagination from "../../ui/Pagination";
import { Search } from "@/svg";
import ErrorMsg from "../../common/error-msg";
import { useGetAllProductsQuery } from "@/redux/product/productApi";
import usePagination from "@/hooks/use-pagination";

// Main functional component for displaying the product list
const ProductListArea = () => {
    // Fetching product data and loading/error states from the API
  const { data: products, isError, isLoading } = useGetAllProductsQuery();
  // Setting up pagination (8 products per page)
  const paginationData = usePagination(products?.data || [], 8);
  const { currentItems, handlePageClick, pageCount } = paginationData;

    // Local states for handling search and select input values
    // State to store search value
  const [searchValue, setSearchValue] = useState<string>("");
  // State to store selected product status
  const [selectValue, setSelectValue] = useState<string>("");

 

  // search field
  // Function to handle search input changes (to filter products by name)
  const handleSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
 // Update the searchValue state with the input text
    setSearchValue(e.target.value);
  };

  // handle select input
  // Function to handle changes in the product status dropdown (filter by stock status)
  const handleSelectField = (e: React.ChangeEvent<HTMLSelectElement>) => {
  // Update the selectValue state with the selected option  
    setSelectValue(e.target.value);
  };

  // decide what to render
 // Variable to hold what content will be displayed (loading, error, or the table)
  let content = null;
// If the data is loading, show "Loading...."
  if (isLoading) {
    content = <h2>Loading....</h2>;
  }

  // If there is an error fetching the data, show an error message
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }

  // If no products are found, show a "No Products Found" message
  if (!isLoading && isError && products?.data.length === 0) {
    content = <ErrorMsg msg="No Products Found" />;
  }

   // If data is loaded successfully and there's no error
  if (!isLoading && !isError && products?.success) {
   // Reverse the current items for display (just for visual order) 
    let productItems = [...currentItems].reverse();

    // search field
        // If there's a search term, filter the products by name (case insensitive)
    if (searchValue) {
      productItems = productItems.filter((p) =>
        p.title.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
 // If a product status is selected, filter products by the selected status
    if (selectValue) {
      productItems = productItems.filter((p) => p.status === selectValue);
    }
    // Now set the content to render the table and pagination

    content = (
      <>
        <div className="relative overflow-x-auto  mx-8">
          <table className="w-full text-base text-left text-gray-500">
            {/* table head start */}
            <ProductTableHead />
            {/* table head end */}
            <tbody>
              {productItems.map((prd) => (
                <ProductTableItem key={prd._id} product={prd} />
              ))}
            </tbody>
          </table>
        </div>

        {/* bottom  */}
        <div className="flex justify-between items-center flex-wrap mx-8">
          <p className="mb-0 text-tiny">
            Showing {currentItems.length} of{" "}
            {products?.data.length}
          </p>
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

  // Return the final JSX (structure of the page)
  return (
    <>
       {/* Start of the main container for the product list */}
      {/* table start */}
      <div className="bg-white rounded-t-md rounded-b-md shadow-xs py-4">
        <div className="tp-search-box flex items-center justify-between px-8 py-8">
          <div className="search-input relative">
            <input
            // Call handleSearchProduct on input change
            // When selection changes, call handleSelectField
              onChange={handleSearchProduct}
              className="input h-[44px] w-full pl-14"
              type="text"
              placeholder="Search by product name"
            />
            <button className="absolute top-1/2 left-5 translate-y-[-50%] hover:text-theme">
              <Search />
            </button>
          </div>
          <div className="flex justify-end space-x-6">
            <div className="search-select mr-3 flex items-center space-x-3 ">
              <span className="text-tiny inline-block leading-none -translate-y-[2px]">
                Status :{" "}
              </span>
         
              <select onChange={handleSelectField}>
                <option value="">Status</option>
                <option value="in-stock">In stock</option>
                <option value="out-of-stock">Out of stock</option>
              </select>
            </div>
            <div className="product-add-btn flex ">
              <Link href="/add-product" className="tp-btn">
                Add Product
              </Link>
            </div>
          </div>
        </div>
        {content}
      </div>
      {/* table end */}
    </>
  );
};

export default ProductListArea;
