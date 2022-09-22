import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {fetchTodos, fetchTodo} from './requests/todos';

class Task {
    constructor(name = 'test', description, isCompleted = false,  id) {
        this.id = id || new Date().getTime();
        this.name = name;
        this.description = description ||  'test Descr';
        this.isCompleted = false;
    }
}

const initialState = {
  tasks: [],
  status: 'idle',
  error: null
}

export const fetchTodosThunk = createAsyncThunk('todoList/fillTodos', async () => {
  const response = await fetchTodos();
  console.log('fetchTodosThunk', response);
  return response;
})

export const todoListSlice = createSlice({
    name: 'todoList',
    initialState: initialState,
    reducers: {
        markTodoTask: (state, action) => {
            const taskId = action.payload;
            const taskIndex = state.tasks.findIndex((task) => task.id === taskId);
            const updatedTask = [...state.tasks];
            updatedTask[taskIndex].isCompleted = !updatedTask[taskIndex].isCompleted
            state.tasks = updatedTask;
        },
        delTodoTask: (state, action) => {
            const taskId = action.payload;
            const updatedTask = state.tasks.reduce((acc, task)=>{
                if (task.id !== taskId) acc.push(task);
                return acc;
            }, []);
            state.tasks = updatedTask;
        },
        addTodoTask: (state, action) => {
            const {name, description} = action.payload
            state.tasks = [...state.tasks, new Task(name, description)];
        },
        fillTodos: (state, action) => {
            console.log('fillTodos', action.payload);
            const tasks = action.payload
            state.tasks = tasks;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTodosThunk.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchTodosThunk.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const tasks = action.payload
                state.tasks = tasks;
            })
            .addCase(fetchTodosThunk.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})

export const { markTodoTask, delTodoTask, addTodoTask } = todoListSlice.actions

export default todoListSlice.reducer
