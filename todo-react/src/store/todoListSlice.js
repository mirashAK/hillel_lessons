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
        value: []
    },
    reducers: {
        markTodoTask: (state, action) => {
            const taskId = action.payload;
            const taskIndex = state.value.findIndex((task) => task.id === taskId);
            const updatedTask = [...state.value];
            updatedTask[taskIndex].isCompleted = !updatedTask[taskIndex].isCompleted
            state.value = updatedTask;
        },
        delTodoTask: (state, action) => {
            const taskId = action.payload;
            const updatedTask = state.value.reduce((acc, task)=>{
                if (task.id !== taskId) acc.push(task);
                return acc;
            }, []);
            state.value = updatedTask;
        },
        addTodoTask: (state, action) => {
            const {name, description} = action.payload
            state.value = [...state.value, new Task(name, description)];
        }
    }
})

export const { markTodoTask, delTodoTask, addTodoTask } = todoListSlice.actions

export default todoListSlice.reducer
