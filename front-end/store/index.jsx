import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./api/usersAPI";

export const store = configureStore({
    reducer: {
        [usersApi.reducerPath]: usersApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(usersApi.middleware);
    },
});

export {
    useFetchUsersQuery,
    useFetchUserIDQuery,
    useAddUserMutation,
} from "./api/usersAPI";
