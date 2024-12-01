import { apiSlice } from "../../app/api/apiSlice";
import { logIn,logOut } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
      invalidatesTags: ['User'],
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    refresh: builder.query({
      query: () => ({
        url: "/auth/refresh",
        credentials: 'include'
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(logIn({ user: data.user, accessToken: data.accessToken, avatar: data.avatar }));
        } catch (err) {
          console.error("Token refresh failed:", err);
           dispatch(logOut());
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({ 
        url: "/auth/logout",
        method: "POST",
      }),
    })
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshQuery,
  useLogoutMutation,
} = authApiSlice;
