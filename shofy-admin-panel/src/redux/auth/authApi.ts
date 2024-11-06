//Imagine apiSlice.ts is like a big post office, and the authApi.ts is a 
//special mailbox for sending specific letters (login, registration, etc.) 
//to the library admin.
//In your code, apiSlice.ts is like this post office, managing the base setup for 
//sending requests (like how to attach headers with authentication). This is done by 
//configuring the baseQuery and prepareHeaders to include tokens from the cookies.
import Cookies from "js-cookie";
import { apiSlice } from "@/redux/api/apiSlice";
import { userLoggedIn } from "./authSlice";
import { IAddStuff, IAdminGetRes, IAdminLoginAdd, IAdminLoginRes, IAdminRegisterAdd, IAdminRegisterRes, IAdminUpdate, IAdminUpdateRes, IStuff } from "@/types/admin-type";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // registerAdmin
    registerAdmin: builder.mutation<IAdminRegisterRes, IAdminRegisterAdd>({
      query: (data) => ({
        url: "api/admin/register",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const { token, ...others } = result.data;
          Cookies.set(
            "admin",
            JSON.stringify({
              accessToken: token,
              user: others
            }),
            { expires: 0.5 }
          );

          dispatch(
            userLoggedIn({
              accessToken: token,
              user: others
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    // login
    //Yes, the action from loginAdmin({ email, password }) in login-form.tsx will
    // hit the function you mentioned in authApi.ts directly. This function is part
    //of the API slice and defines how the login request will be handled.
   //The Redux API slice is a part of Redux Toolkit that helps manage API calls efficiently.
  // It simplifies the process of handling asynchronous operations like fetching or 
  //sending data to a server. In your case, the authApi.ts file is an API slice. 
 //In authApi.ts, there will be a builder.mutation defined for handling the login,
// making an API call to your backend to check if the user can log in.
//So, after the action is dispatched from login-form.tsx, it is managed by authApi.ts
// where the actual API call to the backend is handled. 
    loginAdmin: builder.mutation<IAdminLoginRes, IAdminLoginAdd>({
      query: (data) => ({
        url: "api/admin/login",
        method: "POST",
        body: data,
      }),
        // Handle response after the API call completes
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const { token, ...others } = result.data;
          Cookies.set(
            "admin",
            JSON.stringify({
              accessToken: token,
              user: others
            }),
            { expires: 0.5 }
          );

          dispatch(
            userLoggedIn({
              accessToken: token,
              user: others
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    // reset password
    forgetPassword: builder.mutation<{message:string},{email:string}>({
      query: (data) => ({
        url: "api/admin/forget-password",
        method: "PATCH",
        body: data,
      }),
    }),
    // confirmForgotPassword
    adminConfirmForgotPassword: builder.mutation<{message:string},{token:string,password:string}>({
      query: (data) => ({
        url: "api/admin/confirm-forget-password",
        method: "PATCH",
        body: data,
      }),
    }),
    // change password
    adminChangePassword: builder.mutation<{ message: string }, { email: string; oldPass: string; newPass: string }>({
      query: (data) => ({
        url: "api/admin/change-password",
        method: "PATCH",
        body: data,
      }),
    }),
    // updateProfile password
    updateProfile: builder.mutation<IAdminUpdateRes, { id: string, data: IAdminUpdate }>({
      query: ({ id, ...data }) => ({
        url: `/api/admin/update-stuff/${id}`,
        method: "PATCH",
        body: data.data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const { token, ...others } = result.data;
          Cookies.set(
            "admin",
            JSON.stringify({
              accessToken: token,
              user: others
            }),
            { expires: 0.5 }
          );

          dispatch(
            userLoggedIn({
              accessToken: token,
              user: others
            })
          );
        } catch (err) {
          // do nothing
        }
      },
      invalidatesTags:["AllStaff"]
    }),
    addStaff: builder.mutation<{ message: string }, IAddStuff>({
      query: (data) => ({
        url: "api/admin/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AllStaff"]
    }),
    // get all categories
    getAllStaff: builder.query<IAdminGetRes, void>({
      query: () => `/api/admin/all`,
      providesTags: ["AllStaff"],
      keepUnusedDataFor: 600,
    }),
    // delete category
    deleteStaff: builder.mutation<{ message: string }, string>({
      query(id: string) {
        return {
          url: `/api/admin/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["AllStaff"],
    }),
    // get single product
    getStuff: builder.query<IStuff, string>({
      query: (id) => `/api/admin/get/${id}`,
      providesTags: ['Stuff']
    }),
  }),
});

export const {
  useLoginAdminMutation,
  useRegisterAdminMutation,
  useForgetPasswordMutation,
  useAdminConfirmForgotPasswordMutation,
  useAdminChangePasswordMutation,
  useUpdateProfileMutation,
  useGetAllStaffQuery,
  useAddStaffMutation,
  useDeleteStaffMutation,
  useGetStuffQuery,
} = authApi;

//admin-panel\src\redux\auth\authApi.ts