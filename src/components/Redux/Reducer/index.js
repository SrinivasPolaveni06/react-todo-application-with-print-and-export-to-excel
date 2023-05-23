import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { environmentVariable } from "../../Environment";
const initialState = {
  todosCount: 0,
  todosList: [],
};

//const url = "";

export const getTodosList = createAsyncThunk("getTodosList", async () => {
  const response = await fetch(`${environmentVariable}/todos`);
  const data = await response.json();
  return data;
});

const todosCountSlice = createSlice({
  name: "todosCountSlice",
  initialState,
  reducers: {
    todosListCount: (state, action) => {
      state.todosCount = action.payload.length;
    },
  },
  extraReducers: {
    [getTodosList.pending]: (state, action) => {
      console.log("In Pending State");
    },
    [getTodosList.fulfilled]: (state, action) => {
      //console.log(action.payload);
      state.todosCount = action.payload.length;
      state.todosList = action.payload;
    },
    [getTodosList.rejected]: (state, action) => {
      console.log("In Rejected State");
    },
  },
});

export const { todosListCount } = todosCountSlice.actions;
export default todosCountSlice.reducer;
