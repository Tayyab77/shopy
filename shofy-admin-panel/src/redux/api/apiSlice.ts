//apiSlice.ts (The Post Office):
//How the Process Works in Code:
//apiSlice.ts sets up how every request (letter) should be sent, including how to 
//attach an authentication token (if available) from the cookies to the headers.
//When authApi.ts defines loginAdmin, it’s adding a new request type to this existing 
//post office. So, when you call loginAdmin (send the login request), the post office 
//(apiSlice) handles it by attaching the necessary headers and routing it to the correct
// API endpoint (/api/admin/login).

import Cookies from "js-cookie"; // Importing js-cookie to manage cookies, particularly for retrieving stored user information like access tokens.
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"; // Importing functions from Redux Toolkit to create an API slice and handle fetching data.

// Creating the apiSlice using Redux Toolkit's createApi function
export const apiSlice = createApi({
  // Setting the unique key (name) for this slice in the Redux store, called "api"
  reducerPath: "api",

  // Defining the base query, which will handle all HTTP requests and manage headers
  baseQuery: fetchBaseQuery({
    // Setting the base URL for all API calls, fetched from environment variables (.env file)
    //This is created by combining baseUrl (http://localhost:7000) with the endpoint 
    //path defined in getAllProducts (/product/getAll).
    //http://localhost:7000/product/getAll
    //Exactly! Once the data is fetched from http://localhost:7000/product/getAll, and 
    // response recieved by the apiSlice 
    //the response is automatically stored in the Redux store through 
    //useGetAllProductsQuery.
    //1.Backend response hits addProduct mutation → triggers invalidatesTags: ['AllProducts'].
    //2.Redux Toolkit detects invalidated AllProducts tag → refetches useGetAllProductsQuery 
    //from the db if used in the UI. 
    //3.Key Line: [apiSlice.reducerPath]: apiSlice.reducer — This line in store.tsx 
    //connects apiSlice.reducer to the Redux store, "so whenever apiSlice processes a query
   //(like useGetAllProductsQuery), the Redux store automatically receives and stores the 
  //updated data, making it accessible throughout the app.This makes the updated product 
  //list readily" 
    //accessible across the application. Any component that uses useGetAllProductsQuery 
    //will automatically receive this fresh data from the store, allowing the UI to stay 
    //in sync with the backend without manual updates.
    // Inside the component, const { data } = useGetAllProductsQuery() provides access 
    //to this updated data directly. Any changes in data (from updates in the store) 
    //are reflected instantly.

    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    

    // Modifying the headers before every request, particularly to add the Authorization token if available
    prepareHeaders: async (headers, { getState, endpoint }) => {
      try {
        // Attempting to retrieve the user info (admin) stored in cookies, if it exists
        const userInfo = Cookies.get("admin");

        // If user info is found in the cookie, parse it to JSON
        if (userInfo) {
          const user = JSON.parse(userInfo);

          // If the user has an accessToken, set it in the request headers as a Bearer token
          if (user?.accessToken) {
            headers.set("Authorization", `Bearer ${user.accessToken}`);
          }
        }
      } catch (error) {
        // Catch and log any error that occurs while parsing the user info or setting the token
        console.error("Error parsing user info:", error);
      }

      // Finally, return the modified headers object with or without the Authorization token
      return headers;
    },
  }),

  // The endpoints object is where API requests will be defined. It's currently empty.
  endpoints: (builder) => ({}),

  // Defining the tags that will help manage caching and refetching data for specific parts of the UI
  tagTypes: [
    "DashboardAmount",              // Related to the dashboard's total amount section
    "DashboardSalesReport",         // Related to the sales report on the dashboard
    "DashboardMostSellingCategory", // Related to most selling categories on the dashboard
    "DashboardRecentOrders",        // Related to recent orders displayed on the dashboard
    "AllProducts",                  // For managing product-related data
    "StockOutProducts",             // For managing stock-out products
    "AllCategory",                  // For managing all categories
    "AllBrands",                    // For managing all brands
    "getCategory",                  // For retrieving a specific category
    "AllOrders",                    // For handling orders data
    "getBrand",                     // For retrieving a specific brand
    "ReviewProducts",               // For managing product reviews
    "AllCoupons",                   // For managing coupon-related data
    "Coupon",                       // For handling individual coupon data
    "AllStaff",                     // For handling all staff-related data
    "Stuff"                         // For handling specific "stuff" or staff-related information
  ],
});


// import Cookies from "js-cookie";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
//     prepareHeaders: async (headers, { getState, endpoint }) => {
//       try {
//         const userInfo = Cookies.get("admin");
//         if (userInfo) {
//           const user = JSON.parse(userInfo); 
//           if (user?.accessToken) {
//             headers.set("Authorization", `Bearer ${user.accessToken}`);
//           }
//         }
//       } catch (error) {
//         console.error("Error parsing user info:", error);
//       }
//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({}),
//   tagTypes: [
//     "DashboardAmount",
//     "DashboardSalesReport",
//     "DashboardMostSellingCategory",
//     "DashboardRecentOrders",
//     "AllProducts",
//     "StockOutProducts",
//     "AllCategory",
//     "AllBrands",
//     "getCategory",
//     "AllOrders",
//     "getBrand",
//     "ReviewProducts",
//     "AllCoupons",
//     "Coupon",
//     "AllStaff",
//     "Stuff"
//   ],
// });

// //admin-panel\src\redux\api\apiSlice.ts