import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { addPost, deletePost, getAllPosts, updatePost } from "./thunks";

export const postsAdapter = createEntityAdapter({
  selectId: (post) => post.id,
});

const postsSlice = createSlice({
  name: "posts",
  initialState: postsAdapter.getInitialState({
    loading: "idle",
  }),
  reducers: {
    addAllPost: postsAdapter.addMany,
  },
  extraReducers: {
    [updatePost.fulfilled]: (state, action) => {
      postsAdapter.updateOne(state, {
        id: action.payload.id,
        changes: {
          title: action.payload.title,
          body: action.payload.body,
        },
      });
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.loading = "fulfilled";
      postsAdapter.addMany(state, action.payload);
    },
    [addPost.fulfilled]: (state, action) => {
      postsAdapter.addOne(state, action.payload);
    },
    [deletePost.fulfilled]: (state, action) => {
      postsAdapter.removeOne(state, action.payload);
    },
  },
});

const { reducer: postReducer } = postsSlice;

export default postReducer;
