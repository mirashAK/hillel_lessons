import { createSlice } from '@reduxjs/toolkit';

class Task {
    constructor(name = 'test', description, isCompleted = false,  id) {
        this.id = id || new Date().getTime();
        this.name = name;
        this.description = description ||  'test Descr';
        this.isCompleted = false;
    }
}

export const todoListSlice = createSlice({
    name: 'todoList',
    initialState: {
        value: [
            new Task('aaa','bbb', false, 1),
            new Task('ccc','ddd', true, 2)
        ]
    },
    reducers: {
        markTodoTask: state => {

        },
        delTodoTask: (state, action) => {
       
        },
        addTodoTask: (state, action) => {
            state.value = [...state.value, action.payload];
        }
    }
})

// Action creators are generated for each case reducer function
export const { markTodoTask, delTodoTask, addTodoTask } = todoListSlice.actions

export default todoListSlice.reducer
