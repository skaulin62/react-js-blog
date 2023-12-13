import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../API/axios";

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (params) => {
    const { data } = await axios.get(
      "/posts?sort=" + params.sort + "&filter=" + params.filter
    );

    return data;
  }
);

export const fetchTags = createAsyncThunk("tags/fetchTags", async () => {
  const { data } = await axios.get("/tags");

  return data;
});

export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id) => {
    const { data } = await axios.delete("/posts/" + id);

    return data;
  }
);

export const fetchAddComment = createAsyncThunk(
  "posts/fetchAddComment",
  async (params) => {
    const { data } = await axios.post("/comments", params);

    return data;
  }
);

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async () => {
    const { data } = await axios.get("/comments");
    return data;
  }
);

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
  comments: {
    items: [],
    status: "loading",
  },
};

const slicePosts = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get posts
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "success";
    });
    builder.addCase(fetchPosts.pending, (state, action) => {
      state.posts.status = "loading";
    });
    builder.addCase(fetchPosts.rejected, (state, action) => {
      state.posts.status = "error";
    });
    //get tags
    builder.addCase(fetchTags.fulfilled, (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "success";
    });
    builder.addCase(fetchTags.pending, (state, action) => {
      state.tags.status = "loading";
    });
    builder.addCase(fetchTags.rejected, (state, action) => {
      state.tags.status = "error";
    });
    // remove post
    builder.addCase(fetchRemovePost.fulfilled, (state, action) => {
      state.posts.items = state.posts.items.filter(
        (item) => item._id !== action.payload._id
      );
      state.posts.status = "success";
    });
    builder.addCase(fetchRemovePost.pending, (state, action) => {
      state.posts.status = "loading";
    });
    builder.addCase(fetchRemovePost.rejected, (state, action) => {
      state.posts.status = "error";
    });
    // get comments
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = "success";
    });
    builder.addCase(fetchComments.pending, (state, action) => {
      state.comments.status = "loading";
    });
    builder.addCase(fetchComments.rejected, (state, action) => {
      state.comments.status = "error";
    });

    // add comment
    builder.addCase(fetchAddComment.fulfilled, (state, action) => {});
    builder.addCase(fetchAddComment.pending, (state, action) => {});
    builder.addCase(fetchAddComment.rejected, (state, action) => {});
  },
});

export const postsReducer = slicePosts.actions;

export default slicePosts.reducer;
