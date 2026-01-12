import { configureStore } from '@reduxjs/toolkit';
import postReducer from '../features/posts/postSlice'
import usersReducer from '../features/users/usersSlice'

export const store = configureStore({
    reducer: {
        postManager: postReducer,
        usersManager: usersReducer,
    }
});