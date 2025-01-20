// data layer or API layer in your application architecture.
//It interacts directly with the backend to fetch or manipulate data, 
//which is then passed to your components via custom hooks.

import { apiSlice } from "../api/apiSlice";
import {
  CategoryResponse,
  IAddCategory,
  IAddCategoryResponse,
  ICategoryDeleteRes,
} from "@/types/category-type";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // get all categories
    getAllCategories: builder.query<CategoryResponse, void>({
      query: () => `/api/category/all`,
      providesTags: ["AllCategory"],
      keepUnusedDataFor: 600,
    }),
    // add category
    // When you call one of the custom hooks, such as useGetAllCategoriesQuery, 
    // useAddCategoryMutation, etc., it triggers the appropriate endpoint inside 
    // apiSlice.
    // The custom hooks (e.g., useAddCategoryMutation) are used in your React 
    // components. These hooks interact with apiSlice.ts and ultimately send the 
    // request to the backend.
// Endpoint: A defined operation (like addCategory), which tells how to 
// interact with a specific path on the backend.
// Endpoint Path: The specific URL (like /api/category/add) where the request 
// is sent to.
    addCategory: builder.mutation<IAddCategoryResponse, IAddCategory>({
      query(data: IAddCategory) {
        return {
          url: `/api/category/add`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["AllCategory"],
    }),
    // delete category
    deleteCategory: builder.mutation<ICategoryDeleteRes, string>({
      query(id: string) {
        return {
          url: `/api/category/delete/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AllCategory"],
    }),
    // editCategory
    editCategory: builder.mutation<IAddCategoryResponse, { id: string; data: Partial<IAddCategory> }>({
      query({ id, data }) {
        return {
          url: `/api/category/edit/${id}`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["AllCategory","getCategory"],
    }),
    // get single product
    getCategory: builder.query<IAddCategory, string>({
      query: (id) => `/api/category/get/${id}`,
      providesTags:['getCategory']
    }),
  }),
});

// Here authApi is just object name and from here our endpoint i.e addCategory going directly
// to apiSlice only and from there going directly backend
export const {
  useGetAllCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
  useEditCategoryMutation,
  useGetCategoryQuery, 

  // CategoryApi of frontend
  // useAddCategoryMutation,
  // useGetProductTypeCategoryQuery,
  // useGetShowCategoryQuery,

} = authApi;
