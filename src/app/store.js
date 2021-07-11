import { configureStore } from "@reduxjs/toolkit";
import postReducer from "../slices/posts";

export const store = configureStore({
  reducer: {
    posts: postReducer,
  },
});
