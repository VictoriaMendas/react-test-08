import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://connections-api.goit.global/";

export const register = createAsyncThunk(
  "auth/register",
  async (obj, thunkAPI) => {
    try {
      const response = await axios.post("/users/signup", obj);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const logIn = createAsyncThunk("auth/login", async (_, thunkAPI) => {
  try {
    const response = await axios.post("/users/login");
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});
