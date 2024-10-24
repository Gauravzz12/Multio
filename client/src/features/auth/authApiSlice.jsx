import { apiSlice } from "../../app/api/apisSlice";

export const authApiSlice=apiSlice.injectEndpoints({
    endpoints:builder=>({
        login:builder.mutation({
            query:credentials=>({
                url:'/auth',
                method:'POST',
                body:{...credentials}
            })
        }),
        
    })
})

export const {
    useLoginMutation
}=authApiSlice