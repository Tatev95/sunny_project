import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";

export const signInSelector = (state: RootState) => state.login;

export const usersSelector = createSelector(
  signInSelector,
  (signIn) => signIn.users
);

export const loadingSelector = createSelector(
  signInSelector,
  (signIn) => signIn.isLoading
);

export const currentUserSelector = createSelector(
  signInSelector,
  (signIn) => signIn.currentUser
);

export const userSelector = createSelector(
  signInSelector,
  (signIn) => signIn.user
);
