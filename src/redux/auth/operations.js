import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const backEnd = axios.create({
  baseURL: "https://connections-api.goit.global/",
});
const setAuthTokens = (token) => {
  backEnd.defaults.headers.common.Authorization = `Bearer ${token}`;
};
const deleteAuthToken = () => {
  backEnd.defaults.headers.common.Authorization = "";
};
export const register = createAsyncThunk(
  "auth/register",
  async (dataRes, thunkAPI) => {
    try {
      const response = await backEnd.post("/users/signup", dataRes);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const logIn = createAsyncThunk(
  "auth/login",
  async (dataRes, thunkAPI) => {
    try {
      const response = await backEnd.post("/users/login", dataRes);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const response = await backEnd.post("/users/logout");
    deleteAuthToken();
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
export const refreshAuth = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
      // If there is no token, exit without performing any request
      return thunkAPI.rejectWithValue("Unable to fetch user");
    }

    try {
      setAuthTokens(persistedToken);
      const response = await backEnd.get("users/current");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
