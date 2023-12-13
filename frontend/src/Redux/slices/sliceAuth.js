import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../API/axios";

const initialState = {
  data: null,
  status: "loading",
};

export const fetchUser = createAsyncThunk("auth/fethcUser", async (params) => {
  const { data } = await axios.post("/auth/login", params);

  return data;
});

export const fetchUserMe = createAsyncThunk("auth/fethcUserMe", async () => {
  const { data } = await axios.get("/auth/user");

  return data;
});

export const fetchUserRegister = createAsyncThunk(
  "auth/fethcUserReg",
  async (params) => {
    const { data } = await axios.post("/auth/register", params);

    return data;
  }
);

const sliceAuth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    // user
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchUser.pending, (state, action) => {
      state.data = action.payload;
      state.status = "loading";
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.status = "error";
    });
    // me
    builder.addCase(fetchUserMe.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchUserMe.pending, (state, action) => {
      state.data = action.payload;
      state.status = "loading";
    });
    builder.addCase(fetchUserMe.rejected, (state, action) => {
      state.status = "error";
    });
    // register
    builder.addCase(fetchUserRegister.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = "success";
    });
    builder.addCase(fetchUserRegister.pending, (state, action) => {
      state.data = action.payload;
      state.status = "loading";
    });
    builder.addCase(fetchUserRegister.rejected, (state, action) => {
      state.status = "error";
    });
  },
});

export const { logout } = sliceAuth.actions;
export const selectIsAuth = (state) => Boolean(state.auth.data);

export default sliceAuth.reducer;
