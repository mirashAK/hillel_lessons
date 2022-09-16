import { configureStore } from '@reduxjs/toolkit';
import todoListReducer from './todoListSlice';

export default configureStore({
    reducer: {
        todoList: todoListReducer
    }
})
