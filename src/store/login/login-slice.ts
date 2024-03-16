import { createSlice } from "@reduxjs/toolkit";
import {
  editUser,
  getCurrentUser,
  getUsers,
} from "../../services/requests/users/requests";
import { UserType } from "../../types";

type logInState = {
  users: UserType[] | null;
  isLoading: boolean;
  currentUser: {} | null;
  user: {} | null;
};

const initialState: logInState = {
  users: [],
  isLoading: false,
  currentUser: {},
  user: {},
};

const loginSlice = createSlice({
  name: "logIn",
  initialState,
  reducers: {
    setUser: (state: any, action) => {
      state.user = action.payload;
    },
    setCurrentUser: (state: any, action) => {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.isLoading = false;
      state.users = action.payload;
    });
    builder.addCase(getUsers.rejected, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCurrentUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(getCurrentUser.rejected, (state) => {
      state.isLoading = true;
    });

    builder.addCase(editUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(editUser.rejected, (state) => {
      state.isLoading = true;
    });
  },
});

export const { setUser, setCurrentUser } = loginSlice.actions;

export default loginSlice.reducer;
