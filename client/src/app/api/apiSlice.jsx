import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logIn, logOut } from '../../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token && token !== 'Guest') {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 403) {
        console.log("Access token expired. Attempting to refresh token...");
        const refreshResult = await baseQuery('auth/refresh', api, extraOptions);
        if (refreshResult.data) {
            console.log("Refresh token valid. Access token refreshed.");
            api.dispatch(logIn({ user: refreshResult.data.user, accessToken: refreshResult.data.accessToken }));
            result = await baseQuery(args, api, extraOptions);
        } else {
            console.log("Refresh token expired or invalid. Logging out.");
            api.dispatch(logOut());
        }
    }

    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
});