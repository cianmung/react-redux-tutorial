import { createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      transformResponse: (users) => {
        return usersAdapter.setAll(initialState, users);
      },
      providesTags: (result, error, arg) => [
        { type: "User", id: "LIST" },
        ...result.ids.map((user) => ({ type: "User", id })),
      ],
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;
