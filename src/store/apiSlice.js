import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseURI = 'https://localhost:8088';

export const apiSlice = createApi({
    baseQuery:fetchBaseQuery({baseUrl: baseURI}),
    endpoints: builder =>({
        //getCategories
        getCategories: builder.query({
            query:() => '/get_Categories',
            providesTags:['categories']
        }),

        //get Labels
        getLabels: builder.query({
            query:()=>'/get_Labels',
            providesTags:['transaction']
        }),

        //add new Transaction
        addTranasaction: builder.mutation({
            query:(userdata)=>({
                url:'/create_Transaction',
                method:"POST",
                body:userdata
            }),
            invalidatesTags:['transaction']
        }),

        //delete record
        deleteTransaction: builder.mutation({
            query:recordid=>({
                url:'/delete_Transaction',
                method:"DELETE",
                body:recordid
            }),
            invalidatesTags:['transaction']
        })

    })
})

export default apiSlice;