import { configureStore, getDefaultMiddleware  } from '@reduxjs/toolkit';
import todoListReducer from './todoListSlice';

export default configureStore({
    reducer: {
        todoList: todoListReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})
