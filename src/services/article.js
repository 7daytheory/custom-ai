import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({
       baseurl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
       prepareHeaders: (header) => {
        headers.set('X-RapidAPI-Key', rapidApiKey);
        headers.set('X-RapidAPI-Host', 'article-extractor-and-summarizer.p.rapidapi.com');

        return headers;
       }
    }),
   endpoints: (builder) => ({
        getSummary: builder.query({
            query: (params) => 'test'
        })
    })
});