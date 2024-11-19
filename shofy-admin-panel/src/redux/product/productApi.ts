import { apiSlice } from "../api/apiSlice";
import { IAddProduct,IReviewProductRes, ProductResponse } from "@/types/product-type";


//In productApi.ts, the interface IProductResponse defines the structure of the 
//response expected when interacting with product-related API endpoints. Here's a
//breakdown of its properties:
interface IProductResponse {
  success: boolean;
  status: string;
  message: string;
  data: any;
}

interface IProductEditResponse {
  data: IAddProduct;
  message: string;
}

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // getUserOrders
    getAllProducts: builder.query<ProductResponse, void>({
      query: () => `/api/product/all`,
      providesTags: ["AllProducts"],
      keepUnusedDataFor: 600,
    }),
    // add product
    //addProduct Mutation: This mutation is designed to send a request to the server to add
    // a new product.
    //The builder.mutation method is used to define a mutation (i.e., a non-GET operation, 
    //usually a POST, PUT, or DELETE).
    addProduct: builder.mutation<IProductResponse, IAddProduct>({
      // Yes, exactly! We call it "defining a type" when we use interfaces like 
      //IAddProduct to set specific rules for the shape and format of data. By defining 
      //this type, TypeScript can ensure that any object passed to query(data: IAddProduct)
      // meets those exact requirements. 
      query(data: IAddProduct) {
        return {
          url: `/api/product/add`, 
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["AllProducts"],
    }),
    // edit product
    editProduct: builder.mutation<
      IProductEditResponse,
      { id: string; data: Partial<IAddProduct> }
    >({
  //query({ id, data }): This is a function that takes an object as an argument with 
  //two properties: id and data. The id refers to the product ID that needs to be edited, 
  //and data represents the updated information for that product.
      query({ id, data }) {
        return {
          url: `/api/product/edit-product/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["AllProducts"],
    }),
    // get single product
    getProduct: builder.query<IAddProduct, string>({
      query: (id) => `/api/product/single-product/${id}`,
    }),
    // get single product
    getReviewProducts: builder.query<IReviewProductRes, void>({
      query: () => `/api/product/review-product`,
      providesTags: ["ReviewProducts"]
    }),
    // get single product
    getStockOutProducts: builder.query<IReviewProductRes, void>({
      query: () => `/api/product/stock-out`,
      providesTags: ["StockOutProducts"]
    }),
     // delete category
     deleteProduct: builder.mutation<{message:string}, string>({
      query(id: string) {
        return {
          url: `/api/product/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AllProducts"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useAddProductMutation,
  useEditProductMutation,
  useGetProductQuery,
  useGetReviewProductsQuery,
  useGetStockOutProductsQuery,
  useDeleteProductMutation,
} = authApi;
