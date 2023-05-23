import { configureStore } from "@reduxjs/toolkit";
import todosCountSlice from "./Reducer/index";

export const Store = configureStore({
  reducer: {
    todosCountSlice,
  },
});
