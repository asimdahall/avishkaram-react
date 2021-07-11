import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../axios";

export const getAllPosts = createAsyncThunk("posts/getAll", async () => {
  const response = await instance.get("/posts");
  return response.data;
});

export const addPost = createAsyncThunk("post/add", async (payload) => {
  try {
    const response = await instance.post("/posts", payload);
    return response.data;
  } catch (e) {
    console.log(e);
  }
});

export const deletePost = createAsyncThunk("posts/delete", async (payload) => {
  await instance.delete(`/posts/${payload}`);
  return payload;
});

export const updatePost = createAsyncThunk("posts/update", async (payload) => {
  const response = await instance.patch(`/posts/${payload.id}`, payload);
  return response.data;
});
