import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";

export const signUpSelector = (state: RootState) => state.signup;

export const successMessageSelector = createSelector(
  signUpSelector,
  (signup) => signup.successMessage
);
