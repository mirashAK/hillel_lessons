import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {fetchTodos, fetchTodo, putTodo} from './requests/todos';

import delay from '../helpers/delay.js';
import REQ_STATS from '../helpers/statuses.js';

export class Task {
    constructor(name = '', description, isCompleted = false,  id) {
        this.id = id || new Date().getTime();
        this.name = name;
        this.description = description ||  '';
        this.isCompleted = isCompleted || false;
    }
}

export const fetchTodosThunk = createAsyncThunk('todoList/fetchTodosThunk', async () => {
    const response = await fetchTodos();
    await delay(3000);
    return response;
})


export function fetchTodoThunk (todoId) {
    return async function (dispatch, getState) {
        try {
            const response = await fetchTodo(todoId);
            await delay(1000);
            return response;
        } catch (err) {
            return Promise.reject(err);
        }
    }
}

export function putTodoThunk (todoObj) {
  return async function (dispatch, getState) {
        try {
            const {name, description, isCompleted,  id} = todoObj;
            const todo  = new Task(name, description, isCompleted,  id)
            const response = await putTodo(todo);
            dispatch(updTodoTask(todo))
        } catch (err) {
            return Promise.reject(err);
        }
  }
}

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
            const updatedTasks = [...state.tasks];
            updatedTasks[taskIndex].isCompleted = !updatedTasks[taskIndex].isCompleted
            state.tasks = updatedTasks;
        },
        updTodoTask: (state, action) => {
            const taskObj = action.payload;
            const taskIndex = state.tasks.findIndex((task) => task.id === taskObj.id);
            if (taskIndex > -1) {
                const updatedTasks = [...state.tasks];
                const {name, description, isCompleted,  id} = taskObj;
                updatedTasks[taskIndex] = new Task(name, description, isCompleted,  id);
                state.tasks = updatedTasks;
            }
        },
        delTodoTask: (state, action) => {
            const taskId = action.payload;
            const updatedTasks = state.tasks.reduce((acc, task)=>{
                if (task.id !== taskId) acc.push(task);
                return acc;
            }, []);
            state.tasks = updatedTasks;
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
