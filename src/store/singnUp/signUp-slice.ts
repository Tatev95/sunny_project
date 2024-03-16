import { createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  editUser,
  getCurrentUser,
  getUsers,
} from "../../services/requests/users/requests";
import { NewUserType, UserType } from "../../types";

type signupState = {
  users: NewUserType[] | null;
  isLoading: boolean;
  successMessage: string
};

const initialState: signupState = {
  users: [],
  isLoading: false,
  successMessage: ''
};

const signUpSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(createUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
      state.successMessage = 'success, user is created'
    });
    builder.addCase(createUser.rejected, (state) => {
      state.isLoading = true;
    });
   
  },
});

export const { } = signUpSlice.actions;

export default signUpSlice.reducer;
