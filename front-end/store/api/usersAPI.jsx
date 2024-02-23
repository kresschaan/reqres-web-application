import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const usersApi = createApi({
    reducerPath: "createUsers",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3010",
    }),
    endpoints(builder) {
        return {
            fetchUsers: builder.query({
                providesTags: ["User"],
                query: () => {
                    return {
                        url: "/users",
                        method: "GET",
                    };
                },
            }),
            fetchUserID: builder.query({
                query: (user) => {
                    return {
                        url: "/users",
                        method: "GET",
                        params: {
                            id: user,
                        },
                    };
                },
            }),
            addUser: builder.mutation({
                invalidatesTags: ["User"],
                query: (user) => {
                    return {
                        url: "/users/create",
                        method: "POST",
                        body: user,
                    };
                },
            }),
        };
    },
});

export const { useFetchUsersQuery, useFetchUserIDQuery, useAddUserMutation } =
    usersApi;
export { usersApi };
