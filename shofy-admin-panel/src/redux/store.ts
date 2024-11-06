
//admin-panel\src\redux\store.tsx
import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api/apiSlice'
import authSlice from './auth/authSlice'

export const store = configureStore({
  //Key Line: [apiSlice.reducerPath]: apiSlice.reducer — This line in store.tsx 
  //connects apiSlice.reducer to the Redux store, so whenever apiSlice processes a query 
  //(like useGetAllProductsQuery), the Redux store automatically receives and stores the 
  //updated data, making it accessible throughout the app.
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth:authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

