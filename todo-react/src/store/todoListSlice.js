import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {fetchTodos, fetchTodo, putTodo} from './requests/todos';

import delay from '../helpers/delay.js';
import REQ_STATS from '../helpers/statuses.js';

class Task {
    constructor(name = 'test', description, isCompleted = false,  id) {
        this.id = id || new Date().getTime();
        this.name = name;
        this.description = description ||  'test Descr';
        this.isCompleted = isCompleted || false;
    }
}

export const fetchTodosThunk = createAsyncThunk('todoList/fillTodos', async () => {
    const response = await fetchTodos();
    await delay(3000);
    return response;
})

export function markTodo(todoId) {
  return async function (dispatch, getState) {
        dispatch(markTodoTask(todoId));
        const todo = getState().todoList.tasks.filter((task)=>{
            return task.id === todoId;
        })
        const response = await putTodo(todo[0]);
        return response;
  }
}

export const todoListSlice = createSlice({
    name: 'todoList',
    initialState:  {
        tasks: [],
        status: REQ_STATS.IDLE,
        error: null
    },
    reducers: {
        markTodoTask: (state, action) => {
            const taskId = action.payload;
            const taskIndex = state.tasks.findIndex((task) => task.id === taskId);
            const updatedTask = [...state.tasks];
            updatedTask[taskIndex].isCompleted = !updatedTask[taskIndex].isCompleted
            state.tasks = updatedTask;
        },
        updTodoTask: (state, action) => {
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
            const {name, description} = action.payload;
            state.tasks = [...state.tasks, new Task(name, description)];
        },
    },
    extraReducers(builder) {
        builder
            .addCase(fetchTodosThunk.pending, (state, action) => {
                state.status = REQ_STATS.LOADING;
            })
            .addCase(fetchTodosThunk.fulfilled, (state, action) => {
                state.status = REQ_STATS.SUCCEEDED;
                const tasks = action.payload.map((task)=>{
                    const {name, description, isCompleted,  id} = task
                    return new Task(name, description, isCompleted,  id);
                });
                state.tasks = tasks;
            })
            .addCase(fetchTodosThunk.rejected, (state, action) => {
                state.status = REQ_STATS.FAILED;
                state.error = action.error.message;
            })
    }
})

export const { 
    setTodoListStatus, 
    markTodoTask,
    delTodoTask,
    addTodoTask,
    updTodoTask
} = todoListSlice.actions

export default todoListSlice.reducer
