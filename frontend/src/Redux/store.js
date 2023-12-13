import { configureStore } from "@reduxjs/toolkit";
import posts from "./slices/slicePosts";
import auth from "./slices/sliceAuth";
export const store = configureStore({
  reducer: {
    posts,
    auth,
  },
});
