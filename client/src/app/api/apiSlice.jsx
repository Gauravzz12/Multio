import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logIn, logOut } from '../../features/auth/authSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token;
        if (token && token!='Guest') {
            console.log("Setting Token");
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);
    if (result?.error?.status === 403) {
        console.log("Sending Refresh Token");
        const refreshResult = await baseQuery('auth/refresh', api, extraOptions);
        if (refreshResult.data) {
            const user = api.getState().auth.user;
            api.dispatch(logIn({ ...refreshResult.data, user }));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
        }
    }

    return result;
};

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
});