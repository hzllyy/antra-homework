import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const baseURL = "https://dummyjson.com/todos";
const headers = { "Content-Type": "application/json" };

// getch all todos
export const fetchTodos = createAsyncThunk('todo/fetchTodos', async () => {
  const res = await fetch(baseURL);
  const data = await res.json();
  return data.todos; 
});

export const createTodo = createAsyncThunk('todo/createTodo', async (todo) => {
  const res = await fetch(`${baseURL}/add`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ todo, completed: false, userId: 1 })
  });
  return await res.json(); 
});

export const deleteTodo = createAsyncThunk('todo/deleteTodo', async (id) => {
  const res = await fetch(`${baseURL}/${id}`, { method: 'DELETE', headers });
  const data = await res.json();
  return data;
});

export const editTodo = createAsyncThunk('todo/editTodo', async ({ id, updatedTodo }) => {
  const res = await fetch(`${baseURL}/${id}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(updatedTodo)
  });
  const data = await res.json();
  return data; 
});

const initialState = {
    data: [],
    isLoading: false,
    error: null
  }

const todoSlice = createSlice({
  name: 'todo',
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => { state.isLoading = true; })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.data = state.data.filter(todo => todo.id !== action.payload.id);
      })
      .addCase(editTodo.fulfilled, (state, action) => {
        state.data = state.data.map(todo =>
          todo.id === action.payload.id ? action.payload : todo
        );
      });
  }
});

export default todoSlice.reducer;
