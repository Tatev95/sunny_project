import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { NewUserType } from "../../../types";

export const getUsers = createAsyncThunk(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:8080/users`);
      return res.data;
    } catch (e) {
      return rejectWithValue("error");
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "users/getCurrentUser",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:8080/users/${id}`);
      return res.data;
    } catch (e) {
      return rejectWithValue("error");
    }
  }
);

export const createUser = createAsyncThunk(
  "users/createUser",
  async (userData: NewUserType, { rejectWithValue }) => {
    try {
      const res = await axios.post("http://localhost:8080/users", userData);
      return res.data;
    } catch (error) {
      return rejectWithValue("error");
    }
  }
);

export const editUser = createAsyncThunk(
  "users/editUser",
  async (
    { userId, updatedUser }: { userId: string; updatedUser: NewUserType },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/users/${userId}`,
        updatedUser
      );
      return res.data;
    } catch (error) {
      return rejectWithValue("error");
    }
  }
);
